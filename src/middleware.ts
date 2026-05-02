import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Injects `X-CRM-API-Key` for rewrites to Express when `CRM_API_SECRET` is set (server-only).
 * Does not replace user authentication; it gates direct access to Express when bound beyond localhost.
 */
export function middleware(request: NextRequest) {
  const secret = process.env.CRM_API_SECRET?.trim();
  if (!secret) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-CRM-API-Key", secret);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/api/data/:path*", "/api/technical-skills", "/api/technical-skills/:path*"],
};
