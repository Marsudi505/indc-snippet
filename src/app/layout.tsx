// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/ui/SessionProvider";

export const metadata: Metadata = {
  title: "INDC Snippets — Personal Code Library",
  description:
    "A curated personal library of Node.js, JavaScript, and bot scripts.",
  keywords: ["code snippets", "javascript", "nodejs", "typescript", "bots"],
  authors: [{ name: "INDC" }],
  openGraph: {
    title: "INDC Snippets",
    description: "Personal code snippet library",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-950 font-sans text-zinc-100 antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
