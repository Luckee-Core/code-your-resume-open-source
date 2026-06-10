import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import {
  CRM_EXPRESS_NOT_CONFIGURED_MESSAGE,
  resolveCrmExpressBaseUrl,
} from "@/config/resolve-crm-express-base-url";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cursor team-conversation generation can take several minutes.
 */
export const maxDuration = 300;

/**
 * POST — forwards JSON body to Express `/api/data/team-conversation/generate`.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, error: CRM_EXPRESS_NOT_CONFIGURED_MESSAGE },
      { status: 500 },
    );
  }

  const bodyText = await req.text();
  const upstream = await fetch(`${base}/api/data/team-conversation/generate`, {
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
