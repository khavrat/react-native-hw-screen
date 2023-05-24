import { useContext, useEffect, useState } from "react";
import {
  Platform,
  View,
  // KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { KeyboardContext } from "../contexts/KeyboardContext";

import Avatar from "./Avatar";

const initialRegistrationState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);

  const [registrationState, setRegistrationState] = useState(
    initialRegistrationState
  );
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
    setRegistrationState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    keyboardHide();
    setRegistrationState(initialRegistrationState);
  };
  console.log("isShowKeyboard :>> ", isShowKeyboard);
  console.log("isActiveInput :>> ", isActiveInput);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={isActiveInput === "password" ? 70 : 90}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === "ios"}
      //   ref={scrollViewRef}
      //   keyboardVerticalOffset={Platform.select({ ios: -100, android: -900 })}
      //   behavior={Platform.OS === "ios" && "padding"}
    >
      <View
        style={{
          ...styles.form,
          paddingBottom: Platform.select({
            android: isShowKeyboard ? 32 : 78,
            ios: 78,
          }),
        }}
      >
        <Avatar />
        <Text style={styles.titleForm}>Реєстрація</Text>
        <View style={styles.inputsList}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isActiveInput === "login" ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Логін"
            placeholderTextColor="#BDBDBD"
            onFocus={() => {
              handleFocus("login");
            }}
            onBlur={handleBlur}
            value={registrationState.login}
            onChangeText={(value) => handleInputChange("login", value)}
          />
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
            value={registrationState.email}
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
              value={registrationState.password}
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
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink}>Вже є акаунт? Увійти</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
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
    paddingVertical: 0,
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
