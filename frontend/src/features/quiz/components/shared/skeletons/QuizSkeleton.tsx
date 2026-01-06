export function QuizSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-9 w-3/4 rounded bg-gray-200" /> {/* Title (3xl) */}
        <div className="h-4 w-1/2 rounded bg-gray-200" /> {/* Meta line */}
      </div>

      <div className="rounded-lg border bg-white p-6 space-y-5">
        <div className="h-5 w-5/6 rounded bg-gray-200" />
        <div className="h-5 w-4/6 rounded bg-gray-200" />

        <div className="space-y-3 pt-4">
          <div className="h-10 w-full rounded bg-gray-100" />
          <div className="h-10 w-full rounded bg-gray-100" />
          <div className="h-10 w-full rounded bg-gray-100" />
          <div className="h-10 w-full rounded bg-gray-100" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-8 w-8 rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
