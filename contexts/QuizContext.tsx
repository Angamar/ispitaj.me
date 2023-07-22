// contexts/QuizContext.ts

import { createContext, useState, useContext, ReactNode } from "react";

interface QuizContextData {
  points: number;
  seconds: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  restartTimer: () => void;
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

  const restartTimer = () => {
    setSeconds(8);
  };

  return (
    <QuizContext.Provider
      value={{ points, setPoints, seconds, setSeconds, restartTimer }}
    >
      {children}
    </QuizContext.Provider>
  );
}
