import { getCrmUpstreamHeaders } from "@/config/crm-upstream-headers";
import {
  CRM_EXPRESS_NOT_CONFIGURED_MESSAGE,
  resolveCrmExpressBaseUrl,
} from "@/config/resolve-crm-express-base-url";
import { NextRequest, NextResponse } from "next/server";

const jsonError = (error: string, status: number): NextResponse =>
  NextResponse.json({ success: false, error }, { status });

const isApiResponseShape = (value: unknown): boolean =>
  typeof value === "object" && value !== null && "success" in value;

/**
 * Forwards a Next `/api/*` request to the CRM Express server with optional `X-CRM-API-Key`.
 * Always returns JSON `{ success, ... }` so the browser parser never sees HTML or platform errors.
 */
export const proxyToCrmExpress = async (
  req: NextRequest,
  apiPrefix: string,
  pathSegments: string[],
): Promise<NextResponse> => {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return jsonError(CRM_EXPRESS_NOT_CONFIGURED_MESSAGE, 503);
  }

  if (base.includes("supabase.co")) {
    return jsonError(
      "EXPRESS_API_URL must be your Railway Express host, not a Supabase URL. Supabase keys belong on Express only.",
      500,
    );
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

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, init);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ proxyToCrmExpress fetch failed:", upstreamUrl, msg);
    return jsonError(
      `Cannot reach Express at ${base}. Start Express locally (port 3053) or set EXPRESS_API_URL on Vercel to your Railway URL. (${msg})`,
      503,
    );
  }

  const outText = await upstream.text();
  const outContentType = upstream.headers.get("content-type") ?? "application/json";

  if (!outText.trim()) {
    return jsonError(`Express returned empty body (HTTP ${upstream.status}) for ${upstreamPath}`, 502);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(outText) as unknown;
  } catch {
    const preview = outText.trim().slice(0, 200).replace(/\s+/g, " ");
    console.error("❌ proxyToCrmExpress non-JSON:", upstream.status, upstreamUrl, preview);
    return jsonError(
      `Express returned non-JSON (HTTP ${upstream.status}). Check EXPRESS_API_URL. Preview: ${preview}`,
      502,
    );
  }

  if (!isApiResponseShape(parsed)) {
    const preview = outText.trim().slice(0, 200).replace(/\s+/g, " ");
    console.error("❌ proxyToCrmExpress bad shape:", upstream.status, upstreamUrl, preview);
    return jsonError(
      `Express returned unexpected JSON (HTTP ${upstream.status}). URL: ${upstreamUrl}. Preview: ${preview}`,
      502,
    );
  }

  return new NextResponse(outText, {
    status: upstream.status,
    headers: { "Content-Type": outContentType },
  });
};
