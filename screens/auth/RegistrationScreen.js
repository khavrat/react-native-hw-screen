import { useContext, useState } from "react";
import {
  Platform,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { KeyboardContext } from "../../contexts/KeyboardContext";
import imageBg from "../../assets/images/imageBg.jpg";

import Avatar from "../../components/formComponents/Avatar";
import FormButton from "../../components/formComponents/FormButton";

import {
  authSignUpUser,
} from "../../redux/auth/authOperations";

const initialRegistrationState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);

  const [registrationState, setRegistrationState] = useState(
    initialRegistrationState
  );
  const [isActiveInput, setIsActiveInput] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();

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
    dispatch(authSignUpUser(registrationState));
    setRegistrationState(initialRegistrationState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} style={styles.background}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always"
            extraScrollHeight={Platform.select({
              ios: isActiveInput === "password" ? 70 : 90,
              android: isActiveInput === "password" ? -90 : -140,
            })}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
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
                    borderColor:
                      isActiveInput === "login" ? "#FF6C00" : "#E8E8E8",
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
                Зареєструватися
              </FormButton>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.8}
              >
                <Text style={styles.loginLink}>
                  Вже є акаунт?{" "}
                  <Text
                    style={{ ...styles.loginLink, ...styles.underlineText }}
                  >
                    Увійти
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

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  titleForm: {
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
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
