// import React from "react";
// import { Button, View, Text } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { AuthProvider, useAuth } from "./App/context/AuthContext";
// import CreateAccountScreen from "./Screens/CreateAccountScreen";
// import LoginScreen from "./Screens/LoginScreen";
// import BusinessOwnerHomeScreen from "./Screens/BusinessOwnerHomeScreen";
// import StockManagerHomeScreen from "./Screens/StockManagerHomeScreen";
// import LoadingIndicator from "./Screens/LoadingIndicator";

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const { authState, onLogout } = useAuth();

//   return (
//     <Stack.Navigator>
//       {authState?.authenticated ? (
//         <>
//           {authState.user?.user_type === "business_owner" ? (
//             <Stack.Screen
//               name="BusinessOwnerHome"
//               component={BusinessOwnerHomeScreen}
//               options={{
//                 headerRight: () => (
//                   <Button
//                     onPress={onLogout}
//                     title="Sign Out"
//                   />
//                 ),
//               }}
//             />
//           ) : authState.user?.user_type === "stock_manager" ? (
//             <Stack.Screen
//               name="StockManagerHome"
//               component={StockManagerHomeScreen}
//               options={{
//                 headerRight: () => (
//                   <Button
//                     onPress={onLogout}
//                     title="Sign Out"
//                   />
//                 ),
//               }}
//             />
//           ) : null}
//           <Stack.Screen
//             name="Loading"
//             component={LoadingIndicator}
//             options={{ headerShown: false }}
//           />
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
//     </Stack.Navigator>
//   );
// };

// const Layout = () => {
//   return (
//     // <NavigationContainer>
//       <AppNavigator />
//     // </NavigationContainer>
//   );
// };

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthProvider>
//         <Layout />
//       </AuthProvider>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { AuthProvider, AuthContext } from "./App/context/AuthContext";
import LoginScreen from "./Screens/LoginScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import BusinessOwnerHome from "./Screens/BusinessOwnerHomeScreen";
import StockManagerHome from "./Screens/StockManagerHomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AuthStack = () => {
  const { authState } = React.useContext(AuthContext);

  if (authState === undefined) {
   
    console.error("AuthContext is not available");
    return null; 
  }

  if (authState.isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <Stack.Navigator>
      {authState.isAuthenticated ? (
        <>
          <Stack.Screen
            name="BusinessOwnerHome"
            component={BusinessOwnerHome}
          />
          <Stack.Screen
            name="StockManagerHome"
            component={StockManagerHome}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
