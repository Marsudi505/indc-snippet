// src/lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SnippetInput } from "@/types";

// ─── AUTH GUARD ───────────────────────────────────────────────────────────────
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session;
}

// ─── PUBLIC: READ ─────────────────────────────────────────────────────────────
export async function getAllSnippets() {
  try {
    const snippets = await prisma.snippet.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { data: snippets, error: null };
  } catch (error) {
    console.error("[getAllSnippets]", error);
    return { data: null, error: "Failed to fetch snippets." };
  }
}

export async function getSnippetById(id: string) {
  try {
    const snippet = await prisma.snippet.findUnique({ where: { id } });
    if (!snippet) return { data: null, error: "Snippet not found." };
    return { data: snippet, error: null };
  } catch (error) {
    console.error("[getSnippetById]", error);
    return { data: null, error: "Failed to fetch snippet." };
  }
}

// ─── ADMIN: CREATE ────────────────────────────────────────────────────────────
export async function createSnippet(input: SnippetInput) {
  await requireAdmin();

  const { title, description, code, language, category } = input;

  if (!title?.trim()) return { data: null, error: "Title is required." };
  if (!code?.trim()) return { data: null, error: "Code is required." };
  if (!language?.trim()) return { data: null, error: "Language is required." };
  if (!category?.trim()) return { data: null, error: "Category is required." };

  try {
    const snippet = await prisma.snippet.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        code: code.trim(),
        language: language.toLowerCase().trim(),
        category: category.trim(),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { data: snippet, error: null };
  } catch (error) {
    console.error("[createSnippet]", error);
    return { data: null, error: "Failed to create snippet." };
  }
}

// ─── ADMIN: UPDATE ────────────────────────────────────────────────────────────
export async function updateSnippet(id: string, input: Partial<SnippetInput>) {
  await requireAdmin();

  if (!id) return { data: null, error: "Snippet ID is required." };

  try {
    const existing = await prisma.snippet.findUnique({ where: { id } });
    if (!existing) return { data: null, error: "Snippet not found." };

    const updated = await prisma.snippet.update({
      where: { id },
      data: {
        ...(input.title && { title: input.title.trim() }),
        ...(input.description !== undefined && {
          description: input.description?.trim() || null,
        }),
        ...(input.code && { code: input.code.trim() }),
        ...(input.language && { language: input.language.toLowerCase().trim() }),
        ...(input.category && { category: input.category.trim() }),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { data: updated, error: null };
  } catch (error) {
    console.error("[updateSnippet]", error);
    return { data: null, error: "Failed to update snippet." };
  }
}

// ─── ADMIN: DELETE ────────────────────────────────────────────────────────────
export async function deleteSnippet(id: string) {
  await requireAdmin();

  if (!id) return { success: false, error: "Snippet ID is required." };

  try {
    await prisma.snippet.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, error: null };
  } catch (error) {
    console.error("[deleteSnippet]", error);
    return { success: false, error: "Failed to delete snippet." };
  }
}
