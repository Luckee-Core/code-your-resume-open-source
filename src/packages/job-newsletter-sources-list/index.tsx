"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createJobNewsletterSourceThunk,
  loadJobNewsletterSourcesThunk,
  updateJobNewsletterSourceThunk,
} from "@/store/thunks";
import { SourceModal, type SourceModalValues } from "./source-modal";
import { JobNewsletterSourcesToolbar } from "./toolbar";
import { JobNewsletterSourcesTable } from "./table";

type ModalState =
  | { kind: "closed" }
  | { kind: "create" }
  | { kind: "edit"; sourceId: string };

/**
 * Job newsletter ingest sources — list chrome aligned with Companies / Jobs.
 */
export const JobNewsletterSourcesList = () => {
  const dispatch = useAppDispatch();
  const sourcesMap = useAppSelector((s) => s.jobNewsletterSources);
  const [searchFilter, setSearchFilter] = useState("");
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setLoadError(null);
      const status = await dispatch(loadJobNewsletterSourcesThunk());
      if (status !== 200) {
        setLoadError("Could not load newsletter sources");
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const allSourceIds = useMemo(
    () =>
      Object.values(sourcesMap)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((row) => row.id),
    [sourcesMap],
  );

  const filteredSourceIds = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    if (!q) return allSourceIds;
    return allSourceIds.filter((id) => {
      const row = sourcesMap[id];
      if (!row) return false;
      return (
        row.name.toLowerCase().includes(q) || row.senderEmail.toLowerCase().includes(q)
      );
    });
  }, [allSourceIds, searchFilter, sourcesMap]);

  const handleCreate = useCallback(
    async (values: SourceModalValues) => {
      setBusy(true);
      const status = await dispatch(createJobNewsletterSourceThunk(values));
      setBusy(false);
      if (status === 200) {
        toast.success("Newsletter source created");
        setModal({ kind: "closed" });
      } else {
        toast.error("Could not create newsletter source");
      }
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    async (sourceId: string, values: SourceModalValues) => {
      setBusy(true);
      const status = await dispatch(
        updateJobNewsletterSourceThunk({
          id: sourceId,
          ...values,
        }),
      );
      setBusy(false);
      if (status === 200) {
        toast.success("Newsletter source saved");
        setModal({ kind: "closed" });
      } else {
        toast.error("Save failed");
      }
    },
    [dispatch],
  );

  const editingSource =
    modal.kind === "edit" ? sourcesMap[modal.sourceId] : undefined;

  return (
    <div className={styles.pageContainer}>
      {loading ? <p className={styles.muted}>Loading…</p> : null}
      {loadError ? <p className={styles.err}>{loadError}</p> : null}

      {!loading ? (
        <>
          <JobNewsletterSourcesToolbar
            searchFilter={searchFilter}
            onSearchChange={setSearchFilter}
            onCreateClick={() => setModal({ kind: "create" })}
          />

          {searchFilter.trim() && filteredSourceIds.length === 0 && allSourceIds.length > 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>No sources match your search</p>
              <p className={styles.emptyDescription}>
                Try adjusting your search or clear it to see all sources.
              </p>
            </div>
          ) : (
            <JobNewsletterSourcesTable
              sourceIds={filteredSourceIds}
              onEdit={(sourceId) => setModal({ kind: "edit", sourceId })}
            />
          )}
        </>
      ) : null}

      {modal.kind === "create" ? (
        <SourceModal
          mode="create"
          busy={busy}
          onClose={() => setModal({ kind: "closed" })}
          onSubmit={(values) => void handleCreate(values)}
        />
      ) : null}

      {modal.kind === "edit" && editingSource ? (
        <SourceModal
          mode="edit"
          initial={editingSource}
          busy={busy}
          onClose={() => setModal({ kind: "closed" })}
          onSubmit={(values) => void handleUpdate(modal.sourceId, values)}
        />
      ) : null}
    </div>
  );
};

const styles = {
  pageContainer: `w-full p-2`,
  muted: `mb-2 text-sm text-gray-500`,
  err: `mb-2 text-sm text-red-600`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
};
