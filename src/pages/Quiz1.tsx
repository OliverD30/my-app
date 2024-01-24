import React, { useState, useEffect, useRef } from "react";
import TextQuestionComponent from "../components/TextQuestion";
import { Button } from "@mantine/core";

const QuizPage1: React.FC = () => {
  const [questionsAndAnswers] = useState<
    Array<{ question: string; answer: string; questionNumber: number; clue: string; }>
  >([
    { question: "Vem har flest fortnite mvps i ranked trios?", answer: "oliver", questionNumber: 1, clue: 'Det är inte anton' },
    { question: "När fyller jag år? (YYYY-MM-DD)", answer: "2003-03-07", questionNumber: 2, clue: 'Det var dagen jag föddes' },
    { question: "Vad är Avons IQ?", answer: "10", questionNumber: 3, clue: 'Svaret är till närmaste 10-tal' },
    { question: "Vilka typer av tjejer föredrar Anton?", answer: "Exotiska", questionNumber: 4, clue: 'Svaret är ett annat ord för sällsynta/utländska' },
    { question: "Vad får man om man blandar musselpasta och hallon likör?", answer: "spya", questionNumber: 5, clue: 'Svaret rimmar med krya' },
    { question: "Vilken stad vill jag till i sommar?", answer: "amsterdam", questionNumber: 6, clue: 'Det ligger i Nederländerna' },
    { question: "Vad heter Tristans grundskole crush i förnamn?", answer: "klara", questionNumber: 7, clue: 'Hon spelade handboll' },
    { question: "Har Anton begått ett brott när det kommer till mindreåriga och internet", answer: "ja", questionNumber: 8, clue: 'Det är ett givet svar' },
    { question: "Vem är driftigast?", answer: "josefin", questionNumber: 9, clue: 'Det är Tristans största stolthet' },
    { question: "Vart är det första stället utomlands Tristan åker till om han blir singel?", answer: "nice", questionNumber: 10, clue: 'Det ligger i södra Frankrike' },
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
          window.location.href = "/thank-you-quiz1"; 
        }, 2000);
      }

      return nextIndex;
    });
  };

  return (
    <div>
      {!isQuizStarted && <Button onClick={handleStartQuiz}>Starta Quiz</Button>}

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
              clue={qa.clue}
            />
          ))}
        </div>
      )}

      {allQuestionsAnswered && (
        <p>
          Du svarade rätt på alla frågor. Omdirigerar...
        </p>
      )}
    </div>
  );
};

export default QuizPage1;
