// src/App.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import { useAuth } from './FirebaseAuthProvider';
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
              p: 0,
              m: -1,
              width: '100vw',
              height: '100vh'
            }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">LA Hacks</Typography>
              </Toolbar>
            </AppBar>
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
