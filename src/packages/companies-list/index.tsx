"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { CompaniesListFilters } from "./filters";
import { CompaniesTable } from "./table";

export { CompaniesTable } from "./table";
export { CompaniesListFilters } from "./filters";

/**
 * Companies list: toolbar + sortable table (chrome aligned with luckee-web Customers list).
 */
export const CompaniesList = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.crmBuilder.listLoadStatus);
  const listError = useAppSelector((s) => s.crmBuilder.listError);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      {loadStatus === "loading" ? <p className={styles.muted}>Loading…</p> : null}
      {listError ? <p className={styles.err}>{listError}</p> : null}
      <CompaniesListFilters />
      <CompaniesTable />
    </div>
  );
};

const styles = {
  pageContainer: `w-full p-2`,
  muted: `mb-2 text-sm text-gray-500`,
  err: `mb-2 text-sm text-red-600`,
};