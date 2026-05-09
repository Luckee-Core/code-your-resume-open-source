import type { ApiResponse } from "@/api/types";
import { readGraphicsVault, writeGraphicsVault } from "./persisted-graphics";

/**
 * Removes one graphic from the local vault when it exists and belongs to `userId`.
 */
export const deleteImageGraphicApi = async (
  userId: string,
  graphicId: string,
): Promise<ApiResponse<{ deleted: true }>> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage is only available in the browser" };
    }
    const { graphics } = readGraphicsVault();
    const target = graphics.find((g) => g.id === graphicId);
    if (!target) {
      return { success: false, error: "Graphic not found" };
    }
    if (target.userId !== userId) {
      return { success: false, error: "Forbidden" };
    }
    writeGraphicsVault(graphics.filter((g) => g.id !== graphicId));
    return { success: true, data: { deleted: true } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
