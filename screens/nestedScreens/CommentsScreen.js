import { useState, useContext, useEffect } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { format } from "date-fns";
import uk from "date-fns/locale/uk";

import { db } from "../../firebase/config";

import { KeyboardContext } from "../../contexts/KeyboardContext";

import SendButton from "../../components/screenComponents/SendButton";


const CommentsScreen = ({ route }) => {
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);

  const [comment, setComment] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [isActiveInput, setIsActiveInput] = useState("");

  const { id, photo } = route.params;

  const { login, avatarPath } = useSelector((store) => store.auth);

  useEffect(() => {
    getAllCommentsFromFirebase();
  }, []);


  const handleFocus = (inputName) => {
    keyboardShow();
    setIsActiveInput(inputName);
  };

  const handleBlur = () => {
    setIsActiveInput("");
  };

  const handleInputChange = (field, value) => {
    setComment(value);
  };

  const putCommentToFirebase = async () => {
    try {
      keyboardHide();
      await handleInputChange();

      const uniquePostDate = Date.now();
      const formattedDate = format(uniquePostDate, "dd MMMM, yyyy | HH:mm", {locale: uk});

      await addDoc(collection(db, `posts/${id}/comments`), {
        login: login,
        avatarPath: avatarPath,
        comment: comment,
        createCommentDate: formattedDate,
      });
      setComment("");
      getAllCommentsFromFirebase();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCommentsFromFirebase = async () => {
    try {
      const commentRef = collection(db, `posts/${id}/comments`);
      const querySnapshot = await getDocs(
        query(commentRef, orderBy("createCommentDate"))
      );

      const authorSnapshot = await getDoc(doc(db, "posts", id));
      const authorLogin = await authorSnapshot.data().user.login;
      setAuthorPhoto(authorLogin);

      const newComments = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllComments(newComments);
    } catch (error) {
      console.log("error in getAllCommentsFromFirebase:>> ", error.message);
    }
  };

  const isCurrentUser = (commentatorLogin) => {
    return authorPhoto === commentatorLogin;
  };

  return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: photo ? photo.toString() : null }}
              style={{ width: "100%", height: 240 }}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allComments}
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1, marginTop: 32, marginBottom: 32 }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.commentBox,
                  isCurrentUser(item.login)
                    ? styles.isCurrentUserComment
                    : null,
                ]}
              >
                <View style={styles.commentatorAvatar}>
                  {item.avatarPath !== null && (
                    <Image
                      source={{ uri: item.avatarPath }}
                      style={{ width: 28, height: 28, borderRadius: 50 }}
                    />
                  )}
                </View>
                <View style={styles.commentWrapper}>
                  <Text
                    style={[
                      styles.login,
                      isCurrentUser(item.login)
                        ? styles.isCurrentUserLogin
                        : null,
                    ]}
                  >
                    {item.login}
                  </Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text
                    style={[
                      styles.commentDate,
                      isCurrentUser(item.login)
                        ? styles.isCurrentUserCommentDate
                        : null,
                    ]}
                  >
                    {item.createCommentDate}
                  </Text>
                </View>
              </View>
            )}
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
                value={comment}
                onChangeText={(value) => handleInputChange("comment", value)}
              />
              <View style={styles.sendBtn}>
                <SendButton onPress={putCommentToFirebase} />
              </View>
            </View>
          </KeyboardAvoidingView>
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
    justifyContent: "space-between",
  },
  photoContainer: {
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  commentBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
  },
  isCurrentUserComment: {
    flexDirection: "row-reverse",
  },
  commentWrapper: {
    flexGrow: 1,
    maxWidth: 350,
    padding: 16,
    paddingTop: 8,
    marginBottom: 24,
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
  login: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 18,
    color: "#C2C2C2",
    textAlign: "left",
  },
  isCurrentUserLogin: {
    textAlign: "right",
  },
  comment: {
    marginTop: 6,
    fontFamily: "Roboto_400Regular",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
    textAlign: "right",
  },
  isCurrentUserCommentDate: {
    textAlign: "left",
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
