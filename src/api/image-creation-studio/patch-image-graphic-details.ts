import type { ImageGraphic } from "@/model";
import type { ApiResponse } from "@/api/types";
import { readGraphicsVault, writeGraphicsVault } from "./persisted-graphics";

const clampCanvas = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const rounded = Math.round(n);
  if (rounded < 64) return 64;
  if (rounded > 8192) return 8192;
  return rounded;
};

export type PatchImageGraphicDetailsBody = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
};

/**
 * Updates display title and canvas dimensions for one vault row (preview/export size).
 */
export const patchImageGraphicDetailsApi = async (
  userId: string,
  graphicId: string,
  body: PatchImageGraphicDetailsBody,
): Promise<ApiResponse<ImageGraphic>> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage is only available in the browser" };
    }
    const { graphics } = readGraphicsVault();
    const idx = graphics.findIndex((g) => g.id === graphicId && g.userId === userId);
    if (idx === -1) {
      return { success: false, error: "Graphic not found" };
    }
    const prev = graphics[idx];
    const updatedAt = new Date().toISOString();
    const next: ImageGraphic = {
      ...prev,
      title: body.title.trim() || "Untitled graphic",
      canvasWidthPx: clampCanvas(body.canvasWidthPx, prev.canvasWidthPx),
      canvasHeightPx: clampCanvas(body.canvasHeightPx, prev.canvasHeightPx),
      updatedAt,
    };
    const copy = [...graphics];
    copy[idx] = next;
    writeGraphicsVault(copy);
    return { success: true, data: next };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
