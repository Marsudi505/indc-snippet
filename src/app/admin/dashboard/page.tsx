// src/app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAllSnippets } from "@/lib/actions";
import { SnippetForm } from "@/components/admin/SnippetForm";
import { SnippetTable } from "@/components/admin/SnippetTable";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Terminal, PlusCircle, BarChart3 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { data: snippets, error } = await getAllSnippets();

  const categories = snippets
    ? [...new Set(snippets.map((s) => s.category))]
    : [];
  const languages = snippets
    ? [...new Set(snippets.map((s) => s.language))]
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      <AdminHeader userEmail={session.user?.email ?? ""} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h1 className="font-display font-bold text-2xl text-zinc-100">
              Snippet Dashboard
            </h1>
          </div>
          <p className="text-sm text-zinc-500">
            Manage your code snippet library.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Snippets",
              value: snippets?.length ?? 0,
              icon: "📦",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: "🏷️",
            },
            {
              label: "Languages",
              value: languages.length,
              icon: "💻",
            },
            {
              label: "This Month",
              value:
                snippets?.filter((s) => {
                  const d = new Date(s.createdAt);
                  const now = new Date();
                  return (
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                  );
                }).length ?? 0,
              icon: "✨",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4"
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="font-display font-bold text-2xl text-zinc-100">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Create New Snippet */}
        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <h2 className="font-display font-semibold text-lg text-zinc-100">
              Create New Snippet
            </h2>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <SnippetForm />
          </div>
        </section>

        {/* Snippets Table */}
        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h2 className="font-display font-semibold text-lg text-zinc-100">
              All Snippets
            </h2>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 mb-5">
              <p className="text-sm text-red-400 font-mono">{error}</p>
            </div>
          )}

          {snippets && <SnippetTable snippets={snippets} />}
        </section>
      </main>
    </div>
  );
}
