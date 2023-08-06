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
        <Heading>Ispitaj.me</Heading>
      </Flex>
    </>
  );
}
