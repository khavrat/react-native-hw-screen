import { View, Text, StyleSheet } from "react-native";

import useHideTabBarOnNestedScreen from "../../helpers/useHideTabBarOnNested";

const MapScreen = () => {
  useHideTabBarOnNestedScreen();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>it will be MapScreen</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 26,
    lineHeight: 30,
    color: "#1B4371",
  },
});
