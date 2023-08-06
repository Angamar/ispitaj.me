"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
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
  useDisclosure,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";

import { SettingsIcon } from "@chakra-ui/icons";
import { useQuizContext } from "@/contexts/QuizContext";
import { useRef } from "react";

export default function Navbar() {
  const { options } = useQuizContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="center"
        mb="10px"
        gap="30px"
      >
        <VStack></VStack>
        <Heading>Ko zna - zna</Heading>
        <IconButton
          aria-label="Podešavanja"
          onClick={onOpen}
          icon={<SettingsIcon />}
        />
      </Flex>
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
            {/* <Button variant="ghost">Secondary Action</Button> */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
