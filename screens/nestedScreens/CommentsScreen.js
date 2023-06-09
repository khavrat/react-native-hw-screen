import { useState, useContext } from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import useHideTabBarOnNestedScreen from "../../helpers/useHideTabBarOnNested";
import { KeyboardContext } from "../../contexts/KeyboardContext";

import SendButton from "../../components/screenComponents/SendButton";

const initialCommentsState = {
  comments: [],
  comment: "",
};

const CommentsScreen = ({ route }) => {
  const { photo } = route.params;
  
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);
  
  const [commentsState, setCommentsState] = useState(initialCommentsState);
  const [isActiveInput, setIsActiveInput] = useState("");

  useHideTabBarOnNestedScreen();

  const handleFocus = (inputName) => {
    keyboardShow();
    setIsActiveInput(inputName);
  };

  const handleBlur = () => {
    setIsActiveInput("");
  };

  const handleInputChange = (field, value) => {
    setCommentsState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    keyboardHide();
    if (commentsState.comment !== "") {
      setCommentsState((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, prevState.comment],
        comment: "",
      }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: photo ? photo.toString() : null }}
              style={{ width: "100%", height: 240 }}
            />
          </View>
          <FlatList
            data={commentsState.comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentBox}>
                <View style={styles.commentWrapper}>
                  <Text style={styles.comment}>{item}</Text>
                </View>
                <View style={styles.commentatorAvatar}></View>
              </View>
            )}
            style={{ flex: 1, marginTop: 32, marginBottom: 32 }}
          ></FlatList>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputWrapper,
                marginBottom: Platform.select({
                  android: isShowKeyboard ? 46 : 16,
                  ios: isShowKeyboard ? 106 : 16,
                }),
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    isActiveInput === "comment" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Коментувати..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  handleFocus("comment");
                }}
                onBlur={handleBlur}
                value={commentsState.comment}
                onChangeText={(value) => handleInputChange("comment", value)}
              />
              <View style={styles.sendBtn}>
                <SendButton onPress={handleSubmit} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  photoContainer: {
    marginTop: 32,
    marginBottom: 32,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  commentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  commentWrapper: {
    padding: 16,
    marginBottom: 24,
    maxWidth: 300,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentatorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#E8E8E8",
  },
  comment: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingTop: Platform.OS === "ios" ? 16 : 11,
    paddingBottom: Platform.OS === "ios" ? 16 : 11,
    paddingLeft: 16,
    borderRadius: 100,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
