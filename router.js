import { createStackNavigator } from "@react-navigation/stack";

import AuthStackNav from "./routs/AuthStackNav";
import MainTabNav from "./routs/MainTabNav";

// const Stack = createStackNavigator();

// export const useRoute = (user) => {
//   console.log("user in router:>> ", user);
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Group>
//         <Stack.Screen
//           navigationKey={!user ? "AuthStack" : "MainTab"}
//           name="AuthStack"
//           component={AuthStackNav}
//         />
//         <Stack.Screen
//           navigationKey={!user ? "AuthStack" : "MainTab"}
//           name="MainTab"
//           component={MainTabNav}
//         />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// };


export const useRoute = (user) => {
  console.log("user in router:>> ", user);
  if (!user) {
    return <AuthStackNav/>;
  } else {
    return <MainTabNav/>;
  }
};


