// contexts/QuizContext.ts

import { createContext, useState, useContext, ReactNode } from "react";

type QuizOptions = {
  isAnswerOnTimeoutShown: boolean;
  isTimerEnabled: boolean;
  numberOfQuestions: number;
  toggleTimer: () => void;
  toggleAnswerShownOnTimeout: () => void;
  setNumberOfQuestions: (value: number) => void;
};

interface QuizContextData {
  points: number;
  seconds: number;
  isGameOver: boolean;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  restartTimer: () => void;
  restartGame: () => void;
  options: QuizOptions;
}

const QuizContext = createContext<QuizContextData | null>(null);

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [points, setPoints] = useState(0);
  const [seconds, setSeconds] = useState(8);
  const [isGameOver, setIsGameOver] = useState(true);
  const [options, setOptions] = useState({
    numberOfQuestions: 10,
    isTimerEnabled: true,
    isAnswerOnTimeoutShown: true,
    toggleTimer,
    toggleAnswerShownOnTimeout,
    setNumberOfQuestions,
  });

  const restartTimer = () => {
    setSeconds(8);
  };

  function toggleTimer() {
    setOptions((prevOptions) => ({
      ...prevOptions,
      isTimerEnabled: !prevOptions.isTimerEnabled,
    }));
  }

  function toggleAnswerShownOnTimeout() {
    setOptions((prevOptions) => ({
      ...prevOptions,
      isAnswerOnTimeoutShown: !prevOptions.isAnswerOnTimeoutShown,
    }));
  }

  function setNumberOfQuestions(value: number) {
    setOptions({ ...options, numberOfQuestions: value });
  }

  const restartGame = () => {
    setPoints(0);
    setIsGameOver(false);
  };

  return (
    <QuizContext.Provider
      value={{
        points,
        setPoints,
        seconds,
        setSeconds,
        restartTimer,
        options,
        isGameOver,
        setIsGameOver,
        restartGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
