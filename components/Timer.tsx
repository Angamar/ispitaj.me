import { Progress } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuizContext } from "@/contexts/QuizContext";
const Timer = () => {
  const { seconds, setSeconds, isTimerEnabled } = useQuizContext();

  useEffect(() => {
    if (seconds > 0 && isTimerEnabled) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, isTimerEnabled]);

  // Render the timer
  if (isTimerEnabled)
    return (
      <Progress
        colorScheme="orange"
        value={seconds * 12.5}
        borderRadius="2xl"
        mb="10px"
      />
    );
};

export default Timer;
