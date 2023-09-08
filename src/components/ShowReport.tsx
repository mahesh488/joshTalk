import React from 'react';
import QuestionData from '../interface/types';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography,Box } from "@mui/material";

interface ReportPageProps {
  questions: QuestionData[];
  userAnswers: string[];
}

const ShowReport: React.FC<ReportPageProps> = ({ questions, userAnswers }) => {
  return (
    <Box >
      <Typography variant="h6" sx={{textAlign:"center",fontWeight:'bolder',position:'sticky',top:0}}>Quiz Report</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{color:'black',fontWeight:'bolder'}}>Question</TableCell>
            <TableCell sx={{color:'black',fontWeight:'bolder'}}>Your Answer</TableCell>
            <TableCell sx={{color:'black',fontWeight:'bolder'}}>Correct Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, index) => (
            <TableRow key={index}>
              <TableCell>{question.question}</TableCell>
              <TableCell>{userAnswers[index]}</TableCell>
              <TableCell>{question.correct_answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ShowReport;
