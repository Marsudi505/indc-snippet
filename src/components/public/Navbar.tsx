// src/components/public/Navbar.tsx
import Link from "next/link";
import { Terminal, Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                INDC
              </span>
              <span className="font-display font-normal text-lg text-cyan-400">
                {" "}
                Snippets
              </span>
            </div>
          </Link>

          {/* Right side */}
          <nav className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800">
              v1.0.0
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all duration-200"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
