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
// @ts-ignore
import { initialize } from "@paunovic/questionnaire";

type QuizOptions = {
  isAnswerOnTimeoutShown: boolean;
  isTimerEnabled: boolean;
  numberOfQuestions: number;
  toggleTimer: () => void;
  toggleAnswerShownOnTimeout: () => void;
  setNumberOfQuestions: (value: number) => void;
};

type PlayerStatus = "waiting" | "buzzed in" | "answering" | "checking answer";

interface QuizContextData {
  gameMode: "classic" | "time attack";
  questionNumber: number;
  question: string;
  answer: string;
  isAnswerVisible: boolean;
  playerName: string;
  points: number;
  seconds: number;
  answerSeconds: number;
  isGameOver: boolean;
  playerStatus: PlayerStatus;
  changePlayerStatus: (status: PlayerStatus) => void;
  setGameMode: Dispatch<SetStateAction<"classic" | "time attack">>;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setIsAnswerVisible: Dispatch<SetStateAction<boolean>>;
  setPoints: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setAnswerSeconds: Dispatch<SetStateAction<number>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  restartGame: () => void;
  generateQuestion: () => void;
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
  const QUESTIONNAIRE = initialize();
  const [gameMode, setGameMode] = useState<"classic" | "time attack">(
    "classic"
  );
  const [playerName, setPlayerName] = useState("Igrač 1");
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>("waiting");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [points, setPoints] = useState(0);
  const [seconds, setSeconds] = useState(8);
  const [answerSeconds, setAnswerSeconds] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [options, setOptions] = useState({
    numberOfQuestions: 10,
    isTimerEnabled: true,
    isAnswerOnTimeoutShown: true,
    toggleTimer,
    toggleAnswerShownOnTimeout,
    setNumberOfQuestions,
  });

  const generateQuestion = () => {
    setIsAnswerVisible(false);
    setQuestionNumber((prev) => prev + 1);
    const randomQuestion = QUESTIONNAIRE.question();
    setQuestion(randomQuestion.question);
    setAnswer(randomQuestion.answer);
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

  const changePlayerStatus = (status: PlayerStatus) => {
    setPlayerStatus(status);
  };

  function setNumberOfQuestions(value: number) {
    setOptions({ ...options, numberOfQuestions: value });
  }

  const restartGame = () => {
    setQuestionNumber(0);
    setPlayerStatus("waiting");
    setIsAnswerVisible(false);
    setPoints(0);
    setIsGameOver(false);
  };

  return (
    <QuizContext.Provider
      value={{
        gameMode,
        setGameMode,
        questionNumber,
        playerStatus,
        question,
        answer,
        isAnswerVisible,
        setIsAnswerVisible,
        points,
        setPoints,
        seconds,
        answerSeconds,
        playerName,
        changePlayerStatus,
        setPlayerName,
        setSeconds,
        setAnswerSeconds,
        options,
        isGameOver,
        setIsGameOver,
        restartGame,
        generateQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
