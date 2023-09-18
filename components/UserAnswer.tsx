import React from "react";

// @ts-ignore
import { initialize } from "@paunovic/questionnaire";

import { useEffect, useState } from "react";
import { useQuizContext } from "@/contexts/QuizContext";

import {
  Card,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface QuestionProps {
  handleGameOver: () => void;
}

const Question = ({ handleGameOver }: QuestionProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { setPoints, restartTimer, seconds, setSeconds, options } =
    useQuizContext();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const QUESTIONNAIRE = initialize();

  const generateQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    if (questionNumber >= options.numberOfQuestions) {
      handleGameOver();
      return;
    }
    const randomQuestion = QUESTIONNAIRE.question();
    setQuestion(randomQuestion.question);
    setAnswer(randomQuestion.answer);
    setIsAnswerVisible(false);
    options.isTimerEnabled && restartTimer(8);
  };

  const handleShowAnswer = () => {
    options.isTimerEnabled && setSeconds(0);
    setIsAnswerVisible(true);
  };

  const handleCorrectClick = () => {
    setPoints((prev) => prev + 10);
    generateQuestion();
  };

  const handleWrongClick = () => {
    setPoints((prev) => prev - 5);
    generateQuestion();
  };

  const handleSkipClick = () => {
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (
      options.isTimerEnabled &&
      options.isAnswerOnTimeoutShown &&
      seconds === 0
    ) {
      setIsAnswerVisible(true);
    }
  }, [seconds, options.isTimerEnabled]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isAnswerVisible) {
        setIsAnswerVisible(true);
      }

      if (event.code === "Enter" && isAnswerVisible) {
        handleCorrectClick();
      }

      if (event.code === "Space" && isAnswerVisible) {
        handleWrongClick();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isAnswerVisible]);

  if (questionNumber <= options.numberOfQuestions)
    return (
      <Card borderRadius="2xl" w="100%" maxWidth="1000px">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text
                size="xs"
                mb="2"
                textTransform="uppercase"
                fontFamily="Overpass Mono"
                color="green.500"
              >
                Pitanje broj {questionNumber}
              </Text>
              <Heading fontSize="2xl" pr={{ base: "0px", md: "60px" }}>
                {question}
              </Heading>
            </Box>
            <Box>
              <Text fontSize="l" fontFamily="Overpass Mono">
                {isAnswerVisible && answer}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack direction={["column", "row"]}>
            {!isAnswerVisible ? (
              <Button onClick={handleShowAnswer} tabIndex={0}>
                Prikaži odgovor
              </Button>
            ) : (
              <>
                <Button
                  leftIcon={<CheckIcon />}
                  onClick={handleCorrectClick}
                  colorScheme="green"
                >
                  Tačno odgovoreno
                </Button>
                <Button
                  leftIcon={<CloseIcon />}
                  onClick={handleWrongClick}
                  colorScheme="red"
                >
                  Netačno odgovoreno
                </Button>
                <Button
                  leftIcon={<ArrowRightIcon />}
                  onClick={handleSkipClick}
                  colorScheme="gray"
                >
                  Bez odgovora
                </Button>
              </>
            )}
          </Stack>
        </CardFooter>
      </Card>
    );
};

export default Question;
