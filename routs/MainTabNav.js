import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image, View, StyleSheet, Platform } from "react-native";


import PostsScreen from "../screens/mainScreens/PostsScreen";
import CreatePostsScreen from "../screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "../screens/mainScreens/ProfileScreen";

import GoBackButton from "../components/screenComponents/GoBackButton";

import postsIcon from "../assets/icons/postsIcon.png";
import addpostIcon from "../assets/icons/addpostIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";

const MainTab = createBottomTabNavigator();

const MainTabNav = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        taBarIcon: () => null,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          paddingTop: 30,
          paddingBottom: 44,
          borderTopColor: "#212121",
          borderTopWidth: 0.5,
          boxShadow: "0 -0.5 0 rgba(0, 0, 0, 0.3)",
        },
      }}
      initialRouteName="Home"
    >
      <MainTab.Screen
        name="Home"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  ...styles.wrapperIcon,
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                }}
              >
                <Image
                  size={24}
                  style={{ tintColor: focused ? "#FFFFFF" : color }}
                  source={postsIcon}
                />
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomColor: "#212121",
            borderBottomWidth: 0.5,
            boxShadow: "0 -0.5 0 rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontWeight: 500,
            fontSize: 17,
          },
          headerLeft: () => <GoBackButton />,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  ...styles.wrapperIcon,
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                }}
              >
                <Image
                  size={24}
                  style={{ tintColor: focused ? "#FFFFFF" : color }}
                  source={addpostIcon}
                />
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  ...styles.wrapperIcon,
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                }}
              >
                <Image
                  source={profileIcon}
                  size={24}
                  style={{ tintColor: focused ? "#FFFFFF" : color }}
                />
              </View>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNav;

const styles = StyleSheet.create({
  wrapperIcon: {
    paddingTop: Platform.select({
      android: 20,
      ios: 14,
    }),
    paddingBottom: Platform.select({
      android: 20,
      ios: 14,
    }),
    paddingRight: 29,
    paddingLeft: 29,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
