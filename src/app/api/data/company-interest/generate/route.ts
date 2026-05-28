import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cursor company-interest generation can take several minutes.
 */
export const maxDuration = 300;

const resolveExpressBaseUrl = (): string => {
  const fromEnv = process.env.CRM_EXPRESS_INTERNAL_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:3053";
  }
  return "";
};

/**
 * POST — forwards JSON body to Express `/api/data/company-interest/generate`.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = resolveExpressBaseUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, error: "CRM_EXPRESS_INTERNAL_URL is not configured" },
      { status: 500 },
    );
  }

  const bodyText = await req.text();
  const upstream = await fetch(`${base}/api/data/company-interest/generate`, {
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
