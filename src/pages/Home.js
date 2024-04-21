// Home.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useAuth } from '../FirebaseAuthProvider';
import { signOut } from 'firebase/auth'; // Import signOut
import { getAuth } from 'firebase/auth'; // Import getAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const { currentUser } = useAuth(); // Get current user from the auth context
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert('Logged out successfully.');
      navigate('/'); // Navigate to login page after successful logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {currentUser ? (
        <Box sx={{ marginLeft: 2, marginRight: 2 }}>
          <Typography variant="h2" gutterBottom>
            Welcome {currentUser.email}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : null}
    </>
  );
}

export default Home;
