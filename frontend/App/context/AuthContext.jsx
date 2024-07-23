import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

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

      console.log("result:", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const logout = async () => {
    // delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // Update http headers
    axios.defaults.headers.common["Authorization"] = "";
    // reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const TOKEN_KEY = "my-jwt";

// // Update the API_URL to the local Django server URL
// export const API_URL = "http://localhost:8000";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     token: null,
//     authenticated: null,
//   });

//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await SecureStore.getItemAsync(TOKEN_KEY);
//       console.log("stored:", token);
//       if (token) {
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         setAuthState({
//           token: token,
//           authenticated: true,
//         });
//       }
//     };

//     loadToken();
//   }, []);

//   const register = async (email, password, user_type) => {
//     try {
//       return await axios.post(`${API_URL}/register/`, {
//         email,
//         password,
//         user_type,
//       });
//     } catch (e) {
//       return {
//         error: true,
//         msg: e.response?.data?.msg || "Registration error",
//       };
//     }
//   };

//   const login = async (email, password, user_type) => {
//     try {
//       const result = await axios.post(`${API_URL}/login/`, {
//         email,
//         password,
//         user_type,
//       });

//       console.log("result:", result);

//       setAuthState({
//         token: result.data.token,
//         authenticated: true,
//       });

//       axios.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${result.data.token}`;
//       await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
//       return result;
//     } catch (e) {
//       return { error: true, msg: e.response?.data?.msg || "Login error" };
//     }
//   };

//   const logout = async () => {
//     // Delete token from storage
//     await SecureStore.deleteItemAsync(TOKEN_KEY);
//     // Update HTTP headers
//     axios.defaults.headers.common["Authorization"] = "";
//     // Reset auth state
//     setAuthState({
//       token: null,
//       authenticated: false,
//     });
//   };

//   const value = {
//     onRegister: register,
//     onLogin: login,
//     onLogout: logout,
//     authState,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
