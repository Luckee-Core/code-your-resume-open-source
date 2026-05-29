import { resolveCrmExpressBaseUrl } from "@/config/resolve-crm-express-base-url";
import { NextResponse } from "next/server";

/**
 * GET /api/health/express — checks Next → Express connectivity (for Vercel debugging).
 */
export async function GET(): Promise<NextResponse> {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return NextResponse.json({
      success: false,
      error: "EXPRESS_API_URL is not set (required in production on Vercel).",
    });
  }

  try {
    const res = await fetch(`${base}/api/health`, { cache: "no-store" });
    const text = await res.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = text.slice(0, 300);
    }
    return NextResponse.json({
      success: res.ok,
      expressBaseUrl: base,
      httpStatus: res.status,
      body,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      success: false,
      expressBaseUrl: base,
      error: msg,
    });
  }
}
