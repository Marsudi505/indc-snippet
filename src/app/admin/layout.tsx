// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If no session and not the login page, redirect to login
  // The login page itself is outside the protected layout
  if (!session) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
