"use client";

import {
  Button,
  Flex,
  Text,
  VStack,
  Input,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
} from "@chakra-ui/react";

interface PlayerModal {
  isOpen: boolean;
  onClose: () => void;
}

import { useQuizContext } from "@/contexts/QuizContext";

export default function PlayerModal({ isOpen, onClose }: PlayerModal) {
  const { options } = useQuizContext();
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
              <Input placeholder="Upiši ime" />
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Dodaj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
