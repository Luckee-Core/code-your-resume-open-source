import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import { resolveCrmExpressBaseUrl } from "@/config/resolve-crm-express-base-url";
import { NextRequest, NextResponse } from "next/server";

const CRM_NOT_CONFIGURED =
  "CRM backend is not configured. Set CRM_EXPRESS_INTERNAL_URL on Vercel (and run the Express server on Railway).";

/**
 * Forwards a Next `/api/*` request to the CRM Express server with optional `X-CRM-API-Key`.
 */
export const proxyToCrmExpress = async (
  req: NextRequest,
  apiPrefix: string,
  pathSegments: string[],
): Promise<NextResponse> => {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return NextResponse.json({ success: false, error: CRM_NOT_CONFIGURED }, { status: 503 });
  }

  const path = pathSegments.filter(Boolean).join("/");
  const incoming = new URL(req.url);
  const upstreamPath = path ? `${apiPrefix}/${path}` : apiPrefix;
  const upstreamUrl = `${base}${upstreamPath}${incoming.search}`;

  const headers = getCrmUpstreamHeaders();
  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const upstream = await fetch(upstreamUrl, init);
  const outText = await upstream.text();
  const outContentType = upstream.headers.get("content-type") ?? "application/json";

  return new NextResponse(outText, {
    status: upstream.status,
    headers: { "Content-Type": outContentType },
  });
};
