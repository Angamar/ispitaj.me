import {
  Box,
  Flex,
  IconButton,
  PopoverTrigger,
  Popover,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, Dispatch } from "react";
import { useQuizContext } from "@/contexts/QuizContext";

interface Answer {
  handleAnswerChecked: () => void;
}

const Answer = ({ handleAnswerChecked }: Answer) => {
  const {
    setPoints,
    generateQuestion: nextQuestion,
    isAnswerVisible,
    setIsAnswerVisible,
  } = useQuizContext();

  // const handleShowAnswer = () => {
  //   options.isTimerEnabled && gameMode === "classic" && setSeconds(0);
  //   setIsAnswerVisible(true);
  // };

  const handleCorrect = () => {
    setPoints((prev) => prev + 10);
    handleAnswerChecked();
    nextQuestion();
  };

  const handleWrong = () => {
    setPoints((prev) => prev - 5);
    handleAnswerChecked();
    nextQuestion();
  };

  // const handleSkip = () => {
  //   nextQuestion();
  // };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isAnswerVisible) {
        setIsAnswerVisible(true);
      }

      if (event.code === "Enter" && isAnswerVisible) {
        handleCorrect();
      }

      if (event.code === "Space" && isAnswerVisible) {
        handleWrong();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isAnswerVisible]);

  return (
    <Card mt="4" ml="auto" mr="auto">
      {/* <CardBody>
        <Flex justifyContent="center">
          <Button
            w="100%"
            tabIndex={0}
            onClick={() => setButtonText("ODGOVORI")}
          >
            {buttonText}
          </Button>
        </Flex>
      </CardBody> */}
      <CardBody>
        <Flex gap="4" justifyContent="center">
          <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton
                onClick={handleCorrect}
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="20px"
                icon={<CheckIcon />}
              />
            </PopoverTrigger>
            <PopoverContent w="auto">
              <PopoverArrow />
              <PopoverBody>Tačno odgovoreno</PopoverBody>
            </PopoverContent>
          </Popover>
          <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton
                onClick={handleWrong}
                isRound={true}
                variant="solid"
                colorScheme="red"
                aria-label="Done"
                fontSize="20px"
                icon={<CloseIcon />}
              />
            </PopoverTrigger>
            <PopoverContent w="auto">
              <PopoverArrow />
              <PopoverBody>Netačno odgovoreno</PopoverBody>
            </PopoverContent>
          </Popover>
          {/* <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton
                onClick={handleSkip}
                isRound={true}
                variant="solid"
                colorScheme="gray"
                aria-label="Done"
                fontSize="20px"
                icon={<ArrowRightIcon />}
              />
            </PopoverTrigger>
            <PopoverContent w="auto">
              <PopoverArrow />
              <PopoverBody>Bez odgovora</PopoverBody>
            </PopoverContent>
          </Popover> */}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Answer;
