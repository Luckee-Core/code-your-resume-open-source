import type { ApiResponse } from "@/api/types";

const isApiResponseShape = (value: unknown): value is ApiResponse<unknown> => {
  return typeof value === "object" && value !== null && "success" in value;
};

const describeNonJsonBody = (status: number, contentType: string | null, body: string): string => {
  const preview = body.trim().slice(0, 240).replace(/\s+/g, " ");
  const typeHint = contentType ? ` (${contentType})` : "";
  if (preview.startsWith("<!") || preview.includes("<html")) {
    return `HTTP ${status}${typeHint}: got HTML, not JSON. Is EXPRESS_API_URL your Railway Express URL (not Vercel/Supabase)? Preview: ${preview}`;
  }
  return `HTTP ${status}${typeHint}: not JSON. Preview: ${preview || "(empty body)"}`;
};

/**
 * Parses JSON from a `fetch` response into `ApiResponse<T>`.
 */
export const parseApiJson = async <T>(
  res: Response,
  requestUrl?: string,
): Promise<ApiResponse<T>> => {
  const urlLabel = requestUrl ? ` for ${requestUrl}` : "";

  let bodyText = "";
  try {
    bodyText = await res.text();
  } catch {
    return { success: false, error: `No response body${urlLabel} (HTTP ${res.status})` };
  }

  if (!bodyText.trim()) {
    return {
      success: false,
      error: `Empty response${urlLabel} (HTTP ${res.status}). Is Express running and EXPRESS_API_URL correct?`,
    };
  }

  let json: unknown;
  try {
    json = JSON.parse(bodyText) as unknown;
  } catch {
    return {
      success: false,
      error: describeNonJsonBody(res.status, res.headers.get("content-type"), bodyText) + urlLabel,
    };
  }

  if (!isApiResponseShape(json)) {
    const preview = bodyText.trim().slice(0, 240).replace(/\s+/g, " ");
    return {
      success: false,
      error:
        `Invalid API shape${urlLabel} (HTTP ${res.status}): expected { success, data?|error? }. ` +
        `Check EXPRESS_API_URL on Vercel points to Railway Express (/api/health should work). ` +
        `Body: ${preview}`,
    };
  }

  return json as ApiResponse<T>;
};
