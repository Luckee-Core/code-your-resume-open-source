import type { Company } from "@/model/company";
import type { Job } from "@/model/job";

export type QuickApplyResult = {
  companyId: string;
  jobId: string;
  companyCreated: boolean;
  companyScrapeOk: boolean;
  jobScrapeOk: boolean;
  resumeQueued: boolean;
  resumeSkipReason?: string;
  warnings: string[];
  company?: Company;
  job?: Job;
};

export type RunQuickApplyInput = {
  companyWebsiteUrl: string;
  jobListingUrl: string;
};
