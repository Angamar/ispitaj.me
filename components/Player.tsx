import React, { useEffect, useState } from "react";

import {
  Flex,
  Avatar,
  Text,
  IconButton,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { MdEmojiPeople } from "react-icons/md";
import { ArrowRightIcon, ViewIcon } from "@chakra-ui/icons";

import { useQuizContext } from "@/contexts/QuizContext";

import Answer from "./Answer";
import Timer from "./Timer";

interface BuzzInButton {
  onBuzzIn: () => void;
  seconds: number;
}

interface NextQuestionButton {
  handleNextQuestion: () => void;
}

interface ShowAnswerButton {
  handleShowAnswer: () => void;
}

interface Player {
  restartTimer: () => void;
  seconds: number;
}

const BuzzInButton = ({ onBuzzIn, seconds }: BuzzInButton) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <IconButton
          isDisabled={seconds === 0}
          onClick={onBuzzIn}
          isRound={true}
          variant="solid"
          colorScheme="blue"
          aria-label="Done"
          fontSize="26px"
          size="lg"
          icon={<MdEmojiPeople />}
        />
      </PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow />
        <PopoverBody>Javi se</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const NextQuestionButton = ({ handleNextQuestion }: NextQuestionButton) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <IconButton
          onClick={handleNextQuestion}
          isRound={true}
          variant="solid"
          colorScheme="gray"
          aria-label="Done"
          fontSize="18px"
          size="lg"
          icon={<ArrowRightIcon />}
        />
      </PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow />
        <PopoverBody>Javi se</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const ShowAnswerButton = ({ handleShowAnswer }: ShowAnswerButton) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <IconButton
          onClick={handleShowAnswer}
          isRound={true}
          variant="solid"
          colorScheme="purple"
          aria-label="Done"
          fontSize="18px"
          size="lg"
          icon={<ViewIcon />}
        />
      </PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow />
        <PopoverBody>Prikaži odgovor</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const Player = ({ restartTimer, seconds }: Player) => {
  const {
    points,
    playerName,
    generateQuestion: nextQuestion,
    playerStatus,
    changePlayerStatus,
    options,
    setIsAnswerVisible,
  } = useQuizContext();
  const [answerSeconds, setAnswerSeconds] = useState(3);

  const renderButton = () => {
    if (options.isTimerEnabled && seconds > 0 && playerStatus == "waiting") {
      return <BuzzInButton seconds={seconds} onBuzzIn={handleBuzzIn} />;
    }

    if (playerStatus === "buzzed in" || playerStatus === "answering") {
      return <Avatar name="1" bg="orange" />;
    }

    if (!options.isTimerEnabled) {
      return <ShowAnswerButton handleShowAnswer={handleShowAnswer} />;
    }

    if (!options.isAnswerOnTimeoutShown && answerSeconds <= 0) {
      return <ShowAnswerButton handleShowAnswer={handleShowAnswer} />;
    }

    if (options.isTimerEnabled && seconds <= 0) {
      return <NextQuestionButton handleNextQuestion={handleNextQuestion} />;
    }
  };

  const handleBuzzIn = () => {
    changePlayerStatus("buzzed in");
  };

  const handleNextQuestion = () => {
    changePlayerStatus("waiting");
    restartTimer();
    nextQuestion();
  };

  const handleAnswerChecked = () => {
    changePlayerStatus("waiting");
    restartTimer();
  };

  const handleShowAnswer = () => {
    setIsAnswerVisible(true);
    changePlayerStatus("checking answer");
  };

  useEffect(() => {
    console.log(playerStatus);
  }, []);

  useEffect(() => {
    if (seconds <= 0 && playerStatus === "buzzed in") {
      changePlayerStatus("answering");
    }
  }, [seconds]);

  useEffect(() => {
    if (answerSeconds > 0 && playerStatus === "answering") {
      const intervalId = setInterval(() => {
        setAnswerSeconds((prevSeconds) => prevSeconds - 1 / 20);
      }, 50);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
    if (answerSeconds <= 0 && playerStatus === "answering") {
      changePlayerStatus("checking answer");
      setAnswerSeconds(3);
    }
  }, [answerSeconds, playerStatus]);

  if (playerStatus !== "checking answer") {
    return (
      <VStack>
        <Flex
          alignItems="center"
          gap="12px"
          bg="green.500"
          p="16px"
          mt="8px"
          borderRadius="2xl"
          // w="20%"
        >
          {renderButton()}
          <Flex display="flex" flexDir="column">
            <HStack>
              <Text fontFamily="Overpass Mono" color="white">
                {playerName}
              </Text>
              {playerStatus === "answering" && (
                <Badge colorScheme="purple">ODGOVARA</Badge>
              )}
            </HStack>
            <Text fontWeight="bold" color="yellow.300" lineHeight={1}>
              {points}
            </Text>
          </Flex>
        </Flex>
        {playerStatus === "answering" && (
          <Timer seconds={answerSeconds} type="answer" />
        )}
      </VStack>
    );
  } else {
    return <Answer handleAnswerChecked={handleAnswerChecked} />;
  }
};

export default Player;
