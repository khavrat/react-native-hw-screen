import React, {useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import RegistrationScreen from "./components/RegistrationScreen";
// import LoginScreen from "./components/LoginScreen";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import imageBg from "./assets/images/imageBg.jpg";

import { KeyboardContext } from "./contexts/KeyboardContext";

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const keyboardShow = () => {
    setIsShowKeyboard(true);
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardContext.Provider
        value={{ isShowKeyboard, keyboardHide, keyboardShow }}
      >
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.container}>
            <ImageBackground source={imageBg} style={styles.background}>
              <StatusBar style="auto" />
              <RegistrationScreen
            />
              {/* <LoginScreen
              /> */}
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardContext.Provider>
    );
  }
}

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
});
