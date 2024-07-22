import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingIndicator from "../screens/LoadingIndicator";

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
