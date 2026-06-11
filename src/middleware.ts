// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is authenticated and tries to go to login, redirect to dashboard
    if (
      req.nextUrl.pathname === "/admin/login" &&
      req.nextauth.token
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only require auth for /admin/* routes (excluding /admin/login)
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true; // Always allow login page
        }
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token; // Require token for all other admin routes
        }
        return true; // Allow all other routes
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
