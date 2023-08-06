"use client";

import {
  Button,
  Flex,
  Text,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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

interface SettingsModal {
  isOpen: boolean;
  onClose: () => void;
}

import { useQuizContext } from "@/contexts/QuizContext";

export default function SettingsModal({ isOpen, onClose }: SettingsModal) {
  const { options } = useQuizContext();
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Podešavanja: Ko zna - zna</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" alignItems="flex-start" gap="30px">
            <VStack align="flex-start">
              <Text>Ukupan broj pitanja</Text>
              <NumberInput
                onChange={(string, number) =>
                  options.setNumberOfQuestions(number)
                }
                defaultValue={options.numberOfQuestions}
                min={5}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <VStack align="flex-start">
              <Text>Tajmer</Text>
              <Switch
                colorScheme="green"
                size="lg"
                isChecked={options.isTimerEnabled}
                onChange={options.toggleTimer}
              />
              <Checkbox
                mt="10px"
                isDisabled={!options.isTimerEnabled}
                isChecked={options.isAnswerOnTimeoutShown}
                onChange={options.toggleAnswerShownOnTimeout}
              >
                Prikaži odgovor na isteku vremena
              </Checkbox>
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
