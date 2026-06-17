export type Project = {
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

export type ProjectNote = {
  id: string;
  projectId: string;
  body: string;
  createdAt: string;
};
