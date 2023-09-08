import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Snackbar, Alert } from "@mui/material"

const StartQuiz: React.FC<{ onStart: (email: string) => void }> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleStartClick = () => {
    if (email.trim() !== '') {
      onStart(email);
    } else {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="10px"
        minHeight="100vh"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJvGLoTYCPAww5xC18003lvQKJWbdkpfTdg&usqp=CAU')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >

        <Typography variant="h5" sx={{ color: 'black', fontWeight: "bolder", fontSize: { xs: 14, lg: 30 } }}>Welcome to the Quiz!</Typography>
        <Typography variant="h6" sx={{ color: 'black', fontWeight: "bolder", fontSize: { xs: 14, lg: 30 } }}>Please enter your email to start the quiz:</Typography>
        <TextField
          type="email"
          value={email}
          onChange={handleEmailChange}
          id="outlined-basic"
          variant="outlined"
          label="Enter the username"
          InputProps={{
            style: {
              color: 'white',
              width: '400px',
              borderColor: 'white',
            },
          }}
        />

        <Button onClick={handleStartClick} variant="contained" size="small" sx={{
          mt: 3, background: 'red',
          '&:hover': {
            background: 'red',
          }
        }}>
          Start Quiz
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
            Please enter a valid email address.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default StartQuiz;
