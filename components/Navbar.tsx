"use client";

import { Flex, Heading, VStack, useDisclosure } from "@chakra-ui/react";

import { useQuizContext } from "@/contexts/QuizContext";

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
