// src/components/public/SearchAndFilter.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, X, Filter } from "lucide-react";
import { Snippet } from "@/types";

interface SearchAndFilterProps {
  snippets: Snippet[];
  onFilter: (filtered: Snippet[]) => void;
  categories: string[];
  languages: string[];
}

export function SearchAndFilter({
  snippets,
  onFilter,
  categories,
  languages,
}: SearchAndFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const q = query.toLowerCase();
      const filtered = snippets.filter((s) => {
        const matchesQuery =
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.language.toLowerCase().includes(q);

        const matchesCategory =
          !selectedCategory || s.category === selectedCategory;
        const matchesLanguage =
          !selectedLanguage || s.language === selectedLanguage;

        return matchesQuery && matchesCategory && matchesLanguage;
      });

      onFilter(filtered);
    });
  }, [query, selectedCategory, selectedLanguage, snippets, onFilter]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedLanguage("");
  };

  const hasFilters = query || selectedCategory || selectedLanguage;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search snippets by title, description, or code..."
          className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter tags */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 mr-1">
          <Filter className="w-3 h-3" />
          <span className="font-mono">Filter:</span>
        </div>

        {/* Category filters */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? "" : cat)
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Divider */}
        {languages.length > 0 && (
          <div className="h-5 w-px bg-zinc-800 mx-1" />
        )}

        {/* Language filters */}
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() =>
              setSelectedLanguage(selectedLanguage === lang ? "" : lang)
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
              selectedLanguage === lang
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {lang}
          </button>
        ))}

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/5 border border-transparent hover:border-red-400/20 transition-all duration-200"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
