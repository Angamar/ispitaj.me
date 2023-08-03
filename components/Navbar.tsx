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
  Avatar,
  Switch,
} from "@chakra-ui/react";

import { useQuizContext } from "@/contexts/QuizContext";

export default function Navbar() {
  const { isTimerEnabled, toggleTimer } = useQuizContext();
  return (
    <Flex as="nav" alignItems="center" mb="10px">
      <VStack>
        <Text>Timer</Text>
        <Switch
          colorScheme="green"
          size="lg"
          isChecked={isTimerEnabled}
          onChange={toggleTimer}
        />
      </VStack>
      {/* <Flex
        alignItems="center"
        gap="12px"
        bg="green.500"
        p="8px"
        borderRadius="12px"
      >
        <Avatar bg="green.100" name="Aleksa Stojanovic" />
        <Flex display="flex" flexDir="column">
          <Text fontFamily="Overpass Mono" color="white">
            Aleksa S.
          </Text>
          <Text fontWeight="bold" color="yellow.300" lineHeight={1}>
            {points}
          </Text>
        </Flex>
      </Flex> */}
    </Flex>
  );
}
