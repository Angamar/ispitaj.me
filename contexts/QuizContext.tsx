// contexts/QuizContext.ts

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { usePathname } from "next/navigation";

type QuizOptions = {
  isAnswerOnTimeoutShown: boolean;
  isTimerEnabled: boolean;
  numberOfQuestions: number;
  toggleTimer: () => void;
  toggleAnswerShownOnTimeout: () => void;
  setNumberOfQuestions: (value: number) => void;
};

interface QuizContextData {
  playerName: string;
  points: number;
  seconds: number;
  isGameOver: boolean;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPoints: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  restartTimer: (sec: number) => void;
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
  const pathname = usePathname();
  const [playerName, setPlayerName] = useState("Igrač 1");
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

  const restartTimer = (sec: number) => {
    setSeconds(sec);
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
    pathname === "/potera" && restartTimer(30);
    pathname === "/ko-zna-zna" && restartTimer(8);
  };

  return (
    <QuizContext.Provider
      value={{
        points,
        setPoints,
        seconds,
        playerName,
        setPlayerName,
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
