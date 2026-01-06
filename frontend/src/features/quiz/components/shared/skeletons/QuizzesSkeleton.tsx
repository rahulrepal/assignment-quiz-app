export function QuizzesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 space-y-4 animate-pulse"
        >
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}
