import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import HomePostsScreen from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import GoBackButton from "../../components/screenComponents/GoBackButton";
import LogOutButton from '../../components/screenComponents/LogOutButton';

import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedStack = createStackNavigator();

const PostsScreen = () => {
    const dispatch = useDispatch();

    const signOut = () => {
      dispatch(authSignOutUser());
    };

  return (
    <NestedStack.Navigator
      screenOptions={{
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
      }}
    >
      <NestedStack.Screen
        name="Posts"
        component={HomePostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => {
            return (
              <View style={{ marginRight: 16 }}>
                <LogOutButton onPress={signOut} />
              </View>
            );
          },
          headerLeft: () => null,
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          headerLeft: () => <GoBackButton />,
        }}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Карти",
          headerLeft: () => <GoBackButton />,
        }}
      />
    </NestedStack.Navigator>
  );
};

export default PostsScreen;
