"use client";

import { Box } from "@chakra-ui/react";

import TimeAttackTimer from "@/components/TimeAttackTimer";
import Question from "@/components/Question";
import Player from "@/components/Player";
import { useQuizContext } from "@/contexts/QuizContext";
import { useDisclosure, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import GameOverModal from "@/components/GameOverModal";

export default function TimeAttack() {
  const {
    restartGame,
    // restartTimer,
    setIsGameOver,
    setGameMode,
    options,
    questionNumber,
    isGameOver,
  } = useQuizContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGameOver = () => {
    setIsGameOver(true);
    onOpen();
  };

  useEffect(() => {
    setGameMode("time attack");
    restartGame();
    // restartTimer(30);
  }, []);

  useEffect(() => {
    if (questionNumber >= options.numberOfQuestions) {
      handleGameOver();
    }
  }, []);

  if (!isGameOver)
    return (
      <>
        <Spacer />
        <Box display="flex" flexDirection="column" alignItems="center">
          <TimeAttackTimer />
          <Question />
        </Box>
        <Spacer />

        <Player />
      </>
    );

  if (isGameOver) return <GameOverModal isOpen={isOpen} onClose={onClose} />;
}
