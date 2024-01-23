import React, { useState, useEffect, useRef } from "react";
import TextQuestionComponent from "../components/TextQuestion";

const QuizPage1: React.FC = () => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    Array<{ question: string; answer: string; questionNumber: number }>
  >([
    { question: "What is 2 + 2?", answer: "4", questionNumber: 1 },
    { question: "Capital of France?", answer: "Paris", questionNumber: 2 },
    { question: "a", answer: "a", questionNumber: 3 },
    { question: "b", answer: "b", questionNumber: 4 },
    { question: "c", answer: "c", questionNumber: 5 },
  ]);

  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] =
    useState<boolean>(false);

  const questionComponentsRef = useRef<
    Array<React.ElementRef<typeof TextQuestionComponent> | null>
  >(Array.from({ length: questionsAndAnswers.length }, () => null));

  useEffect(() => {
    if (isQuizStarted) {
      if (questionComponentsRef.current[currentQuestionIndex]) {
        questionComponentsRef.current[currentQuestionIndex]!.open();
      }
    }
  }, [isQuizStarted, currentQuestionIndex]);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const handleQuestionCompletion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (questionComponentsRef.current[prevIndex]) {
        questionComponentsRef.current[prevIndex]!.close();
      }

      const nextIndex = prevIndex + 1;

      if (nextIndex < questionsAndAnswers.length) {
        if (questionComponentsRef.current[nextIndex]) {
          setTimeout(() => {
            questionComponentsRef.current[nextIndex]!.open();
          }, 0);
        }
      } else {
        setAllQuestionsAnswered(true);

        setTimeout(() => {
          window.location.href = "/thank-you-quiz1"; // Replace "/main-page" with your actual main page URL
        }, 2000);
      }

      return nextIndex;
    });
  };

  return (
    <div>
      {!isQuizStarted && <button onClick={handleStartQuiz}>Start Quiz</button>}

      {isQuizStarted && !allQuestionsAnswered && (
        <div>
          {questionsAndAnswers.map((qa, index) => (
            <TextQuestionComponent
              ref={(ref) => (questionComponentsRef.current[index] = ref)}
              key={index}
              question={qa.question}
              answer={qa.answer}
              onCompletion={handleQuestionCompletion}
              questionNumber={qa.questionNumber}
            />
          ))}
        </div>
      )}

      {allQuestionsAnswered && (
        <p>
          All questions are answered! Redirecting to the main page...
        </p>
      )}
    </div>
  );
};

export default QuizPage1;
