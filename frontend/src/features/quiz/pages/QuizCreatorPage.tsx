import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuizCreator } from "@/features/quiz/components";
import { QuizCreatorProvider } from "../components/creator/QuizCreatorContext";

export interface QuizCreatorPageProps {}

export function QuizCreatorPage({}: QuizCreatorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        hideTitle
        actions={[
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quizzes
          </Button>,
        ]}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizCreatorProvider>
          <QuizCreator />
        </QuizCreatorProvider>
      </main>
    </div>
  );
}
