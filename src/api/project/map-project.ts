import type { Project } from "@/model/project";

type ApiRow = {
  id: string;
  businessName: string;
  description: string;
  url: string;
  duration: string;
  technologies: string[];
  websiteResearchSummary: string;
  websiteResearchCompletedAt: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Map Express project payload to frontend model (already camelCase from Express).
 */
export const mapProject = (row: ApiRow): Project => ({
  id: row.id,
  businessName: row.businessName,
  description: row.description ?? "",
  url: row.url ?? "",
  duration: row.duration ?? "",
  technologies: Array.isArray(row.technologies) ? row.technologies : [],
  websiteResearchSummary: row.websiteResearchSummary ?? "",
  websiteResearchCompletedAt: row.websiteResearchCompletedAt ?? "",
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
