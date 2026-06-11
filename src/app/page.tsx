// src/app/page.tsx
import { getAllSnippets } from "@/lib/actions";
import { Navbar } from "@/components/public/Navbar";
import { SnippetGrid } from "@/components/public/SnippetGrid";
import { Terminal, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const { data: snippets, error } = await getAllSnippets();

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-14 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-medium">
              Personal Code Library
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100 mb-4 leading-tight">
            Code snippets,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              always within reach.
            </span>
          </h1>

          <p className="text-lg text-zinc-500 leading-relaxed mb-6">
            A curated collection of Node.js, JavaScript, and bot scripts.
            Searchable, organized, and ready to copy.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span className="font-mono">
                <span className="text-zinc-300 font-semibold">
                  {snippets?.length ?? 0}
                </span>{" "}
                snippets
              </span>
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="font-mono text-zinc-600">
              Always expanding
              <ArrowRight className="inline ml-1 w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 mb-8">
            <p className="text-sm text-red-400 font-mono">{error}</p>
          </div>
        )}

        {/* Snippet Grid with Search */}
        {snippets && <SnippetGrid initialSnippets={snippets} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-zinc-700 font-mono">
          <span>© {new Date().getFullYear()} INDC Snippets</span>
          <Link
            href="/admin/login"
            className="text-zinc-700 hover:text-zinc-500 transition-colors"
          >
            Admin →
          </Link>
        </div>
      </footer>
    </div>
  );
}
