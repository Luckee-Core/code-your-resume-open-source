import type { Company } from "@/model/company";
import type { Employment } from "@/model/employment";
import type { Job } from "@/model/job";

export type EmploymentJobBulletGroup = {
  employmentId: string;
  companyName: string;
  jobTitle: string;
  responsibilities: string[];
  requirements: string[];
  niceToHaves: string[];
};

/**
 * Joins employments with company and job dumps into display groups for the job bullets panel.
 *
 * @param employmentsById - Normalized employments dump
 * @param jobsById - Normalized jobs dump
 * @param companiesById - Normalized companies dump
 * @returns Groups with bullet arrays; skips rows missing job or company
 */
export const buildEmploymentJobBulletGroups = (
  employmentsById: Record<string, Employment>,
  jobsById: Record<string, Job>,
  companiesById: Record<string, Company>,
): EmploymentJobBulletGroup[] => {
  return Object.values(employmentsById)
    .map((emp) => {
      const job = jobsById[emp.jobId];
      const company = companiesById[emp.companyId];
      if (!job || !company) return null;
      return {
        employmentId: emp.id,
        companyName: company.name,
        jobTitle: job.title,
        responsibilities: job.responsibilities ?? [],
        requirements: job.requirements ?? [],
        niceToHaves: job.niceToHaves ?? [],
      };
    })
    .filter((g): g is EmploymentJobBulletGroup => g !== null);
};
