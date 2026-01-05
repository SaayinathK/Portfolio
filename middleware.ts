import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which paths require authentication
const protectedPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is under /admin
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Example: check for a session cookie named "auth"
  const isLoggedIn = request.cookies.get("auth")?.value === "true";

  if (isProtected && !isLoggedIn) {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
