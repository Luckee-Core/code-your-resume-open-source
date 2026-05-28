import type { ImageGraphic } from "@/model";

/**
 * Returns graphics whose metadata includes the given job id, newest first.
 */
export const filterImageGraphicsByJobId = (
  graphicsById: Record<string, ImageGraphic>,
  jobId: string,
): ImageGraphic[] => {
  const trimmed = jobId.trim();
  if (!trimmed) return [];

  return Object.values(graphicsById)
    .filter((g) => {
      const metaJobId = g.metadata?.jobId;
      return typeof metaJobId === "string" && metaJobId.trim() === trimmed;
    })
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
};
