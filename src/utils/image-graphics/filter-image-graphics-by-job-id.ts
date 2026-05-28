import type { ImageGraphic } from "@/model";

/**
 * Returns graphics linked to the given job id, newest first.
 */
export const filterImageGraphicsByJobId = (
  graphicsById: Record<string, ImageGraphic>,
  jobId: string,
): ImageGraphic[] => {
  const trimmed = jobId.trim();
  if (!trimmed) return [];

  return Object.values(graphicsById)
    .filter((g) => g.jobId.trim() === trimmed)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
};
