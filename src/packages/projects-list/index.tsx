"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PROJECT_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { createProjectThunk, loadProjectsThunk } from "@/store/thunks";
import { ProjectsTable } from "./table";
import { CreateProjectModal } from "./create-modal";

/**
 * Portfolio projects list — experience section.
 */
export const ProjectsList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const projectsMap = useAppSelector((s) => s.projects);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setLoadError(null);
      const status = await dispatch(loadProjectsThunk());
      if (status !== 200) {
        setLoadError("Could not load projects");
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const projectIds = useMemo(
    () =>
      Object.values(projectsMap)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((row) => row.id),
    [projectsMap],
  );

  const handleCreate = useCallback(
    async (businessName: string) => {
      setBusy(true);
      const status = await dispatch(createProjectThunk({ businessName }));
      setBusy(false);
      if (status === 200) {
        toast.success("Project created");
        setCreateOpen(false);
        router.push(PROJECT_DETAIL_PAGE_PATH);
      } else {
        toast.error("Could not create project");
      }
    },
    [dispatch, router],
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            Portfolio work history — business context, tools, and notes for résumés and AI generation.
          </p>
        </div>
        <button type="button" className={styles.createBtn} onClick={() => setCreateOpen(true)}>
          Add project
        </button>
      </div>

      {loading ? <p className={styles.muted}>Loading…</p> : null}
      {loadError ? <p className={styles.err}>{loadError}</p> : null}

      {!loading ? <ProjectsTable projectIds={projectIds} /> : null}

      {createOpen ? (
        <CreateProjectModal
          busy={busy}
          onClose={() => setCreateOpen(false)}
          onSubmit={(businessName) => void handleCreate(businessName)}
        />
      ) : null}
    </div>
  );
};

const styles = {
  pageContainer: `w-full p-2 space-y-4`,
  toolbar: `flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-xl font-semibold text-gray-900`,
  subtitle: `mt-1 text-sm text-gray-600 max-w-2xl`,
  createBtn: `rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 shrink-0`,
  muted: `text-sm text-gray-500`,
  err: `text-sm text-red-600`,
};
