import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export interface QuizNavbarProps {
  title?: string;
  className?: string;
}

export function QuizNavbar({ title = "Quiz App", className }: QuizNavbarProps) {
  const classes = cn("w-screen bg-white border-b border-gray-200", className);
  return (
    <nav className={classes}>
      <div className="flex items-center gap-2 h-16 px-4 max-w-4xl mx-auto">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </nav>
  );
}
