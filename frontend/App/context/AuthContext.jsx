import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TOKEN_KEY = "my-jwt";
const API_URL = "http://192.168.1.2:8000"; 
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: null,
    loading: true,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get(`${API_URL}/auth`);
          const fetchedUser = response.data[0]; 
          setAuthState({
            token: token,
            authenticated: true,
            user: fetchedUser,
            loading: false,
          });

          if (fetchedUser.user_type === "business_owner") {
            navigation.navigate("BusinessOwnerHome");
          } else if (fetchedUser.user_type === "stock_manager") {
            navigation.navigate("StockManagerHome"); 
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setAuthState({
            token: token,
            authenticated: false,
            user: null,
            loading: false,
          });
          navigation.navigate("Login");
        }
      } else {
        setAuthState({
          token: null,
          authenticated: false,
          user: null,
          loading: false,
        });
        navigation.navigate("Login");
      }
    };

    loadToken();
  }, [navigation]);

  const register = async (email, password) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/users`, { email, password });
      const user = result.data.user; 

      setAuthState({
        token: result.data.token,
        authenticated: true,
        user: user,
        loading: false,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      // Navigate based on user_type
      if (user.user_type === "business_owner") {
        navigation.navigate("BusinessOwnerHome"); // Replace with your screen name
      } else if (user.user_type === "stock_manager") {
        navigation.navigate("StockManagerHome"); // Replace with your screen name
      }

      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
      user: null,
      loading: false,
    });
    navigation.navigate("Login");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>
      {authState.loading ? (
        <View>
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
