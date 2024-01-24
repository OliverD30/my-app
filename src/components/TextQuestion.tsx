import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, TextInput, Notification, Flex } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";

interface TextQuestionComponentProps {
  question: string;
  answer: string;
  onCompletion?: (questionNumber: number, completed: boolean) => void;
  questionNumber: number;
  clue: string; 
}

const TextQuestionComponent: React.ForwardRefRenderFunction<
  { open: () => void; close: () => void },
  TextQuestionComponentProps
> = ({ question, answer, onCompletion, questionNumber, clue }, ref) => {
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [opened1, { open: open1, close: close1 }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
  const [opened3, { open: open3, close: close3 }] = useDisclosure(false);


  const focusTrapRef = useFocusTrap(opened);

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
        ref={focusTrapRef}
        closeOnClickOutside={false}
        withCloseButton={false}
        closeOnEscape={false}
      >
        <div>
          <p>{question}</p>
          <label htmlFor="answerInput"></label>
          <TextInput
            type="text"
            id="answerInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            data-autofocus // Initial focus on the input
          />
          <p className={feedback === "Rätt!" ? "correct" : "incorrect"}>
            {feedback}
          </p>
        </div>
        <div>

        </div>
        <Flex justify={'space-between'}>
        <Button color={"red"} onClick={open1}>
          Ge upp
        </Button>
        <Button onClick={open3}>
          Ledtråd
        </Button>
        </Flex>
        <Modal
            opened={opened3}
            onClose={close3}
            title={`Här är ledtråden för fråga ${questionNumber}:`}
            centered
            closeOnClickOutside={false}
            withCloseButton={true}
            closeOnEscape={false}
            size="md"
          >
            <p>{clue}</p>
          </Modal>
        <Modal
          opened={opened1}
          onClose={close1}
          title="Ge upp?"
          closeOnClickOutside={false}
          withCloseButton={false}
          closeOnEscape={false}
          overlayProps={{ opacity: "100" }}
          centered
          size="md"
        >
          <div>
            <p>Är du säker på att du vill ge upp?</p>
            <div>
              <Button
                color={"red"}
                onClick={() => {
                  open2();

                  setTimeout(() => {
                    close1();
                    close2();
                  }, 2000);
                }}
                style={{ marginRight: "20px" }}
              >
                Ja
              </Button>

              <Button color={"green"} onClick={close1}>
                Nej
              </Button>
            </div>
          </div>
          <Modal
            opened={opened2}
            onClose={close2}
            title="Du är en bitch"
            centered
            closeOnClickOutside={false}
            withCloseButton={false}
            closeOnEscape={false}
            size="md"
          >
            <p>Det går inte att ge upp</p>
          </Modal>
        </Modal>
        
      </Modal>
    </div>
  );
};

export default forwardRef(TextQuestionComponent);
