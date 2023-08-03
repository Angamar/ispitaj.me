"use client";

import { Box } from "@chakra-ui/react";

import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Player from "@/components/Player";

export default function Quiz() {
  return (
    <Box>
      <Player />
      <Timer />
      <Question />
    </Box>
  );
}
