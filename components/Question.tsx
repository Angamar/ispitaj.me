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

interface Question {
  seconds: number;
}

const Question = ({ seconds }: Question) => {
  const {
    generateQuestion,
    question,
    answer,
    questionNumber,
    isAnswerVisible,
    setIsAnswerVisible,
    gameMode,
    options,
    playerStatus,
  } = useQuizContext();

  useEffect(() => {
    generateQuestion();
  }, []);

  const isShowAnswerButtonVisible = () => {
    if (
      (!isAnswerVisible && !options.isAnswerOnTimeoutShown && seconds === 0) ||
      (!isAnswerVisible && !options.isTimerEnabled)
    )
      return true;
  };

  useEffect(() => {
    if (
      options.isTimerEnabled &&
      options.isAnswerOnTimeoutShown &&
      seconds === 0
    ) {
      playerStatus === "waiting" && setIsAnswerVisible(true);
      playerStatus === "checking answer" && setIsAnswerVisible(true);
    }
  }, [seconds, options.isTimerEnabled, playerStatus]);

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
                {isShowAnswerButtonVisible() && (
                  <Button onClick={() => setIsAnswerVisible(true)}>
                    Prikaži odgovor
                  </Button>
                )}
              </Box>
            </Stack>
          </CardBody>
        </Card>
        {/* <Answer /> */}
      </>
    );
};

export default Question;
