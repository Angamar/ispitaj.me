// contexts/QuizContext.ts

import { createContext, useState, useContext, ReactNode } from "react";

interface QuizContextData {
  points: number;
  seconds: number;
  isTimerEnabled: boolean;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  restartTimer: () => void;
  toggleTimer: () => void;
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
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);

  const restartTimer = () => {
    setSeconds(8);
  };

  const toggleTimer = () => {
    setIsTimerEnabled((prev) => !prev);
  };

  return (
    <QuizContext.Provider
      value={{
        points,
        setPoints,
        seconds,
        setSeconds,
        restartTimer,
        toggleTimer,
        isTimerEnabled,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
