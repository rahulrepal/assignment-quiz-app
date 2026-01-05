import { baseApi } from "@/store/base.api";
import type {
  Quiz,
  QuizCreatePayload,
  QuizCreateResponse,
  QuizResult,
  QuizSubmission,
  QuizzesResponse,
} from "../quiz.types";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query<QuizzesResponse, void>({
      query: () => ({
        url: "/api/quizzes",
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    createQuiz: builder.mutation<QuizCreateResponse, QuizCreatePayload>({
      query: (newQuiz) => ({
        url: "/api/quizzes",
        method: "POST",
        body: newQuiz,
      }),
      invalidatesTags: ["quiz"],
    }),
    submitQuiz: builder.mutation<QuizResult, QuizSubmission>({
      query: ({ quizId, answers }) => ({
        url: `/api/quizzes/${quizId}/submit`,
        method: "POST",
        body: { answers },
      }),
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useSubmitQuizMutation,
} = quizApi;
