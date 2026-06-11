// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      {/* Navbar skeleton */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 h-16" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero skeleton */}
        <div className="mb-14 max-w-2xl space-y-4">
          <div className="h-6 w-40 bg-zinc-900 rounded-full animate-pulse" />
          <div className="h-12 w-3/4 bg-zinc-900 rounded-xl animate-pulse" />
          <div className="h-6 w-1/2 bg-zinc-900 rounded-xl animate-pulse" />
        </div>

        {/* Search skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-12 bg-zinc-900 rounded-xl animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 w-20 bg-zinc-900 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="h-5 w-2/3 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="border-t border-zinc-800 h-48 bg-zinc-900 animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
