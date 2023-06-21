import React, { useState } from "react";
import { Provider } from "react-redux";

import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { Keyboard } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import { store } from "./redux/store";

import { KeyboardContext } from "./contexts/KeyboardContext";
import MainComponent from "./components/MainComponent";

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);




store.subscribe(() => console.info('store in App', store.getState()));


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
        <Provider store={store}>
          <MainComponent />
          {/* <NavigationContainer>{routing}</NavigationContainer> */}
          {/* <StatusBar style="auto" /> */}
        </Provider>
      </KeyboardContext.Provider>
    );
  }
}
