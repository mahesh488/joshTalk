import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import QuestionData from './interface/types';
import ShowReport from './components/ShowReport';
import StartQuiz from './components/StartQuiz';

const App: React.FC = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchQuizQuestions = useCallback(async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      const data = await response.json();
      console.log(data);
      const formattedQuestions = data.results.map((result: any) => ({
        question: result.question,
        options: [...result.incorrect_answers, result.correct_answer],
        correct_answer: result.correct_answer,
      }));
      setQuestions(formattedQuestions);
      setFetchError(null); 
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setFetchError('Failed to fetch quiz questions. Please check your internet connection and try again.');
    }
  }, []);

  useEffect(() => {
    fetchQuizQuestions();
  }, [fetchQuizQuestions]);

  const handleStart = () => {
    setIsQuizStarted(true);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionIndex] = answer;
    setUserAnswers(updatedUserAnswers);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              !isQuizStarted ? (
                <StartQuiz onStart={handleStart} />
              ) : (
                <Navigate to="/quiz" />
              )
            }
          />
          <Route
            path="/quiz"
            element={
              isQuizStarted ? (
                <Quiz
                  questions={questions}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/report"
            element={
              isQuizStarted ? (
                <ShowReport
                  questions={questions}
                  userAnswers={userAnswers}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
