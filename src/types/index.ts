// src/types/index.ts

export interface Snippet {
  id: string;
  title: string;
  description: string | null;
  code: string;
  language: string;
  category: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type SnippetInput = Omit<Snippet, "id" | "createdAt" | "updatedAt">;

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "bash"
  | "json"
  | "html"
  | "css"
  | "sql"
  | "markdown"
  | "yaml"
  | "docker";

export type Category =
  | "Utilities"
  | "Node.js"
  | "Bots"
  | "APIs"
  | "Database"
  | "Auth"
  | "DevOps"
  | "Other";

export const LANGUAGES: Language[] = [
  "javascript",
  "typescript",
  "python",
  "bash",
  "json",
  "html",
  "css",
  "sql",
  "markdown",
  "yaml",
  "docker",
];

export const CATEGORIES: Category[] = [
  "Utilities",
  "Node.js",
  "Bots",
  "APIs",
  "Database",
  "Auth",
  "DevOps",
  "Other",
];

export const LANGUAGE_COLORS: Record<string, string> = {
  javascript: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  typescript: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  python: "text-green-400 bg-green-400/10 border-green-400/20",
  bash: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  json: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  html: "text-red-400 bg-red-400/10 border-red-400/20",
  css: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  sql: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  markdown: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  yaml: "text-lime-400 bg-lime-400/10 border-lime-400/20",
  docker: "text-sky-400 bg-sky-400/10 border-sky-400/20",
};
