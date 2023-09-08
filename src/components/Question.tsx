import React from 'react';
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Box,
  Typography,
  Container,
} from '@mui/material';
import QuestionData from '../interface/types';

interface QuestionProps {
  question: QuestionData | undefined; // Change the type to include undefined
  userAnswer: string;
  questionIndex: number;
  onAnswerChange: (questionIndex: number, answer: string) => void;
  onChange:any;
}

const Question: React.FC<QuestionProps> = ({
  question,
  userAnswer,
  questionIndex,
  onAnswerChange,
}) => {
  if (!question) {
    // Handle the case where 'question' is undefined
    return null; // You can return a message or component here
  }

  const { question: questionText, options } = question;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(questionIndex, event.target.value);
  };

  return (
    <Container>
      <Box
        sx={{
          // Your styling here
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bolder',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {questionText}
        </Typography>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{ color: 'black', fontWeight: 'bolder' }}
          >
            Choose an answer:
          </FormLabel>
          <RadioGroup
            aria-label="quiz"
            name={`question-${questionIndex}`}
            value={userAnswer}
            onChange={handleOptionChange}
          >
            {options.map((option, index) => (
              <FormControlLabel
                sx={{
                  fontWeight: 'bolder',
                  backgroundColor: 'white',
                  padding: '6px',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  mt: 1,
                }}
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Question;
