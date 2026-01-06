import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizByIdQuery } from "@/features/quiz/store/quiz.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { QuizAttempt, QuizSkeleton } from "@/features/quiz/components";

export interface QuizDetailsPageProps {}

export function QuizDetailsPage({}: QuizDetailsPageProps) {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();

  const {
    data: quiz,
    isLoading,
    isError,
    isSuccess,
  } = useGetQuizByIdQuery(quizId || skipToken);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load quiz details. Please try again later.");
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        actions={[
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Exit to Quizzes
          </Button>,
        ]}
        hideTitle
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <QuizSkeleton />}
        {!isLoading && isSuccess && quiz && (
          <QuizAttempt quiz={quiz} />
        )}
      </main>
    </div>
  );
}
