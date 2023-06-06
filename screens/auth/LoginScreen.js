import { useContext, useState } from "react";
import {
  Platform,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { KeyboardContext } from "../../contexts/KeyboardContext";
import imageBg from "../../assets/images/imageBg.jpg";
import FormButton from "../../components/formComponents/FormButton";

const initialLoginState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);

  const [loginState, setLoginState] = useState(initialLoginState);
  const [isActiveInput, setIsActiveInput] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleFocus = (inputName) => {
    keyboardShow();
    setIsActiveInput(inputName);
  };

  const handleBlur = () => {
    setIsActiveInput("");
  };

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleInputChange = (field, value) => {
    setLoginState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    keyboardHide();
    navigation.navigate("MainTab");
    console.log("loginState :>> ", loginState);
    setLoginState(initialLoginState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} style={styles.background}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always"
            extraScrollHeight={Platform.select({
              ios: isActiveInput === "email" ? 35 : 70,
              android: -160,
            })}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: Platform.select({
                  android: isShowKeyboard ? 32 : 144,
                  ios: 144,
                }),
              }}
            >
              <Text style={styles.titleForm}>Увiйти</Text>
              <View style={styles.inputsList}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      isActiveInput === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  onFocus={() => {
                    handleFocus("email");
                  }}
                  onBlur={handleBlur}
                  value={loginState.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      ...styles.input,
                      ...styles.lastInput,
                      borderColor:
                        isActiveInput === "password" ? "#FF6C00" : "#E8E8E8",
                    }}
                    secureTextEntry={!isShowPassword}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      handleFocus("password");
                    }}
                    onBlur={handleBlur}
                    value={loginState.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit}
                  />
                  <TouchableWithoutFeedback onPress={handleTogglePassword}>
                    <View style={styles.toggleBtn}>
                      <Text style={styles.toggleBtnText}>
                        {isShowPassword ? "Сховати" : "Показати"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <FormButton onPress={handleSubmit} isActive>
                Увійти
              </FormButton>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
                activeOpacity={0.8}
              >
                <Text style={styles.loginLink}>
                  Немає акаунту?{" "}
                    <Text
                      style={{ ...styles.loginLink, ...styles.underlineText }}
                    >
                       Зареєструватися
                    </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 144,
    paddingHorizontal: 16,
  },
  titleForm: {
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  inputsList: {
    marginBottom: 43,
  },
  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: Platform.OS === "ios" ? 16 : 11,
    paddingBottom: Platform.OS === "ios" ? 16 : 11,
    paddingLeft: 16,
    marginBottom: 16,
  },
  lastInput: {
    marginBottom: 0,
  },
  inputContainer: {
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  toggleBtnText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  loginLink: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});
