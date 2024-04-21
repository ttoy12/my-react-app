import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Card, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { getAuth } from 'firebase/auth'; // Import getAuth
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';

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
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', // Make Box component cover entire viewport width
        position: 'fixed', // Fix the position of the Box component
        top: 0, // Position from top
        left: 0, // Position from left
      }}
    >
      <Card sx={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
        <Stack direction="row" alignItems="center" marginBottom={2}>
          <Typography variant="h3">
            Recipe Helper
          </Typography>
          <RestaurantMenuOutlinedIcon style={{ fontSize: '3.5rem', paddingLeft: '10px' }} />
        </Stack>
        <Typography variant="h6" color={'gray'}>Sign up</Typography>
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
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <Button variant="contained" color="primary" onClick={handleSignup} style={{ marginTop: '10px', marginBottom: '10px' }}>
          Sign Up
        </Button>
        <Typography variant="body1" gutterBottom>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default SignUp;
