"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteJobApplicationThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const DetailHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const app = useAppSelector((s) => s.currentJobApplication);

  const onDelete = async () => {
    if (!app.id) return;
    if (!window.confirm("Delete this application record?")) return;
    const status = await dispatch(deleteJobApplicationThunk(app.id));
    if (status === 200) {
      toast.success("Deleted");
      router.push("/job-applications");
    } else {
      toast.error("Could not delete");
    }
  };

  return (
    <header>
      <div className={styles.headerCard}>
        <div className={styles.headerOneLine}>
          <div className={styles.titleBlock}>
            <h2 className={styles.businessTitle}>Job application</h2>
            <span className={styles.metaLine}>Submitted {new Date(app.submittedAt).toLocaleString()}</span>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.btnDanger} onClick={() => void onDelete()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  headerCard: t.headerCard,
  headerOneLine: t.headerOneLine,
  titleBlock: `flex min-w-0 flex-1 flex-col gap-0.5`,
  businessTitle: t.headerPrimaryTitle,
  metaLine: `text-xs text-gray-500`,
  headerActions: t.headerActions,
  btnDanger: t.btnDanger,
};
