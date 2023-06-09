import { createStackNavigator } from "@react-navigation/stack";
// import { moduleName } from "react-native";
import { Image, View } from "react-native";
import HomePostsScreen from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import GoBackButton from "../../components/screenComponents/GoBackButton";
import LogOutButton from '../../components/screenComponents/LogOutButton';

const NestedStack = createStackNavigator();

const PostsScreen = ({navigation}) => {
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
                <LogOutButton onPress={()=>navigation.navigate('Registration') } />
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
