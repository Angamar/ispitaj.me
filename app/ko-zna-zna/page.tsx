"use client";

import { Flex } from "@chakra-ui/react";

import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Player from "@/components/Player";
import { useQuizContext } from "@/contexts/QuizContext";
import { useDisclosure, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import GameOverModal from "@/components/GameOverModal";

export default function Quiz() {
  const {
    restartClassicTimer,
    setIsGameOver,
    questionNumber,
    options,
    isGameOver,
    setGameMode,
  } = useQuizContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGameOver = () => {
    setIsGameOver(true);
    onOpen();
  };

  useEffect(() => {
    console.log("ko zna zna rendered");
    setGameMode("classic");
    restartClassicTimer(8);
  }, []);

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
          <Timer type="question" />
          <Question />
          <Player />
        </Flex>
        <Spacer />
      </>
    );

  if (isGameOver) return <GameOverModal isOpen={isOpen} onClose={onClose} />;
}
