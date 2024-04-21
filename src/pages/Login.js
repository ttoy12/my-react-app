// Login.js
import React, { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import { getAuth } from 'firebase/auth'; // Import getAuth

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword
      const user = auth.currentUser;
      onLogin(user);
      // alert('Logged in.');
      setError('');
      navigate('/home'); // Navigate to home page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h2" >
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body1" gutterBottom>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
}

export default Login;
