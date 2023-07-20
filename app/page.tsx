"use client";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { initialize } from "@paunovic/questionnaire";
import { useEffect, useState } from "react";

// Initialization with default language pack
const QUESTIONNAIRE = initialize();

export default function Quiz() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [points, setPoints] = useState(0);

  const generateQuestion = () => {
    const randomQuestion = QUESTIONNAIRE.question();
    setQuestion(randomQuestion.question);
    setAnswer(randomQuestion.answer);
    setIsAnswerVisible(false);
  };

  const handleCorrectClick = () => {
    setPoints((prev) => prev + 1);
    generateQuestion();
  };

  const handleWrongClick = () => {
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

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
    <Container maxWidth="5xl">
      <Text ml="30px" color="blue.300" fontWeight="bold">
        Usmeno odgovorite na pitanje, prikažite odgovor i zatim označite jeste
        li tačno ili netačno odgovorili.
      </Text>

      <Card>
        <CardHeader>
          <Text>Poena: {points}</Text>
        </CardHeader>
        <CardBody>
          <Text fontWeight="bold">{question}</Text>
          <Flex justifyContent="center">
            <Text>{isAnswerVisible && answer}</Text>
          </Flex>
        </CardBody>
        <CardFooter>
          <HStack>
            {!isAnswerVisible ? (
              <Button
                onClick={() => {
                  setIsAnswerVisible(true);
                }}
                tabIndex={0}
              >
                Prikaži odgovor
              </Button>
            ) : (
              <>
                <Button
                  leftIcon={<CheckIcon />}
                  bg="green.200"
                  onClick={handleCorrectClick}
                >
                  Tačno odgovoreno
                </Button>
                <Button
                  leftIcon={<CloseIcon />}
                  bg="red.200"
                  onClick={handleWrongClick}
                >
                  Netačno odgovoreno
                </Button>
              </>
            )}
          </HStack>
        </CardFooter>
      </Card>
    </Container>
  );
}
