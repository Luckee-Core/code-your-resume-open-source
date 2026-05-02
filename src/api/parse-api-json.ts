import type { ApiResponse } from "@/api/types";

/**
 * Parses JSON from a `fetch` response into `ApiResponse<T>`.
 */
export const parseApiJson = async <T>(res: Response): Promise<ApiResponse<T>> => {
  try {
    const json = (await res.json()) as ApiResponse<T>;
    if (typeof json === "object" && json !== null && "success" in json) {
      return json;
    }
    return { success: false, error: "Invalid response shape" };
  } catch {
    return { success: false, error: "Failed to parse JSON" };
  }
};
