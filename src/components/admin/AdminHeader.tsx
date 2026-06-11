// src/components/admin/AdminHeader.tsx
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Terminal, LogOut, ExternalLink, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  userEmail: string;
}

export function AdminHeader({ userEmail }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-zinc-100">
                INDC Snippets
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-cyan-500" />
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Right: User info + actions */}
          <div className="flex items-center gap-3">
            {/* User email */}
            <span className="hidden sm:block text-xs text-zinc-600 font-mono">
              {userEmail}
            </span>

            {/* View public site */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Site</span>
            </Link>

            {/* Sign out */}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 border border-zinc-800 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
