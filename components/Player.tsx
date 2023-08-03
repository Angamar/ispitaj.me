import React from "react";

import { Flex, Avatar, Text } from "@chakra-ui/react";

import { useQuizContext } from "@/contexts/QuizContext";

const Player = () => {
  const { points } = useQuizContext();
  return (
    <Flex
      alignItems="center"
      gap="12px"
      bg="green.500"
      p="8px"
      borderRadius="2xl"
      mb="10px"
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
    </Flex>
  );
};

export default Player;
