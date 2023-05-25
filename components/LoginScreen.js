import { useContext, useState } from "react";
import {
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { KeyboardContext } from "../contexts/KeyboardContext";

const initialLoginState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
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
    console.log('loginState :>> ', loginState);
    setLoginState(initialLoginState);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="always"
      extraScrollHeight={Platform.select({
        ios: isActiveInput === "email" ? 35 : 70,
        android: isActiveInput === "password" ? -120 : -190,
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
        <Text style={styles.titleForm}>Увійти</Text>
        <View style={styles.inputsList}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isActiveInput === "email" ? "#FF6C00" : "#E8E8E8",
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
              onChangeText={(value) => handleInputChange("password", value)}
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
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Увійти</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink}>Немає акаунту? Зареєструватися</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
  button: {
    display: "flex",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    paddingLeft: 32,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
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
});
