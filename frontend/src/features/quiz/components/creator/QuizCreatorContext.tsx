import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { QuizQuestion, QuizType } from "@/features/quiz/quiz.types";
import { useQuizCreator } from "@/features/quiz/hooks";

interface QuizCreatorContextType {
  title: string;
  setTitle: (title: string) => void;
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  addQuestion: (type: QuizType) => void;
  createQuiz: () => string | null;
  updateQuestion: (
    id: string,
    field: keyof QuizQuestion,
    value: unknown
  ) => void;
  removeQuestion: (id: string) => void;
  addOption: (questionId: string) => void;
  removeOption: (questionId: string, optionIndex: number) => void;
  updateOptions: (
    questionId: string,
    optionIndex: number,
    value: string
  ) => void;
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

const QuizCreatorContext = createContext<QuizCreatorContextType | undefined>(
  undefined
);

interface QuizCreatorProviderProps {
  children: ReactNode;
}

export function QuizCreatorProvider({ children }: QuizCreatorProviderProps) {
  const {
    title,
    setTitle,
    questions,
    setQuestions,
    addQuestion,
    createQuiz,
    updateQuestion,
    removeQuestion,
    addOption,
    removeOption,
    updateOptions,
    errors,
    setErrors
  } = useQuizCreator();
  const value = useMemo(
    () => ({
      title,
      setTitle,
      questions,
      setQuestions,
      addQuestion,
      createQuiz,
      updateQuestion,
      removeQuestion,
      addOption,
      removeOption,
      updateOptions,
      errors,
      setErrors
    }),
    [
      title,
      setTitle,
      questions,
      setQuestions,
      addQuestion,
      createQuiz,
      updateQuestion,
      removeQuestion,
      addOption,
      removeOption,
      updateOptions,
      errors,
      setErrors
    ]
  );
  return (
    <QuizCreatorContext.Provider value={value}>
      {children}
    </QuizCreatorContext.Provider>
  );
}

export function useQuizCreatorContext() {
  const context = useContext(QuizCreatorContext);

  if (context === undefined) {
    throw new Error(
      "useQuizCreatorContext must be used within a QuizCreatorProvider"
    );
  }

  return context;
}

export { QuizCreatorContext };
