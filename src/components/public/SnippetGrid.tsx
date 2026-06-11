// src/components/public/SnippetGrid.tsx
"use client";

import { useState, useCallback } from "react";
import { SnippetCard } from "./SnippetCard";
import { SearchAndFilter } from "./SearchAndFilter";
import { Snippet } from "@/types";
import { PackageOpen } from "lucide-react";

interface SnippetGridProps {
  initialSnippets: Snippet[];
}

export function SnippetGrid({ initialSnippets }: SnippetGridProps) {
  const [filteredSnippets, setFilteredSnippets] =
    useState<Snippet[]>(initialSnippets);

  const handleFilter = useCallback((filtered: Snippet[]) => {
    setFilteredSnippets(filtered);
  }, []);

  // Extract unique categories and languages
  const categories = [...new Set(initialSnippets.map((s) => s.category))].sort();
  const languages = [...new Set(initialSnippets.map((s) => s.language))].sort();

  return (
    <div className="space-y-8">
      <SearchAndFilter
        snippets={initialSnippets}
        onFilter={handleFilter}
        categories={categories}
        languages={languages}
      />

      {/* Stats bar */}
      <div className="flex items-center justify-between text-xs text-zinc-600 font-mono">
        <span>
          Showing{" "}
          <span className="text-cyan-400 font-semibold">
            {filteredSnippets.length}
          </span>{" "}
          of{" "}
          <span className="text-zinc-400 font-semibold">
            {initialSnippets.length}
          </span>{" "}
          snippets
        </span>
        <span className="text-zinc-700">
          {categories.length} categories · {languages.length} languages
        </span>
      </div>

      {/* Snippet Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredSnippets.map((snippet, index) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <PackageOpen className="w-7 h-7 text-zinc-600" />
          </div>
          <h3 className="font-display font-semibold text-zinc-400 mb-1">
            No snippets found
          </h3>
          <p className="text-sm text-zinc-600 max-w-xs">
            Try adjusting your search query or filters.
          </p>
        </div>
      )}
    </div>
  );
}
