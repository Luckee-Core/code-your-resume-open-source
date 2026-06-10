import type { ImageGraphic } from "@/model";
import { resolveJobGraphicKind } from "./filter-job-graphics-by-kind";

const sanitizePrintFilename = (raw: string): string =>
  raw.replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 60) || "layout";

/**
 * Default PDF filename when saving the studio preview via the browser print dialog.
 * Job resumes use `resume`; job cover letters use `cover_letter`.
 */
export const resolveImageGraphicPrintFilename = (graphic: ImageGraphic): string => {
  const kind = resolveJobGraphicKind(graphic);

  if (kind === "coverLetter") {
    return "cover_letter";
  }

  if (kind === "resume") {
    return "resume";
  }

  return sanitizePrintFilename(graphic.title || graphic.id || "layout");
};
