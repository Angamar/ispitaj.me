import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuizContext } from "@/contexts/QuizContext";
const TimeAttackTimer = () => {
  const { seconds, setSeconds, options } = useQuizContext();

  function formatTime(totalSeconds: number) {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, "0");
    }
    return `${padTo2Digits(min)}:${padTo2Digits(sec)}`;
  }

  useEffect(() => {
    if (seconds > 0 && options.isTimerEnabled) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, options.isTimerEnabled]);

  // Render the timer
  if (options.isTimerEnabled)
    return (
      <CircularProgress
        size="260px"
        thickness="6px"
        value={seconds * 0.1}
        max={12}
        color="orange"
      >
        <CircularProgressLabel>{formatTime(seconds)}</CircularProgressLabel>
      </CircularProgress>
    );
};

export default TimeAttackTimer;
