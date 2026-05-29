import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import { resolveCrmExpressBaseUrl } from "@/config/resolve-crm-express-base-url";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cursor skills generation can take several minutes. The catch-all CRM proxy uses a
 * shorter upstream timeout, which surfaces as 500/HTML to the browser. This route
 * proxies to Express with an extended serverless limit where supported.
 */
export const maxDuration = 300;

/**
 * POST — forwards JSON body to Express `/api/data/skills-component/generate`.
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
  const upstream = await fetch(`${base}/api/data/skills-component/generate`, {
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
