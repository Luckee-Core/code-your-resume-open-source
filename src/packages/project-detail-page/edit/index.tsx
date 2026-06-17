"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateProjectThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const EditProjectModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.currentProject);
  const [businessName, setBusinessName] = useState(project.businessName);
  const [description, setDescription] = useState(project.description);
  const [url, setUrl] = useState(project.url);

  useEffect(() => {
    if (open) {
      setBusinessName(project.businessName);
      setDescription(project.description);
      setUrl(project.url);
    }
  }, [open, project.businessName, project.description, project.url]);

  const onSave = async () => {
    if (!project.id) return;
    const status = await dispatch(
      updateProjectThunk({
        id: project.id,
        businessName,
        description,
        url,
      }),
    );
    if (status === 200) {
      toast.success("Saved");
      onClose();
    } else {
      toast.error("Save failed");
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Edit project">
      <div className={styles.panel}>
        <h2 className={styles.title}>Edit project</h2>
        <label className={styles.label}>
          Business name
          <input className={styles.input} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </label>
        <label className={styles.label}>
          Description
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>
        <label className={styles.label}>
          URL
          <input className={styles.input} value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.btnPrimary} onClick={() => void onSave()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`,
  panel: `w-full max-w-md space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg`,
  title: `text-lg font-semibold text-gray-900`,
  label: t.formLabel,
  input: t.formInput,
  textarea: t.formTextarea,
  actions: `flex justify-end gap-2 pt-2`,
  btnGhost: t.btnGhost,
  btnPrimary: t.btnPrimaryMd,
};
