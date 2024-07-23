import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "../Screens/CreateAccountScreen";
import LoginScreen from "../Screens/LoginScreen";
import LoadingIndicator from "../Screens/LoadingIndicator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingIndicator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { AuthProvider, useAuth } from "../App/context/AuthContext";
// import CreateAccountScreen from "../Screens/CreateAccountScreen";
// import LoginScreen from "../Screens/LoginScreen";
// import HomeScreen from "../Screens/HomeScreen"; // Assuming HomeScreen is the authenticated user's main screen
// import LoadingIndicator from "../Screens/LoadingIndicator";

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   const { authState, onLogout } = useAuth();

//   return (
//     <Stack.Navigator>
//       {authState?.authenticated ? (
//         <>
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               headerRight: () => (
//                 <Button
//                   onPress={onLogout}
//                   title="Sign Out"
//                 />
//               ),
//             }}
//           />
//           {/* Add other screens for authenticated users here if needed */}
//         </>
//       ) : (
//         <>
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//           />
//           <Stack.Screen
//             name="CreateAccount"
//             component={CreateAccountScreen}
//           />
//         </>
//       )}
//       <Stack.Screen
//         name="Loading"
//         component={LoadingIndicator}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }
