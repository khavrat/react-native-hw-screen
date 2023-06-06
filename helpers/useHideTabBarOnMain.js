import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useHideTabBarOnMainScreen = () => {
  const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      return () =>
        navigation.setOptions({
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            paddingTop: 30,
            paddingBottom: 44,
            borderTopColor: "#212121",
            borderTopWidth: 0.5,
            boxShadow: "0 -0.5 0 rgba(0, 0, 0, 0.3)",
          },
        });
    }, []);};

export default useHideTabBarOnMainScreen;
