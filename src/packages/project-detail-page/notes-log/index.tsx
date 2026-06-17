"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { ProjectNote } from "@/model/project";
import { useAppDispatch, useAppSelector } from "@/store";
import { createProjectNoteThunk, deleteProjectNoteThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { formatDateMedium } from "@/utils/date-time";

type Props = {
  notes: ProjectNote[];
  onNoteAdded: () => Promise<void>;
};

export const NotesLogSection = ({ notes, onNoteAdded }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.currentProject);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const onAdd = async () => {
    const trimmed = body.trim();
    if (!trimmed || !project.id) return;
    setBusy(true);
    const status = await dispatch(createProjectNoteThunk({ projectId: project.id, body: trimmed }));
    if (status === 200) {
      setBody("");
      await onNoteAdded();
      toast.success("Note added");
    } else {
      toast.error("Could not add note");
    }
    setBusy(false);
  };

  const onDelete = async (noteId: string) => {
    if (!window.confirm("Delete this note?")) return;
    setBusy(true);
    const status = await dispatch(deleteProjectNoteThunk(noteId));
    setBusy(false);
    if (status === 200) {
      toast.success("Note deleted");
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <section className={styles.section} aria-labelledby="crm-project-notes-log-heading">
      <div className={styles.sectionHeader}>
        <h2 id="crm-project-notes-log-heading" className={styles.sectionTitle}>
          Notes log
        </h2>
      </div>
      <p className={styles.sectionHint}>
        Freeform entries — duration, user counts, focus areas, metrics, and anything else worth
        remembering.
      </p>

      <div className={styles.addBlock}>
        <textarea
          className={styles.textarea}
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="e.g. 6 months; ~500 active users; focus on onboarding and reporting."
        />
        <button
          type="button"
          className={styles.btnPrimary}
          disabled={busy || !body.trim()}
          onClick={() => void onAdd()}
        >
          Add note
        </button>
      </div>

      <ul className={styles.list}>
        {notes.length === 0 ? (
          <li className={styles.emptyBody}>No notes yet.</li>
        ) : (
          notes.map((note) => (
            <li key={note.id} className={styles.noteItem}>
              <div className={styles.noteMeta}>{formatDateMedium(note.createdAt)}</div>
              <p className={styles.noteBody}>{note.body}</p>
              <button
                type="button"
                className={styles.deleteBtn}
                disabled={busy}
                onClick={() => void onDelete(note.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

const styles = {
  section: t.sectionPanel,
  sectionHeader: t.sectionHeader,
  sectionTitle: t.sectionTitle,
  sectionHint: `text-sm text-gray-500`,
  addBlock: `space-y-2`,
  textarea: t.formTextarea,
  btnPrimary: t.btnPrimaryMd,
  list: `space-y-3`,
  noteItem: `rounded-lg border border-gray-200 bg-white p-3`,
  noteMeta: `text-xs text-gray-500 mb-1`,
  noteBody: `text-sm text-gray-800 whitespace-pre-wrap`,
  deleteBtn: `mt-2 text-xs text-red-600 hover:underline`,
  emptyBody: t.emptyHint,
};
