// src/components/admin/SnippetForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSnippet, updateSnippet } from "@/lib/actions";
import { Snippet, LANGUAGES, CATEGORIES } from "@/types";
import {
  Save,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Code2,
} from "lucide-react";

interface SnippetFormProps {
  snippet?: Snippet;
  onClose?: () => void;
  onSuccess?: () => void;
}

const emptyForm = {
  title: "",
  description: "",
  code: "",
  language: "javascript",
  category: "Utilities",
};

export function SnippetForm({ snippet, onClose, onSuccess }: SnippetFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: snippet?.title ?? emptyForm.title,
    description: snippet?.description ?? emptyForm.description,
    code: snippet?.code ?? emptyForm.code,
    language: snippet?.language ?? emptyForm.language,
    category: snippet?.category ?? emptyForm.category,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = snippet
        ? await updateSnippet(snippet.id, form)
        : await createSnippet(form);

      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
        if (onSuccess) onSuccess();
        if (onClose) onClose();
        if (!snippet) {
          setForm(emptyForm);
        }
      }, 1200);
    });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm placeholder-zinc-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all";
  const labelClass =
    "block text-xs font-medium text-zinc-400 font-mono mb-2 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          placeholder="e.g. Debounce Function"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description of what this snippet does..."
          rows={2}
          className={`${inputClass} resize-none font-sans`}
        />
      </div>

      {/* Language + Category row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Language *</label>
          <select
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            required
            className={`${inputClass} cursor-pointer`}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className={`${inputClass} cursor-pointer`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Code */}
      <div>
        <label className={labelClass}>
          <Code2 className="inline w-3.5 h-3.5 mr-1.5 text-cyan-500" />
          Code *
        </label>
        <div className="relative">
          <textarea
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
            placeholder="// Paste your code here..."
            rows={14}
            spellCheck={false}
            className={`${inputClass} leading-relaxed text-xs`}
            style={{ tabSize: 2 }}
          />
          <span className="absolute bottom-3 right-3 text-[10px] text-zinc-700 font-mono">
            {form.code.split("\n").length} lines
          </span>
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <p className="text-sm text-green-300">
            Snippet {snippet ? "updated" : "created"} successfully!
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending || success}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-sm font-display transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {snippet ? "Update Snippet" : "Create Snippet"}
            </>
          )}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-sm font-medium transition-all duration-200 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
