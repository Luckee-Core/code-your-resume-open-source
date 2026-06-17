"use client";

import { useState } from "react";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type Props = {
  busy: boolean;
  onClose: () => void;
  onSubmit: (businessName: string) => void;
};

export const CreateProjectModal = ({ busy, onClose, onSubmit }: Props) => {
  const [businessName, setBusinessName] = useState("");

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Create project">
      <div className={styles.panel}>
        <h2 className={styles.title}>Add project</h2>
        <label className={styles.label}>
          Business name
          <input
            className={styles.input}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Acme Labs, Client Co., etc."
          />
        </label>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            disabled={busy || !businessName.trim()}
            onClick={() => onSubmit(businessName.trim())}
          >
            {busy ? "Creating…" : "Create"}
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
  actions: `flex justify-end gap-2 pt-2`,
  btnGhost: t.btnGhost,
  btnPrimary: t.btnPrimaryMd,
};
