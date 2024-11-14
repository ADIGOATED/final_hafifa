import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUserId, setConnectedUserId] = useState();

  const signIn = () => setIsAuthenticated(true);

  const signOut = () => setIsAuthenticated(false);

  const updateConnectedUser = (userId) => setConnectedUserId(userId)

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, updateConnectedUser, connectedUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
