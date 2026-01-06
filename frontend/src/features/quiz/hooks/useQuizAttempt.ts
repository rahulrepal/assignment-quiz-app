import { useCallback, useState } from "react";
import type { Quiz, QuizAnswerType } from "../quiz.types";
import { useSubmitQuizMutation } from "../store/quiz.api";
import { toast } from "react-toastify";

export function useQuizAttempt({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, QuizAnswerType>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitQuizMutation, { isLoading: isSubmitQuizLoading }] =
    useSubmitQuizMutation();

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, quiz.questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const submitQuiz = useCallback(async () => {
    if (!quiz.id) {
      toast.error("Invalid quiz ID. Cannot submit quiz.");
      return null;
    }

    if (Object.keys(answers).length === 0) {
      toast.error(
        "No answers provided. Please answer at least one question before submitting."
      );
      return null;
    }

    try {
      const result = await submitQuizMutation({
        quizId: quiz.id,
        answers,
      }).unwrap();

      toast.success("Quiz submitted successfully!");

      return result;
    } catch (error) {
      toast.error("Failed to submit quiz. Please try again later.");
      console.error("Failed to submit quiz:", error);
      return null;
    }
  }, [answers, quiz.id, submitQuizMutation]);

  const handleAnswerChange = useCallback(
    (questionId: string, answer: QuizAnswerType) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    },
    []
  );

  const currentQuestion = quiz.questions[currentQuestionIndex];
  return {
    answers,
    setAnswers,
    currentQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion,
    submitQuiz,
    isSubmitQuizLoading,
    handleAnswerChange,
    currentQuestion,
    setCurrentQuestionIndex
  };
}
