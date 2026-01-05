import type { ListResponse } from "@/types/api.types";

export type QuizType = "mcq" | "boolean";
export type QuizOptionType = string;
export type QuizAnswerType = string | boolean;

export type QuizQuestion = {
  id: string;
  type: QuizType;
  question: string;
  options: QuizOptionType[];
  answer: QuizAnswerType;
  points: number;
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type QuizResult = {
  score: number;
  total: number;
  correct_questions: string[];
};

export type QuizSubmission = {
  quizId: string;
  answers: Record<string, QuizAnswerType>;
};

export type QuizCreatePayload = Pick<Quiz, "title" | "questions">;
export type QuizCreateResponse = {
  id: string;
};
export type QuizzesResponse = ListResponse<Quiz>;
