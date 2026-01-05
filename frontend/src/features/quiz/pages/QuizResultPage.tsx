import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { QuizResult } from "../quiz.types";
import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface QuizResultPageProps {}

export function QuizResultPage({}: QuizResultPageProps) {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();

  const result = (location.state as QuizResult) || null;

  const percentage = Math.round(
    (result.score / result.total) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        actions={[
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeft /> Back to Quizzes
          </Button>,
        ]}
        hideTitle
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-1">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className=" bg-white rounded-lg border p-8 space-y-4">
              <div className="text-6xl font-bold text-blue-600">
                {percentage}%
              </div>
              <p className="text-gray-700 text-sm">
                You scored <strong>{result?.score}</strong> out of{" "}
                <strong>{result?.total}</strong> points.
              </p>

              <p className="text-sm text-gray-500">
                {percentage >= 70
                  ? "Nice work! Your clearly know your stuff 💪"
                  : percentage >= 40
                  ? "Not bad, A little more practice and you'll get there 🙂"
                  : "Rough run. But hey, learning arc 📈"}
              </p>
            </div>
            <div className="mt=8 flex justify-center gap-4">
              <Button onClick={() => navigate(`/quizzes/${quizId}`)}>
                Retake Quiz
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                All Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
