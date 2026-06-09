"use client";

import type { Job } from "@/model/job";
import { JobListRowResumeButton } from "./job-list-row-resume-button";
import { jobsTableActionStyles as s } from "./job-table-action-styles";

type Props = {
  job: Job;
};

/**
 * Jobs table resume column — icon button; click does not open the job row.
 */
export const JobListRowResumeColumn = ({ job }: Props) => {
  return (
    <td
      className={s.actionCell}
      onClick={(e) => e.stopPropagation()}
    >
      <JobListRowResumeButton job={job} />
    </td>
  );
};
