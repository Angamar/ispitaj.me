"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1">Ko zna - zna!</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Box bg="gray.200" p="10px">
          A
        </Box>
        <Text>aleksa_95@msn.com</Text>
        <Button colorScheme="purple">Logout</Button>
      </HStack>
    </Flex>
  );
}
