// src/app/not-found.tsx
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 bg-grid flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="font-mono text-8xl font-bold text-zinc-800 mb-4">
          404
        </div>
        <h1 className="font-display font-bold text-2xl text-zinc-300 mb-2">
          Page Not Found
        </h1>
        <p className="text-zinc-600 text-sm mb-8 max-w-xs mx-auto">
          The snippet or page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Snippets
        </Link>
      </div>
    </div>
  );
}
