import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative mx-auto w-40 h-40">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
          <div className="relative bg-blue-500 rounded-full w-40 h-40 flex items-center justify-center">
            <span className="text-6xl">🤔</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Oops! Lost in Space
          </h1>
          <p className="text-gray-600 text-lg">
            We can't seem to find the page you're looking for.
          </p>
        </div>

        <Link to="/">
          <Button size="lg" className="rounded-full px-8">
            Take Me Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
