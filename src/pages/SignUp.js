import React, { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { getAuth } from 'firebase/auth'; // Import getAuth

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add this line

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password); // Use createUserWithEmailAndPassword
      setError('');
      navigate('/'); // Add this line
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };


  return (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <Typography variant="h2" >
        Sign Up
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
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      <Typography variant="body1" gutterBottom>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Box>
  );
}

export default SignUp;
