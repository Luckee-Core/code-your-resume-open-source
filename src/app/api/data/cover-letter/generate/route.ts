import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import { resolveCrmExpressBaseUrl } from "@/config/resolve-crm-express-base-url";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cursor cover letter generation can take several minutes. The catch-all CRM proxy uses a
 * shorter upstream timeout; this route proxies with an extended serverless limit where supported.
 */
export const maxDuration = 300;

/**
 * POST — forwards JSON body to Express `/api/data/cover-letter/generate`.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, error: "CRM_EXPRESS_INTERNAL_URL is not configured" },
      { status: 500 },
    );
  }

  const bodyText = await req.text();
  const upstream = await fetch(`${base}/api/data/cover-letter/generate`, {
    method: "POST",
    headers: getCrmUpstreamHeaders({ "Content-Type": "application/json" }),
    body: bodyText,
  });

  const outText = await upstream.text();
  const contentType = upstream.headers.get("content-type") ?? "application/json";

  return new NextResponse(outText, {
    status: upstream.status,
    headers: { "Content-Type": contentType },
  });
}
