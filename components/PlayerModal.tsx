"use client";

import {
  Button,
  Flex,
  Text,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useState, ChangeEvent } from "react";

interface PlayerModal {
  isOpen: boolean;
  onClose: () => void;
}

import { useQuizContext } from "@/contexts/QuizContext";

export default function PlayerModal({ isOpen, onClose }: PlayerModal) {
  const { setPlayerName } = useQuizContext();
  const [name, setName] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changePlayerName = () => {
    setPlayerName(name);
    onClose();
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novi igrač</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" alignItems="flex-start" gap="30px">
            <VStack align="flex-start">
              <Text>Ime igrača:</Text>
              <Input placeholder="Upiši ime" onChange={handleChange} />
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={changePlayerName}>
            Dodaj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
