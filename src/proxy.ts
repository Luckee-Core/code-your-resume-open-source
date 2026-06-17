import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Injects `X-CRM-API-Key` for CRM API routes when `CRM_API_SECRET` is set (server-only).
 * Route handlers also attach the secret; this covers any remaining rewrites.
 */
export function proxy(request: NextRequest) {
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
  matcher: [
    "/api/data/:path*",
    "/api/technical-skills",
    "/api/technical-skills/:path*",
    "/api/voice-style",
    "/api/voice-style/:path*",
    "/api/job-studio",
    "/api/job-studio/:path*",
  ],
};
