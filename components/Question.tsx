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

const Question = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const {
    setPoints,
    restartTimer,
    seconds,
    setSeconds,
    points,
    isTimerEnabled,
  } = useQuizContext();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const QUESTIONNAIRE = initialize();

  const generateQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    const randomQuestion = QUESTIONNAIRE.question();
    setQuestion(randomQuestion.question);
    setAnswer(randomQuestion.answer);
    setIsAnswerVisible(false);
    isTimerEnabled && restartTimer();
  };

  const handleShowAnswer = () => {
    isTimerEnabled && setSeconds(0);
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
    if (isTimerEnabled && seconds === 0) {
      setIsAnswerVisible(true);
    }
  }, [seconds, isTimerEnabled]);

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
            <Button
              onClick={handleShowAnswer}
              tabIndex={0}
              fontFamily="Overpass Mono"
            >
              Prikaži odgovor
            </Button>
          ) : (
            <>
              <Button
                leftIcon={<CheckIcon />}
                onClick={handleCorrectClick}
                colorScheme="green"
                fontFamily="Overpass Mono"
              >
                Tačno odgovoreno
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                onClick={handleWrongClick}
                colorScheme="red"
                fontFamily="Overpass Mono"
              >
                Netačno odgovoreno
              </Button>
              <Button
                leftIcon={<ArrowRightIcon />}
                onClick={handleSkipClick}
                colorScheme="gray"
                fontFamily="Overpass Mono"
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
