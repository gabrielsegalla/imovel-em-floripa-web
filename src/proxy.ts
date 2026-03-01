import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/admin");
}

function hasValidSessionToken(request: NextRequest): boolean {
  const token = request.cookies.get("admin_session")?.value;
  return Boolean(token);
}

export function proxy(request: NextRequest): NextResponse {
  if (isAdminRoute(request.nextUrl.pathname) && process.env.ENABLE_ADMIN_PROTECTION === "true") {
    if (!hasValidSessionToken(request)) {
      return NextResponse.redirect(new URL("/contact", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};