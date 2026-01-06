import { useNavigate } from "react-router-dom";
import type { Quiz, QuizOptionType } from "@/features/quiz/quiz.types";
import { useQuizAttempt } from "@/features/quiz/hooks";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// FIXME: Can be divided into components
export interface QuizAttemptProps {
  quiz: Quiz;
}

export function QuizAttempt({ quiz }: QuizAttemptProps) {
  const navigate = useNavigate();

  const {
    currentQuestionIndex,
    currentQuestion,
    answers,
    handleAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    submitQuiz,
    setCurrentQuestionIndex,
    isSubmitQuizLoading,
  } = useQuizAttempt({ quiz });
  const answer = answers[currentQuestion.id] ?? "";

  const submitQuizHandler = async () => {
    const result = await submitQuiz();
    if (result) {
      navigate(`/quizzes/${quiz.id}/result`, { state: result });
      return;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <RadioGroup
            value={answer.toString() || ""}
            onValueChange={(value) =>
              handleAnswerChange(currentQuestion.id, value)
            }
          >
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                id={`${currentQuestion.id}-option-${index}`}
                option={option}
              />
            ))}
          </RadioGroup>
        );
      case "boolean":
        return (
          <RadioGroup
            value={answer.toString() || ""}
            onValueChange={(value) =>
              handleAnswerChange(currentQuestion.id, value)
            }
          >
            {["true", "false"].map((option, index) => (
              <QuizOption
                key={index}
                id={`${currentQuestion.id}-option-${index}`}
                option={option}
              />
            ))}
          </RadioGroup>
        );
      default:
        return <div>Unsupported question type.</div>;
    }
  };

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isSubmitDisabled =
    isSubmitQuizLoading ||
    Object.keys(answers).length !== quiz.questions.length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{quiz.title}</h1>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
          <p className="text-gray-600">
            {currentQuestion.points}{" "}
            {currentQuestion.points === 1 ? "point" : "points"}
          </p>
        </div>
        <Progress value={progress} className="mt-2" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderQuestion()}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={submitQuizHandler} disabled={isSubmitDisabled}>
                Submit Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Question Progress</p>
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((question, index) => (
            <button
              key={question.id}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                index === currentQuestionIndex
                  ? "bg-black text-white"
                  : answers[question.id]
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QuizOption({
  id,
  option,
}: {
  id: string;
  option: QuizOptionType;
}) {
  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200">
      <RadioGroupItem value={option} id={id} />
      <Label htmlFor={id} className="flex-1 cursor-pointer capitalize">
        {option}
      </Label>
    </div>
  );
}
