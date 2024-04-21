// src/App.js
import React, { useState } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { AuthProvider } from './FirebaseAuthProvider';

const theme = createTheme();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Box sx={{
              backgroundColor: '#f5f5f5',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw', // Make Box component cover entire viewport width
              position: 'fixed', // Fix the position of the Box component
              top: 0, // Position from top
              left: 0, // Position from left
            }}>
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" />} />
            </Routes>
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
