// src/components/public/SnippetCard.tsx
"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Snippet, LANGUAGE_COLORS } from "@/types";

interface SnippetCardProps {
  snippet: Snippet;
  style?: React.CSSProperties;
}

export function SnippetCard({ snippet, style }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = snippet.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const langColorClass =
    LANGUAGE_COLORS[snippet.language] ||
    "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";

  return (
    <article
      style={style}
      className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/40 animate-slide-up"
    >
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <h3 className="font-display font-semibold text-zinc-100 text-base truncate leading-tight">
              {snippet.title}
            </h3>
          </div>

          {/* Language Badge */}
          <span
            className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium border ${langColorClass}`}
          >
            {snippet.language}
          </span>
        </div>

        {snippet.description && (
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {snippet.description}
          </p>
        )}

        {/* Category Tag */}
        <div className="mt-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs text-zinc-500 bg-zinc-800 border border-zinc-700/50">
            {snippet.category}
          </span>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative flex-1 border-t border-zinc-800">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 hover:bg-zinc-700 transition-all duration-200 backdrop-blur-sm"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Syntax Highlighter */}
        <div className="overflow-auto max-h-64 text-sm">
          <SyntaxHighlighter
            language={snippet.language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              background: "transparent",
              fontSize: "0.8125rem",
              lineHeight: "1.6",
            }}
            showLineNumbers={false}
            wrapLongLines={false}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </article>
  );
}
