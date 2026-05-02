"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Company } from "@/model/company";
import { useAppDispatch, useAppSelector } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { updateCompanyThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const EditCompanyModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.crmBuilder.isCompanyEditModalOpen);
  const company = useAppSelector((s) => s.currentCompany);
  const [name, setName] = useState(company.name);
  const [website, setWebsite] = useState(company.website);
  const [notes, setNotes] = useState(company.notes);

  useEffect(() => {
    if (open) {
      setName(company.name);
      setWebsite(company.website);
      setNotes(company.notes);
    }
  }, [open, company.name, company.website, company.notes]);

  const onClose = () => {
    dispatch(CrmBuilderActions.setCompanyEditModalOpen(false));
  };

  const onSave = async (next: Pick<Company, "name" | "website" | "notes">) => {
    if (!company.id) return;
    const status = await dispatch(
      updateCompanyThunk({ id: company.id, name: next.name, website: next.website, notes: next.notes }),
    );
    if (status === 200) {
      toast.success("Saved");
      dispatch(CrmBuilderActions.setCompanyEditModalOpen(false));
    } else {
      toast.error("Save failed");
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Edit company">
      <div className={styles.panel}>
        <h2 className={styles.title}>Edit company</h2>
        <label className={styles.label}>
          Name
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.label}>
          Website
          <input className={styles.input} value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
        <label className={styles.label}>
          Notes
          <textarea className={styles.textarea} value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
        </label>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.btnPrimary} onClick={() => void onSave({ name, website, notes })}>
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
  btnGhost: `rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100`,
  btnPrimary: t.btnPrimaryMd,
};
