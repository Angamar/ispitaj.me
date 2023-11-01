import { Progress } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuizContext } from "@/contexts/QuizContext";

interface Timer {
  type: "question" | "answer";
}
const Timer = ({ type }: Timer) => {
  const { seconds, setSeconds, answerSeconds, setAnswerSeconds, options } =
    useQuizContext();
  const progressBarValue =
    type === "question" ? seconds * 12.5 : answerSeconds * 33.33;

  useEffect(() => {
    if (type === "question" && seconds > 0 && options.isTimerEnabled) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, options.isTimerEnabled]);

  useEffect(() => {
    if (type === "answer" && answerSeconds > 0) {
      const intervalId = setInterval(() => {
        setAnswerSeconds((prevSeconds) => prevSeconds - 1 / 20);
      }, 50);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, []);

  // Render the timer
  if (options.isTimerEnabled || type === "answer")
    return (
      <Progress
        colorScheme={type === "question" ? "orange" : "purple"}
        value={progressBarValue}
        borderRadius="2xl"
        mb="10px"
        w="100%"
      />
    );
};

export default Timer;
