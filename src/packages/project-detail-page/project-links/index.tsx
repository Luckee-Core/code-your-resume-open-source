"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateProjectThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const ProjectLinksSection = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.currentProject);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const href = project.url.trim()
    ? project.url.trim().startsWith("http")
      ? project.url.trim()
      : `https://${project.url.trim()}`
    : "";

  const onAddTech = async () => {
    const next = draft.trim();
    if (!next || !project.id) return;
    if (project.technologies.includes(next)) {
      setDraft("");
      return;
    }
    setBusy(true);
    const status = await dispatch(
      updateProjectThunk({
        id: project.id,
        technologies: [...project.technologies, next],
      }),
    );
    setBusy(false);
    if (status === 200) {
      setDraft("");
      toast.success("Technology added");
    } else {
      toast.error("Save failed");
    }
  };

  const onRemoveTech = async (tech: string) => {
    if (!project.id) return;
    setBusy(true);
    const status = await dispatch(
      updateProjectThunk({
        id: project.id,
        technologies: project.technologies.filter((item) => item !== tech),
      }),
    );
    setBusy(false);
    if (status === 200) {
      toast.success("Technology removed");
    } else {
      toast.error("Save failed");
    }
  };

  return (
    <section className={styles.card} aria-labelledby="crm-project-research-links-heading">
      <div className={styles.cardHeader}>
        <Globe className={styles.icon} aria-hidden />
        <h2 id="crm-project-research-links-heading" className={styles.cardTitle}>
          Research links
        </h2>
      </div>

      <div className={styles.grid}>
        {href ? (
          <a className={styles.chip} href={href} target="_blank" rel="noreferrer">
            Project website
          </a>
        ) : (
          <span className={styles.muted}>Add a URL on the project (Edit) to pin a link here.</span>
        )}
      </div>

      <div className={styles.techBlock}>
        <h3 className={styles.subheading}>Technologies</h3>
        <p className={styles.techHint}>Tools and stack used on this project.</p>
        <div className={styles.chips}>
          {project.technologies.length === 0 ? (
            <p className={styles.emptyBody}>No technologies yet.</p>
          ) : (
            project.technologies.map((tech) => (
              <span key={tech} className={styles.techChip}>
                {tech}
                <button
                  type="button"
                  className={styles.chipRemove}
                  disabled={busy}
                  onClick={() => void onRemoveTech(tech)}
                  aria-label={`Remove ${tech}`}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        <div className={styles.addRow}>
          <input
            className={styles.input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="React, PostgreSQL, …"
            onKeyDown={(e) => {
              if (e.key === "Enter") void onAddTech();
            }}
          />
          <button
            type="button"
            className={styles.btnPrimary}
            disabled={busy || !draft.trim()}
            onClick={() => void onAddTech()}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: t.onlineProfilesCardHeader,
  icon: t.onlineProfilesIcon,
  cardTitle: t.researchCardTitle,
  grid: t.profileChipGrid,
  chip: t.chipLink,
  muted: `text-sm text-gray-500`,
  techBlock: `mt-4 pt-4 border-t border-gray-100 space-y-2`,
  subheading: `text-xs font-semibold uppercase tracking-wide text-gray-500`,
  techHint: `text-xs text-gray-500`,
  chips: `flex flex-wrap gap-2`,
  techChip: `inline-flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-800`,
  chipRemove: `ml-1 text-gray-500 hover:text-gray-900`,
  emptyBody: t.emptyHint,
  addRow: `flex flex-col gap-2 sm:flex-row sm:items-center pt-1`,
  input: `${t.formInput} flex-1`,
  btnPrimary: t.btnPrimaryMd,
};
