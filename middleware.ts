import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_token");
    if (!authCookie) {
      // TEMP for dev: allow admin without cookie
      // return NextResponse.redirect(new URL("/", request.url));
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
