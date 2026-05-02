"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { deleteCompanyThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const DetailHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const company = useAppSelector((s) => s.currentCompany);

  const onEdit = () => {
    dispatch(CrmBuilderActions.setCompanyEditModalOpen(true));
  };

  const onDelete = async () => {
    if (!company.id) return;
    if (!window.confirm("Delete this company?")) return;
    const status = await dispatch(deleteCompanyThunk(company.id));
    if (status === 200) {
      toast.success("Company deleted");
      router.push("/companies");
    } else {
      toast.error("Could not delete company");
    }
  };

  const websiteLine =
    company.website.trim().length > 0 ? (
      <a
        href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
        className={styles.websiteLink}
        target="_blank"
        rel="noreferrer"
      >
        {company.website}
      </a>
    ) : (
      <p className={styles.mutedLine}>No website on file — use Edit to add one.</p>
    );

  return (
    <header>
      <div className={styles.headerCard}>
        <div className={styles.headerOneLine}>
          <div className={styles.headerTitleRow}>
            <h2 className={styles.businessTitle}>{company.name.trim() || "Untitled company"}</h2>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.btnGhost} onClick={onEdit}>
              Edit
            </button>
            <button type="button" className={styles.btnDanger} onClick={() => void onDelete()}>
              Delete
            </button>
          </div>
        </div>
        {websiteLine}
      </div>
    </header>
  );
};

const styles = {
  headerCard: t.headerCard,
  headerOneLine: t.headerOneLine,
  headerTitleRow: t.headerTitleRow,
  businessTitle: t.headerPrimaryTitle,
  headerActions: t.headerActions,
  btnGhost: t.btnGhost,
  btnDanger: t.btnDanger,
  websiteLink: `text-sm text-orange-600 hover:underline`,
  mutedLine: t.headerMutedLine,
};
