"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { CurrentJobApplicationActions } from "@/store/current/currentJobApplication";
import { JOB_APPLICATION_DETAIL_PAGE_PATH } from "@/config/routes";

export default function JobApplicationsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const apps = useAppSelector((s) => s.jobApplications);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  const rows = useMemo(() => Object.values(apps), [apps]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Job applications</h1>
      <p className={styles.muted}>Resume snapshots sent per job.</p>
      <ul className={styles.list}>
        {rows.length === 0 ? (
          <li className={styles.muted}>No applications yet.</li>
        ) : (
          rows.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => {
                  dispatch(CurrentJobApplicationActions.setCurrentJobApplication(a));
                  router.push(JOB_APPLICATION_DETAIL_PAGE_PATH);
                }}
              >
                <span className={styles.name}>{a.imageGraphicId}</span>
                <span className={styles.meta}>{new Date(a.submittedAt).toLocaleString()}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

const styles = {
  wrap: `mx-auto w-full max-w-3xl space-y-4 p-4`,
  h1: `text-xl font-semibold text-zinc-900`,
  muted: `text-sm text-zinc-500`,
  list: `divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white`,
  row: `flex w-full flex-col items-start gap-0.5 px-3 py-3 text-left hover:bg-zinc-50`,
  name: `text-sm font-medium text-zinc-900`,
  meta: `text-xs text-zinc-500`,
};
