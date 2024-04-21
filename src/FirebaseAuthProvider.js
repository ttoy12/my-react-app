// FirebaseAuthProvider.js
import React, { useContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from './firebaseConfig'; // Import Firebase app instance

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
