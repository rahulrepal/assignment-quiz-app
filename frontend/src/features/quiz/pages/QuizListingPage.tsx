import {
  QuizCard,
  QuizzesSkeleton,
} from "@/features/quiz/components";
import { useGetQuizzesQuery } from "../store/quiz.api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navbar } from "@/components/shared";

export interface QuizListingPageProps {}

export function QuizListingPage({}: QuizListingPageProps) {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetQuizzesQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load quizzes. Please try again later.");
    }
  }, [isError]);

  const quizzes = data?.data ?? [];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl md:w-4xl mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Available Quizzes
          </h1>
          <p className="text-gray-600">
            Browse and select a quiz to test your knowledge!
          </p>
        </div>
        {isLoading && <QuizzesSkeleton />}
        {!isLoading && isSuccess && quizzes && quizzes.length === 0 && (
          <p className="text-gray-600">No quizzes available at the moment.</p>
        )}
        {!isLoading && isSuccess && quizzes && quizzes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <QuizCard
                className="cursor-pointer"
                tabIndex={0}
                role="button"
                key={quiz.id}
                quiz={quiz}
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
              />
            ))}
          </div>
        )}
      </main>
      <footer className="w-full border-t bg-white mt-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4 text-center text-sm text-gray-500">
          <span>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</span>
          <Link to="/quizzes/create" className=""> Create a Quiz </Link>
        </div>
      </footer>
    </div>
  );
}
