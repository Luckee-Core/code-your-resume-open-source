import type { ImageGraphic } from "@/model";
import { filterImageGraphicsByJobId } from "./filter-image-graphics-by-job-id";

export type JobGraphicKind = "resume" | "coverLetter" | "companyInterest";

const matchesResumeGraphic = (graphic: ImageGraphic): boolean => {
  if (graphic.metadata?.skillsComponentSource === "cursor") {
    return true;
  }
  return graphic.title.trim().startsWith("Skills —");
};

const matchesCoverLetterGraphic = (graphic: ImageGraphic): boolean => {
  if (graphic.metadata?.coverLetterSource === "cursor") {
    return true;
  }
  return graphic.title.trim().startsWith("Cover letter —");
};

const matchesCompanyInterestGraphic = (graphic: ImageGraphic): boolean => {
  if (graphic.metadata?.companyInterestSource === "cursor") {
    return true;
  }
  return graphic.title.trim().startsWith("Company interest —");
};

const matchers: Record<JobGraphicKind, (graphic: ImageGraphic) => boolean> = {
  resume: matchesResumeGraphic,
  coverLetter: matchesCoverLetterGraphic,
  companyInterest: matchesCompanyInterestGraphic,
};

/**
 * Returns job-scoped graphics for resume, cover letter, or company interest, newest first.
 */
export const filterJobGraphicsByKind = (
  graphicsById: Record<string, ImageGraphic>,
  jobId: string,
  kind: JobGraphicKind,
): ImageGraphic[] => {
  return filterImageGraphicsByJobId(graphicsById, jobId).filter(matchers[kind]);
};
