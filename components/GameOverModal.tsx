import { useQuizContext } from "@/contexts/QuizContext";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ModalContent,
  Link,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import Player from "./Player";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameOverModal = ({ isOpen, onClose }: GameOverModalProps) => {
  const router = useRouter();
  const { restartGame } = useQuizContext();

  const handleClose = () => {
    router.push("/");
    onClose();
  };

  return (
    <Box>
      <Modal isCentered isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>GAME OVER</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Player />
          </ModalBody>

          <ModalFooter gap="8px">
            <Button onClick={restartGame}>Igraj ponovo</Button>

            <Link as={NextLink} href={"/"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Zatvori
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameOverModal;
