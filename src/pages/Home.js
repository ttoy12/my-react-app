import React, { useRef, useState } from 'react';
import { Typography, Button, Box, Stack } from '@mui/material';
import { useAuth } from '../FirebaseAuthProvider';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the image

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert('Logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Handle no file selected case (optional)

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result); // Update state with image URL
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {currentUser ? (
        <Box sx={{ marginLeft: 2, marginRight: 2 }}>
          <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h4">Welcome {currentUser.email}</Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Upload an image of food ingredients and recipes will be displayed
          </Typography>
          <Stack direction={'row'} sx={{ justifyContent: 'center', marginBottom: 2 }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload Photo
            </Button>
          </Stack>

          {/* Display uploaded image if available */}
          {selectedImage && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px', // Adjust width and height as desired
                height: '200px',
                backgroundColor: 'gray', // Optional background color for visibility
                margin: 'auto',
              }}
            >
              <img src={selectedImage} alt="Uploaded food image" style={{ width: '100%' }} />
            </Box>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default Home;
