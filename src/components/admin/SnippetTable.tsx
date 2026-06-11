// src/components/admin/SnippetTable.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSnippet } from "@/lib/actions";
import { SnippetForm } from "./SnippetForm";
import { Snippet, LANGUAGE_COLORS } from "@/types";
import {
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
  ChevronUp,
  ChevronDown,
  Code2,
} from "lucide-react";

interface SnippetTableProps {
  snippets: Snippet[];
}

type SortField = "title" | "language" | "category" | "createdAt";
type SortDir = "asc" | "desc";

export function SnippetTable({ snippets }: SnippetTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...snippets].sort((a, b) => {
    let aVal = String(a[sortField]);
    let bVal = String(b[sortField]);
    if (sortDir === "desc") [aVal, bVal] = [bVal, aVal];
    return aVal.localeCompare(bVal);
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteSnippet(id);
      if (result.error) {
        console.error(result.error);
      }
      setDeletingId(null);
      setConfirmDeleteId(null);
      router.refresh();
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return (
        <ChevronUp className="w-3 h-3 text-zinc-700 group-hover:text-zinc-500" />
      );
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-cyan-400" />
    ) : (
      <ChevronDown className="w-3 h-3 text-cyan-400" />
    );
  };

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-zinc-800">
        <Code2 className="w-10 h-10 text-zinc-700 mb-4" />
        <p className="text-zinc-500 font-display font-medium">No snippets yet</p>
        <p className="text-sm text-zinc-700 mt-1">Create your first snippet above.</p>
      </div>
    );
  }

  return (
    <>
      {/* Edit Modal */}
      {editingSnippet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setEditingSnippet(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg text-zinc-100">
                Edit Snippet
              </h2>
              <button
                onClick={() => setEditingSnippet(null)}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SnippetForm
              snippet={editingSnippet}
              onClose={() => setEditingSnippet(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-zinc-100">
                  Delete Snippet
                </h3>
                <p className="text-sm text-zinc-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-400 text-white font-semibold text-sm transition-all disabled:opacity-50"
              >
                {isPending && deletingId === confirmDeleteId ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 px-4 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80">
                {(
                  [
                    ["title", "Title"],
                    ["language", "Language"],
                    ["category", "Category"],
                    ["createdAt", "Created"],
                  ] as [SortField, string][]
                ).map(([field, label]) => (
                  <th
                    key={field}
                    className="text-left px-4 py-3 text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort(field)}
                      className="group inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                    >
                      {label}
                      <SortIcon field={field} />
                    </button>
                  </th>
                ))}
                <th className="text-right px-4 py-3 text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sorted.map((snippet) => {
                const langColor =
                  LANGUAGE_COLORS[snippet.language] ||
                  "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";

                return (
                  <tr
                    key={snippet.id}
                    className="hover:bg-zinc-900/50 transition-colors group"
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors line-clamp-1">
                        {snippet.title}
                      </span>
                      {snippet.description && (
                        <p className="text-xs text-zinc-600 mt-0.5 line-clamp-1">
                          {snippet.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono border ${langColor}`}
                      >
                        {snippet.language}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-zinc-500 bg-zinc-800 border border-zinc-700/50 px-2 py-0.5 rounded-full">
                        {snippet.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-600 font-mono whitespace-nowrap">
                      {new Date(snippet.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingSnippet(snippet)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(snippet.id)}
                          disabled={deletingId === snippet.id}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === snippet.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
          <p className="text-xs text-zinc-600 font-mono">
            {snippets.length} snippet{snippets.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>
    </>
  );
}
