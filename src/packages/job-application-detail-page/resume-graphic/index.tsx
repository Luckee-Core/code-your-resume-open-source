"use client";

import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { downloadImageGraphicPreviewPngThunk, openImageGraphicStudioByIdThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const JobApplicationResumeGraphicSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const app = useAppSelector((s) => s.currentJobApplication);

  const onOpenStudio = async () => {
    if (!app.imageGraphicId) return;
    const status = await dispatch(openImageGraphicStudioByIdThunk(app.imageGraphicId));
    if (status === 200) {
      router.push("/studio");
    } else {
      toast.error("Graphic not found in this browser vault — create or load graphics first.");
    }
  };

  const onDownloadPng = async () => {
    const status = await dispatch(downloadImageGraphicPreviewPngThunk());
    if (status !== 200) {
      toast.error("Open the studio with this graphic loaded to capture PNG from the preview.");
    }
  };

  return (
    <section className={styles.card} aria-labelledby="crm-job-app-graphic-heading">
      <div className={styles.cardHeader}>
        <ImageIcon className={styles.icon} aria-hidden />
        <h2 id="crm-job-app-graphic-heading" className={styles.cardTitle}>
          Resume graphic
        </h2>
      </div>
      <p className={styles.p}>Graphic id: {app.imageGraphicId}</p>
      <div className={styles.row}>
        <button type="button" className={styles.btn} onClick={() => void onOpenStudio()}>
          Open in Studio
        </button>
        <button type="button" className={styles.btnSecondary} onClick={() => void onDownloadPng()}>
          Try PNG download
        </button>
      </div>
      <p className={styles.hint}>
        PNG capture uses the live studio iframe. Open in Studio first, then use Try PNG download while the preview is
        visible.
      </p>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: t.onlineProfilesCardHeader,
  icon: t.onlineProfilesIcon,
  cardTitle: t.researchCardTitle,
  p: `text-sm text-gray-800`,
  row: `flex flex-wrap gap-2`,
  btn: t.btnPrimaryMd,
  btnSecondary: t.btnGhost,
  hint: `text-xs text-gray-500`,
};
