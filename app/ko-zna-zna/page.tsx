"use client";

import { Box } from "@chakra-ui/react";

import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Player from "@/components/Player";
import { useQuizContext } from "@/contexts/QuizContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function Quiz() {
  const { points, setPoints, restartGame, setIsGameOver, isGameOver } =
    useQuizContext();
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
          <Timer />
          <Question handleGameOver={handleGameOver} />
        </Box>
        <Spacer />

        <Player />
      </>
    );

  if (isGameOver)
    return (
      <Box>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading>GAME OVER</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are done
              <Text>Total score: {points}</Text>
            </ModalBody>

            <ModalFooter>
              <Button onClick={restartGame}>Igraj ponovo</Button>

              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
}
