import { createStackNavigator } from "@react-navigation/stack";

import AuthStackNav from './routs/AuthStackNav';
import MainTabNav from "./routs/MainTabNav";

const Stack = createStackNavigator();

export const useRoute = (isAuth) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
    >
      <Stack.Group
        navigationKey={!isAuth ? "MainTab" : "AuthStack"}
      >
        <Stack.Screen
          name="AuthStack"
          component={AuthStackNav}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTabNav}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
