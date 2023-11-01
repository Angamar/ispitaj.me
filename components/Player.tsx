import React, { useEffect, useState } from "react";

import {
  Flex,
  Avatar,
  Text,
  Box,
  IconButton,
  PopoverTrigger,
  Popover,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { MdEmojiPeople } from "react-icons/md";

import { useQuizContext } from "@/contexts/QuizContext";

import Answer from "./Answer";
import Timer from "./Timer";

interface BuzzInButton {
  onBuzzIn: () => void;
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

const AnsweringTurnNumber = () => {
  return <Avatar name="1" bg="orange" />;
};

const Player = () => {
  const { points, playerName, seconds, answerSeconds, setAnswerSeconds } =
    useQuizContext();
  const [playerStatus, setPlayerStatus] = useState<
    "not buzzed in" | "buzzed in" | "answering" | "verifying answer"
  >("not buzzed in");

  const handleBuzzIn = () => {
    setPlayerStatus("buzzed in");
  };

  const handleAnswerVerified = () => {
    setPlayerStatus("not buzzed in");
  };

  useEffect(() => {
    if (seconds <= 0 && playerStatus === "buzzed in") {
      setPlayerStatus("answering");
    }
  }, [seconds]);

  useEffect(() => {
    if (answerSeconds <= 0 && playerStatus === "answering") {
      setPlayerStatus("verifying answer");
      setAnswerSeconds(3);
    }
  }, [answerSeconds]);

  if (playerStatus !== "verifying answer") {
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
          {playerStatus === "not buzzed in" && (
            <BuzzInButton seconds={seconds} onBuzzIn={handleBuzzIn} />
          )}
          {playerStatus !== "not buzzed in" && <AnsweringTurnNumber />}

          {/* <Avatar bg="green.100" name={playerName} /> */}
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
        {playerStatus === "answering" && <Timer type="answer" />}
      </VStack>
    );
  } else {
    return <Answer handleAnswerVerified={handleAnswerVerified} />;
  }
};

export default Player;
