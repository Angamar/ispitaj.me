import { Progress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Timer {
  type: "question" | "answer";
  seconds: number;
}
const Timer = ({ type, seconds }: Timer) => {
  const [totalSeconds, setTotalSeconds] = useState(seconds);
  const getProgressBarValue = (seconds: number) => {
    return seconds * (100 / totalSeconds);
  };

  const progressBarValue = getProgressBarValue(seconds);

  return (
    <Progress
      hasStripe={type === "answer"}
      colorScheme={type === "question" ? "orange" : "purple"}
      value={progressBarValue}
      borderRadius="2xl"
      mb="10px"
      w="100%"
    />
  );
};

export default Timer;
