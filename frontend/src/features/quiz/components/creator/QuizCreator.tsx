import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuizCreatorContext } from "./QuizCreatorContext";
import { QuizQuestionCreator } from "./QuizQuestionCreator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface QuizCreatorProps {}

export function QuizCreator({}: QuizCreatorProps) {
  const navigate = useNavigate();
  const { title, setTitle, questions, addQuestion, errors, createQuiz } =
    useQuizCreatorContext();

  const createQuizHandler = async () => {
    const result = await createQuiz();
    if (result) {
      navigate(`/quizzes/${result}`);
    }
  };

  const isCreateDisabled = title.trim() === "" || questions.length === 0;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <p className="text-gray-600">
          Build your quiz by adding questions and options.
        </p>
        {errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md">
            <div className="text-red-700 relative px-4">
              <strong className="font-bold">Errors:</strong>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Quiz Title</Label>
            <Input
              type="text"
              id="quiz-title"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuizQuestionCreator
            key={question.id}
            question={question}
            title={`Question ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Button variant="outline" onClick={() => addQuestion("mcq")}>
          <Plus /> Add Muliple Choice Question
        </Button>
        <Button variant="outline" onClick={() => addQuestion("boolean")}>
          <Plus /> Add True/False Question
        </Button>
      </div>
      <div className="flex justify-end">
        <Button disabled={isCreateDisabled} onClick={createQuizHandler}>
          Create Quiz <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
