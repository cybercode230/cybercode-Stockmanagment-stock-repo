import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AuthCheck = ({ children }) => {
  const { authState } = useContext(AuthContext);

  if (authState.isLoading) {
    return null; 
  }

  return authState.isAuthenticated ? children : null;
};

export default AuthCheck;
