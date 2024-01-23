import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput } from "@mantine/core";

interface TextQuestionComponentProps {
  question: string;
  answer: string;
  onCompletion?: (questionNumber: number, completed: boolean) => void;
  questionNumber: number;
}

const TextQuestionComponent: React.ForwardRefRenderFunction<
  { open: () => void; close: () => void },
  TextQuestionComponentProps
> = ({ question, answer, onCompletion, questionNumber }, ref) => {
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);

  const checkAnswer = () => {
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      setFeedback("Rätt!");
      setTimeout(() => {
        setFeedback("");
        setUserInput("");
        if (onCompletion) {
          onCompletion(questionNumber, true);
        }
      }, 1000);

      setTimeout(() => {
        close();
      }, 2000);
    } else {
      setFeedback("Fel, försök igen");
    }
  };

  useEffect(() => {
    checkAnswer();
  }, [userInput]);

  useImperativeHandle(ref, () => ({
    open: () => {
      open();
    },
    close: () => {
      close();
    },
  }));

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={`Fråga ${questionNumber}`}
        centered
      >
        <p>{question}</p>
        <label htmlFor="answerInput"></label>
        <TextInput
          type="text"
          id="answerInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <p className={feedback === "Rätt!" ? "correct" : "incorrect"}>
          {feedback}
        </p>
      </Modal>
    </div>
  );
};

export default forwardRef(TextQuestionComponent);
