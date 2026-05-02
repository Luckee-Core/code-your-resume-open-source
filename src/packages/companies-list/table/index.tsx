"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COMPANY_DETAIL_PAGE_PATH } from "@/config/routes";
import type { Company } from "@/model/company";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentCompanyActions } from "@/store/current/currentCompany";

type SortColumn = "name" | "website" | "createdAt" | "updatedAt";
type SortDirection = "asc" | "desc";

const getTime = (date: string | undefined): number => (date ? new Date(date).getTime() : 0);

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

export const CompaniesTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const companiesRecord = useAppSelector((s) => s.companies);
  const searchFilter = useAppSelector((s) => s.companiesListBuilder.searchFilter);

  const [sortColumn, setSortColumn] = useState<SortColumn>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const companiesList = useMemo(() => Object.values(companiesRecord), [companiesRecord]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortDirection(column === "createdAt" || column === "updatedAt" ? "desc" : "asc");
      setSortColumn(column);
    }
  };

  const filteredCompanies = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    if (!q) return companiesList;
    return companiesList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.website && c.website.toLowerCase().includes(q)) ||
        (c.notes && c.notes.toLowerCase().includes(q)),
    );
  }, [companiesList, searchFilter]);

  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
      let comparison = 0;
      if (sortColumn === "name") {
        comparison = (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
      } else if (sortColumn === "website") {
        comparison = (a.website || "").toLowerCase().localeCompare((b.website || "").toLowerCase());
      } else if (sortColumn === "createdAt") {
        comparison = getTime(a.createdAt) - getTime(b.createdAt);
      } else {
        comparison = getTime(a.updatedAt) - getTime(b.updatedAt);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredCompanies, sortColumn, sortDirection]);

  const totalCount = companiesList.length;

  const handleRowClick = (company: Company) => {
    dispatch(CurrentCompanyActions.setCurrentCompany(company));
    router.push(COMPANY_DETAIL_PAGE_PATH);
  };

  if (totalCount === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No companies yet</p>
        <p className={styles.emptyDescription}>
          Create a company to track employers, sites, and job postings. Data saves under `.data/crm/` on the server.
        </p>
      </div>
    );
  }

  if (sortedCompanies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No companies match your search</p>
        <p className={styles.emptyDescription}>Try adjusting your search or clear it to see all companies.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.sortableHeader} onClick={() => handleSort("name")}>
              <span>Name</span>
              <span className={styles.sortIcon}>
                {sortColumn === "name" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort("website")}>
              <span>Website</span>
              <span className={styles.sortIcon}>
                {sortColumn === "website" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort("createdAt")}>
              <span>Created</span>
              <span className={styles.sortIcon}>
                {sortColumn === "createdAt" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort("updatedAt")}>
              <span>Updated</span>
              <span className={styles.sortIcon}>
                {sortColumn === "updatedAt" ? (sortDirection === "asc" ? " ↑" : " ↓") : " ↕"}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map((company, index) => (
            <tr key={company.id} className={styles.row} onClick={() => handleRowClick(company)}>
              <td className={styles.rowNumberCell}>{index + 1}</td>
              <td className={styles.cell}>
                <span className={styles.nameText}>{company.name}</span>
              </td>
              <td className={styles.cell}>
                <span className={styles.websiteMuted}>{company.website || "—"}</span>
              </td>
              <td className={styles.cell}>{formatDate(company.createdAt)}</td>
              <td className={styles.cell}>{formatDate(company.updatedAt)}</td>
            </tr>
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
  sortIcon: `ml-1 text-gray-400 text-[10px]`,
  row: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 cursor-pointer
  `,
  rowNumberCell: `px-2 py-2 text-xs text-gray-500 tabular-nums`,
  cell: `px-3 py-2 text-sm text-gray-700`,
  nameText: `font-medium text-gray-900`,
  websiteMuted: `text-gray-600`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
};
