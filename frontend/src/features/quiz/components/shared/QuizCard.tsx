import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quiz } from "@/features/quiz/quiz.types";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export interface QuizCardProps extends ComponentPropsWithoutRef<typeof Card> {
  quiz: Quiz;
}

export function QuizCard({ quiz, className, ...props }: QuizCardProps) {
  const classes = cn("", className);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && props?.onClick) {
      e.preventDefault();
      props.onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
    if (props?.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <Card className={classes} onKeyDown={handleKeyDown} {...props}>
      <CardHeader>
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Created at</span>
            <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
