"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { JobsTable } from "./table";

export { JobsTable } from "./table";

/**
 * Jobs list — sortable table aligned with the companies list chrome.
 */
export const JobsList = () => {
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
      <JobsTable />
    </div>
  );
};

const styles = {
  pageContainer: `w-full p-2`,
  muted: `mb-2 text-sm text-gray-500`,
  err: `mb-2 text-sm text-red-600`,
};
