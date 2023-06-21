import { useContext } from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { KeyboardContext } from "../../contexts/KeyboardContext";

import imageBg from "../../assets/images/imageBg.jpg";
import Avatar from "../../components/formComponents/Avatar";
import LogOutButton from "../../components/screenComponents/LogOutButton";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} style={styles.background}>
          <View style={styles.box}>
            <Avatar />
            <View style={styles.logOutBtn}>
              <LogOutButton onPress={signOut} />
            </View>
            <Text style={styles.titleBox}>Profile screen</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  box: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  titleBox: {
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});
