import React, { useRef, useState } from 'react';
import { Typography, Button, Box, Stack, CircularProgress } from '@mui/material';
import { useAuth } from '../FirebaseAuthProvider';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the image
  const [generatedText, setGeneratedText] = useState(null); // State to store the generated text
  const [loading, setLoading] = useState(false); // State to track loading status

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

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Handle no file selected case (optional)

    const reader = new FileReader();
    reader.onload = async (event) => {
      setSelectedImage(event.target.result); // Update state with image URL
      setLoading(true); // Set loading state to true
      await processImage(file);
      setLoading(false); // Set loading state to false after text is generated
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file) => {
    // Access your API key (see "Set up your API key" above)
    const API_KEY = "AIzaSyAIbV_eH3ymm5okCoyoClvCBShHZAqWaEs";
    const genAI = new GoogleGenerativeAI(API_KEY);

    // For text-and-images input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "I have the ingredients above. Not sure what to cook for lunch. Show me a list of foods with the recipes.";

    const imageParts = await fileToGenerativePart(file);

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    let text = await response.text();
    console.log(text);
     // Format the text with HTML line breaks
     text = text.replaceAll('\n\n', '<br /><br />'); // Double line breaks
     text = text.replaceAll('\n', '<br />'); // Single line breaks
    setGeneratedText(text);
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
            <Box sx={{ textAlign: 'center', marginTop: 2, alignContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '200px', // Adjust width and height as desired
                  height: '200px',
                  backgroundColor: 'gray', // Optional background color for visibility
                  marginBottom: '10px',
                }}
              >
                <img src={selectedImage} alt="Uploaded food image" style={{ width: '100%' }} />
              </Box>
              {loading ? ( // Show loading spinner while text is being generated
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    maxHeight: '300px', // Adjust max height as desired
                    overflowY: 'auto',
                    textAlign: 'left', // Align text to the left
                    border: '2px solid black',
                    width: '60%',
                    backgroundColor: 'gray',
                    padding: '10px',
                  }}
                >
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: generatedText }} />
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default Home;
