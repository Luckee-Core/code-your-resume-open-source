import type { ImageGraphic } from "@/model";
import { filterImageGraphicsByJobId } from "./filter-image-graphics-by-job-id";

export type JobGraphicKind = "resume" | "coverLetter" | "companyInterest" | "teamConversation";

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

const matchesTeamConversationGraphic = (graphic: ImageGraphic): boolean => {
  if (graphic.metadata?.teamConversationSource === "cursor") {
    return true;
  }
  return graphic.title.trim().startsWith("Team conversation —");
};

const matchers: Record<JobGraphicKind, (graphic: ImageGraphic) => boolean> = {
  resume: matchesResumeGraphic,
  coverLetter: matchesCoverLetterGraphic,
  companyInterest: matchesCompanyInterestGraphic,
  teamConversation: matchesTeamConversationGraphic,
};

/**
 * Classifies a graphic as resume, cover letter, company interest, or team conversation when it matches a known job graphic pattern.
 */
export const resolveJobGraphicKind = (graphic: ImageGraphic): JobGraphicKind | null => {
  if (matchesResumeGraphic(graphic)) {
    return "resume";
  }
  if (matchesCoverLetterGraphic(graphic)) {
    return "coverLetter";
  }
  if (matchesCompanyInterestGraphic(graphic)) {
    return "companyInterest";
  }
  if (matchesTeamConversationGraphic(graphic)) {
    return "teamConversation";
  }
  return null;
};

/**
 * Returns job-scoped graphics for resume, cover letter, company interest, or team conversation, newest first.
 */
export const filterJobGraphicsByKind = (
  graphicsById: Record<string, ImageGraphic>,
  jobId: string,
  kind: JobGraphicKind,
): ImageGraphic[] => {
  return filterImageGraphicsByJobId(graphicsById, jobId).filter(matchers[kind]);
};
