import React from "react";

import { useEffect } from "react";
import { useQuizContext } from "@/contexts/QuizContext";

import {
  Card,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Heading,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";

import Link from "next/link";

import { CloseIcon } from "@chakra-ui/icons";
import Answer from "./Answer";

const Question = () => {
  const {
    generateQuestion,
    question,
    answer,
    questionNumber,
    isAnswerVisible,
    seconds,
    setIsAnswerVisible,
    gameMode,
    options,
  } = useQuizContext();

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

  if (questionNumber <= options.numberOfQuestions || gameMode === "time attack")
    return (
      <>
        <Card borderRadius="2xl" w="100%" maxWidth="1000px">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <HStack>
                  <Text
                    size="xs"
                    mb="2"
                    textTransform="uppercase"
                    fontFamily="Overpass Mono"
                    color="green.500"
                  >
                    Pitanje broj {questionNumber}
                  </Text>

                  <Spacer />
                  <Link href="/">
                    <Button mb="2" size="xs" colorScheme="gray">
                      <CloseIcon />
                    </Button>
                  </Link>
                </HStack>
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
        </Card>
        {/* <Answer /> */}
      </>
    );
};

export default Question;
