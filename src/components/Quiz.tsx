import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionData from '../interface/types';
import Question from './Question';
import { Box, Snackbar, Container, Button, Typography, Paper } from "@mui/material";

const Timer: React.FC<{ duration: number }> = ({ duration }) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <Typography sx={{ color: '#fff', fontWeight: 'bolder' }}>Time Left: {formatTime(remainingTime)}</Typography>
    </Box>
  );
};

interface QuizProps {
  questions: QuestionData[];
  userAnswers: string[];
  onAnswerChange: (questionIndex: number, answer: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, userAnswers, onAnswerChange }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuestionChange = (newIndex: number) => {
    setCurrentQuestionIndex(newIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      handleQuestionChange(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      handleQuestionChange(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    navigate('/report');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSnackbarOpen(true);
      navigate('/report');
    }, 1800000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      style={{
        backgroundColor: "#708090",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Timer duration={1800} />
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <Paper
          elevation={3}
          style={{
            background: `url('https://img.freepik.com/free-vector/mystery-confusion-question-mark-background-liquid-style_1017-43013.jpg?size=626&ext=jpg&ga=GA1.1.1672795151.1693588451&semt=sph')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            maxWidth: '800px',
            padding: '20px',
          }}
        >
          <Question
            question={questions[currentQuestionIndex]}
            onChange={handleQuestionChange}
            userAnswer={userAnswers[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            onAnswerChange={onAnswerChange}
          />
        </Paper>
      </Container>

      <Box sx={{
        position: "absolute",
        bottom: 50,
        display: 'flex',
        gap: 1
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          size="small"
          sx={{
            backgroundColor: 'red', color: '#fff', '&:hover': {
              backgroundColor: 'red', color: '#fff',
            }
          }}
        >
          Previous Question
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinishQuiz}
            size="small"
            sx={{
              backgroundColor: 'red', color: '#fff', '&:hover': {
                backgroundColor: 'red', color: '#fff',
              }
            }}
          >
            Finish Quiz
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            size="small"
            sx={{
              backgroundColor: 'red', color: '#fff', '&:hover': {
                backgroundColor: 'red', color: '#fff',
              }
            }}
          >
            Next Question
          </Button>
        )}
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Your time is up!"
      />
    </Box>
  );
};

export default Quiz;
