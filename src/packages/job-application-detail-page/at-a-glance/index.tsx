"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateJobApplicationThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const AtAGlanceSection = () => {
  const dispatch = useAppDispatch();
  const app = useAppSelector((s) => s.currentJobApplication);
  const [notes, setNotes] = useState(app.notes);

  useEffect(() => {
    setNotes(app.notes);
  }, [app.id, app.notes]);

  const onSaveNotes = async () => {
    if (!app.id) return;
    const status = await dispatch(updateJobApplicationThunk({ id: app.id, notes }));
    if (status === 200) {
      toast.success("Notes saved");
    } else {
      toast.error("Save failed");
    }
  };

  return (
    <section className={styles.card} aria-labelledby="crm-job-app-notes-heading">
      <h2 id="crm-job-app-notes-heading" className={styles.cardTitle}>
        Notes
      </h2>
      <textarea className={styles.textarea} rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="button" className={styles.btn} onClick={() => void onSaveNotes()}>
        Save notes
      </button>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardTitle: t.researchCardTitle,
  textarea: `${t.formTextarea} w-full`,
  btn: t.btnPrimaryMd,
};
