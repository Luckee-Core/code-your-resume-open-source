"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/store";
import { JobListRow } from "./job-list-row";

type SortColumn = "title" | "company" | "status" | "updatedAt";
type SortDirection = "asc" | "desc";

const getTime = (date: string | undefined): number => (date ? new Date(date).getTime() : 0);

export const JobsTable = () => {
  const jobsRecord = useAppSelector((s) => s.jobs);
  const companiesRecord = useAppSelector((s) => s.companies);
  const [sortColumn, setSortColumn] = useState<SortColumn>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const jobsList = useMemo(() => Object.values(jobsRecord), [jobsRecord]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortDirection(column === "updatedAt" ? "desc" : "asc");
      setSortColumn(column);
    }
  };

  const sortedJobs = useMemo(() => {
    return [...jobsList].sort((a, b) => {
      let comparison = 0;
      if (sortColumn === "title") {
        comparison = (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase());
      } else if (sortColumn === "company") {
        const aCompany = companiesRecord[a.companyId]?.name?.trim() || "";
        const bCompany = companiesRecord[b.companyId]?.name?.trim() || "";
        comparison = aCompany.toLowerCase().localeCompare(bCompany.toLowerCase());
      } else if (sortColumn === "status") {
        comparison = (a.status || "").localeCompare(b.status || "");
      } else {
        comparison = getTime(a.updatedAt) - getTime(b.updatedAt);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [jobsList, sortColumn, sortDirection, companiesRecord]);

  if (jobsList.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No jobs yet</p>
        <p className={styles.emptyDescription}>
          Add jobs from a company detail page to track postings and applications.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.sortableHeader} onClick={() => handleSort("title")}>
              <span>Title</span>
              <span className={styles.sortIcon}>
                {sortColumn === "title" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort("company")}>
              <span>Company</span>
              <span className={styles.sortIcon}>
                {sortColumn === "company" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort("status")}>
              <span>Status</span>
              <span className={styles.sortIcon}>
                {sortColumn === "status" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.graphicsHeader}>Graphics</th>
            <th className={styles.headerCell}>Posting</th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job, index) => (
            <JobListRow key={job.id} job={job} rowNumber={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: `
    bg-white rounded border border-gray-300 overflow-x-auto overflow-y-visible
  `,
  table: `w-full border-collapse text-sm relative`,
  rowNumberHeader: `
    px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 w-8
  `,
  sortableHeader: `
    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors select-none
  `,
  graphicsHeader: `
    px-3 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 w-20
  `,
  headerCell: `
    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300
  `,
  sortIcon: `ml-1 text-gray-400 text-[10px]`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
};
