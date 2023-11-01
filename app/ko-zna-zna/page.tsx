"use client";

import { Flex } from "@chakra-ui/react";

import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Player from "@/components/Player";
import { useQuizContext } from "@/contexts/QuizContext";
import { useDisclosure, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GameOverModal from "@/components/GameOverModal";

export default function Quiz() {
  const { setIsGameOver, questionNumber, options, isGameOver, setGameMode } =
    useQuizContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGameOver = () => {
    setIsGameOver(true);
    onOpen();
  };

  const [seconds, setSeconds] = useState(6);

  const restartTimer = () => {
    setSeconds(6);
  };

  useEffect(() => {
    setGameMode("classic");
  }, []);

  useEffect(() => {
    if (seconds > 0 && options.isTimerEnabled) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, options.isTimerEnabled]);

  useEffect(() => {
    if (!isGameOver && questionNumber > options.numberOfQuestions) {
      handleGameOver();
    }
  }, [questionNumber]);

  if (!isGameOver)
    return (
      <>
        <Spacer />
        <Flex flexDir="column" alignItems="center">
          {options.isTimerEnabled && (
            <Timer seconds={seconds} type="question" />
          )}
          <Question seconds={seconds} />
          <Player seconds={seconds} restartTimer={restartTimer} />
        </Flex>
        <Spacer />
      </>
    );

  if (isGameOver) return <GameOverModal isOpen={isOpen} onClose={onClose} />;
}
