import { useState, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import useHideTabBarOnNestedScreen from "../../helpers/useHideTabBarOnNested";
import { KeyboardContext } from "../../contexts/KeyboardContext";

import SendButton from "../../components/screenComponents/SendButton";

const initialCommentsState = {
  comment: "",
};

const CommentsScreen = () => {
  const { keyboardHide, keyboardShow } = useContext(KeyboardContext);
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
    if (value !== "") {
      setCommentsState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setCommentsState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    keyboardHide();
    console.log("commentsState :>> ", commentsState);
    setCommentsState(initialCommentsState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isActiveInput === "comment" ? "#FF6C00" : "#E8E8E8",
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
      </View>
    </View>
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
    justifyContent: "flex-end",
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
    marginBottom: 16,
    borderRadius: 100,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
