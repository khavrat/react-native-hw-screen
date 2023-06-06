import React, { useState } from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { Keyboard } from "react-native";

import { useRoute } from "./router";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import { KeyboardContext } from "./contexts/KeyboardContext";


export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const routing = useRoute({});

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
          <NavigationContainer
          >
            {routing}
          </NavigationContainer>
          {/* <StatusBar style="auto" /> */}
      </KeyboardContext.Provider>
    );
  }
}
