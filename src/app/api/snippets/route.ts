// src/app/api/snippets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("q");
    const category = searchParams.get("category");
    const language = searchParams.get("language");

    const snippets = await prisma.snippet.findMany({
      where: {
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { code: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(category && { category: { equals: category, mode: "insensitive" } }),
        ...(language && { language: { equals: language, mode: "insensitive" } }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: snippets, count: snippets.length });
  } catch (error) {
    console.error("[GET /api/snippets]", error);
    return NextResponse.json(
      { error: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
