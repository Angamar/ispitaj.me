"use client";

import { Box } from "@chakra-ui/react";

import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Player from "@/components/Player";
import { useQuizContext } from "@/contexts/QuizContext";
import { useDisclosure, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import GameOverModal from "@/components/GameOverModal";

export default function Quiz() {
  const { restartGame, setIsGameOver, isGameOver } = useQuizContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGameOver = () => {
    setIsGameOver(true);
    onOpen();
  };

  useEffect(() => {
    restartGame();
  }, []);

  if (!isGameOver)
    return (
      <>
        <Spacer />
        <Box>
          ko-zna-zna
          <Timer />
          <Question gameMode="classic" handleGameOver={handleGameOver} />
        </Box>
        <Spacer />
        <Player />
      </>
    );

  if (isGameOver) return <GameOverModal isOpen={isOpen} onClose={onClose} />;
}
