import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./App/context/AuthContext";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoadingIndicator from "./Screens/LoadingIndicator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <Button
                  onPress={onLogout}
                  title="Sign Out"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingIndicator}
            options={{ headerShown: false }}
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

const Layout = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
