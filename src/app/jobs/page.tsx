"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { CurrentJobActions } from "@/store/current/currentJob";
import { JOB_DETAIL_PAGE_PATH } from "@/config/routes";

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const jobs = useAppSelector((s) => s.jobs);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  const rows = useMemo(() => Object.values(jobs), [jobs]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Jobs</h1>
      <p className={styles.muted}>Open a job from a company, or pick below.</p>
      <ul className={styles.list}>
        {rows.length === 0 ? (
          <li className={styles.muted}>No jobs yet.</li>
        ) : (
          rows.map((j) => (
            <li key={j.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => {
                  dispatch(CurrentJobActions.setCurrentJob(j));
                  router.push(JOB_DETAIL_PAGE_PATH);
                }}
              >
                <span className={styles.name}>{j.title}</span>
                <span className={styles.meta}>{j.status}</span>
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
