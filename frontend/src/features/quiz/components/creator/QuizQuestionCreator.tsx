import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { useQuizCreatorContext } from "./QuizCreatorContext";
import type { QuizQuestion } from "../../quiz.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface QuizQuestionCreatorProps {
  question: QuizQuestion;
  title: string;
}

export function QuizQuestionCreator({
  question,
  title,
}: QuizQuestionCreatorProps) {
  const { removeQuestion, updateQuestion } = useQuizCreatorContext();
  
  const renderQuestionType = () => {
    switch (question.type) {
      case "mcq":
        return <QuizMCQQuestionCreator question={question} />;
      case "boolean":
        return <QuizBooleanQuestionCreator question={question} />;
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex items-center gap-2">
              {title}
              <span className="px-2 py-1  rounded-full text-xs font-medium bg-blue-600 text-white">
                {question.type === "mcq" ? "Multiple Choice" : "True/False"}
              </span>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeQuestion(question.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Question Text</Label>
          <Input
            type="text"
            placeholder="Enter question text"
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-2 flex-1">
            <Label>Points</Label>
            <Input
              type="number"
              min={1}
              placeholder="Enter points"
              value={question.points}
              onChange={(e) =>
                updateQuestion(question.id, "points", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <span className="px-3 py-2 bg-gray-100 rounded-md text-sm font-medium">
              {question.type === "mcq" ? "Multiple Choice" : "True/False"}
            </span>
          </div>
        </div>
        {renderQuestionType()}
      </CardContent>
    </Card>
  );
}

export function QuizMCQQuestionCreator({
  question,
}: {
  question: QuizQuestion;
}) {
  const { updateQuestion, updateOptions, removeOption, addOption } =
    useQuizCreatorContext();

  const options = question.options || [];
  const answer = question.answer as string;

  return (
    <div className="space-y-2">
      <Label className="mb-2">Options (select correct answer)</Label>
      <RadioGroup
        value={answer}
        onValueChange={(value) => updateQuestion(question.id, "answer", value)}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <RadioGroupItem
              value={option}
              id={`option-${question.id}-${index}`}
              disabled={option.trim() === ""}
            />
            <Input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                updateOptions(question.id, index, e.target.value)
              }
            />
            {options.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeOption(question.id, index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </RadioGroup>
      <Button variant="outline" onClick={() => addOption(question.id)}>
        <Plus /> Add Option
      </Button>
      {answer && answer.trim() && (
        <div className="pt-2 text-sm text-green-600">
          <span>Correct Answer: {answer}</span>
        </div>
      )}
      {!answer && (
        <div className="pt-2 text-sm text-red-600">
          <span>Please select the correct answer.</span>
        </div>
      )}
    </div>
  );
}

export function QuizBooleanQuestionCreator({
  question,
}: {
  question: QuizQuestion;
}) {
  const { updateQuestion } = useQuizCreatorContext();

  const answer = question.answer as boolean;
  return (
    <div className="space-y-3">
      <Label>Correct Answer</Label>
      <RadioGroup
        value={answer ? "true" : "false"}
        onValueChange={(value) =>
          updateQuestion(question.id, "answer", value === "true")
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="true" id={`boolean-true-${question.id}`} />
            <Label htmlFor={`boolean-true-${question.id}`}>True</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="false" id={`boolean-false-${question.id}`} />
            <Label htmlFor={`boolean-false-${question.id}`}>False</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
