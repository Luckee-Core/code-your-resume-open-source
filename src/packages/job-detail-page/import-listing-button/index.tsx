"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { importJobListingThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const ImportJobListingButton = () => {
  const dispatch = useAppDispatch();
  const job = useAppSelector((s) => s.currentJob);
  const [busy, setBusy] = useState(false);
  const disabled = !job.id || !job.url.trim() || busy;

  const onClick = async () => {
    if (!job.id) return;
    setBusy(true);
    const status = await dispatch(importJobListingThunk(job.id));
    setBusy(false);
    if (status === 200) {
      toast.success("Listing imported");
      return;
    }
    if (status === 500) {
      toast.error("Server error while importing");
      return;
    }
    toast.error("Could not import listing. Check the posting URL (many job boards are JS-only).");
  };

  return (
    <button type="button" className={styles.btn} disabled={disabled} onClick={() => void onClick()}>
      {busy ? "Importing…" : "Import listing"}
    </button>
  );
};

const styles = {
  btn: t.btnPrimarySm,
};
