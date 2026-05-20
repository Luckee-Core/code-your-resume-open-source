import { JOBS_PATH } from "@/config/routes";
import type { Company } from "@/model/company";
import type { Job } from "@/model/job";
import type { BreadcrumbItem } from "@/model/breadcrumb";

type BuildJobDetailBreadcrumbTrailInput = {
  job: Job;
  companies: Record<string, Company>;
  jobs: Record<string, Job>;
  onSelectCompany: (companyId: string) => void;
  onSelectJob: (jobId: string) => void;
};

const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);

const sortJobsByTitle = (a: Job, b: Job) =>
  (a.title.trim() || "Untitled").localeCompare(b.title.trim() || "Untitled");

const jobMenuLabel = (row: Job): string => row.title.trim() || "Untitled job";

/**
 * Jobs → company dropdown → job dropdown (jobs scoped to the current job's company).
 */
export const buildJobDetailBreadcrumbTrail = (
  input: BuildJobDetailBreadcrumbTrailInput,
): BreadcrumbItem[] => {
  const { job, companies, jobs, onSelectCompany, onSelectJob } = input;
  const items: BreadcrumbItem[] = [{ label: "Jobs", href: JOBS_PATH }];

  if (!job.id) {
    return items;
  }

  const companyList = [...Object.values(companies)].sort(sortByName);
  const currentCompany = job.companyId ? companies[job.companyId] : undefined;
  const companyLabel = currentCompany?.name?.trim() || "…";

  items.push({
    label: companyLabel,
    isPendingSelection: !currentCompany,
    menuItems: companyList.map((row) => ({
      label: row.name.trim() || "Untitled company",
      isActive: row.id === job.companyId,
      onSelect: () => onSelectCompany(row.id),
    })),
  });

  const jobsForCompany = Object.values(jobs).filter((row) =>
    job.companyId ? row.companyId === job.companyId : true,
  );
  const jobList = [...jobsForCompany].sort(sortJobsByTitle);

  items.push({
    label: jobMenuLabel(job),
    menuItems:
      jobList.length === 0
        ? [{ label: "No jobs for this company", isDisabled: true, onSelect: () => {} }]
        : jobList.map((row) => ({
            label: jobMenuLabel(row),
            isActive: row.id === job.id,
            onSelect: () => onSelectJob(row.id),
          })),
  });

  return items;
};
