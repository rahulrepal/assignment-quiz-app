import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";

export interface NavbarProps {
  title?: string;
  className?: string;
  actions?: ReactNode[];
  hideTitle?: boolean;
}

export function Navbar({
  title = "Quiz App",
  className,
  actions,
  hideTitle = false,
}: NavbarProps) {
  const classes = cn("w-screen bg-white/70 backdrop-blur-md border border-white/30 sticky top-0 z-50 ", className);
  return (
    <nav className={classes}>
      <div className="flex items-center h-16 justify-between max-w-4xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center gap-2  px-4 ">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        )}
        {actions && <div className="flex items-center gap2">{actions}</div>}
      </div>
    </nav>
  );
}
