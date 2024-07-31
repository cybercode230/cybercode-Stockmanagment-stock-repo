import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./App/context/AuthContext";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import LoginScreen from "./Screens/LoginScreen";
import BusinessOwnerHomeScreen from "./Screens/BusinessOwnerHomeScreen";
import StockManagerHomeScreen from "./Screens/StockManagerHomeScreen";
import LoadingIndicator from "./Screens/LoadingIndicator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <>
          {authState.user?.user_type === "business_owner" ? (
            <Stack.Screen
              name="BusinessOwnerHome"
              component={BusinessOwnerHomeScreen}
              options={{
                headerRight: () => (
                  <Button
                    onPress={onLogout}
                    title="Sign Out"
                  />
                ),
              }}
            />
          ) : authState.user?.user_type === "stock_manager" ? (
            <Stack.Screen
              name="StockManagerHome"
              component={StockManagerHomeScreen}
              options={{
                headerRight: () => (
                  <Button
                    onPress={onLogout}
                    title="Sign Out"ggoogoogle
                  />
                ),
              }}
            />
          ) : null}
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
      <AppNavigator />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </NavigationContainer>
  );
}




