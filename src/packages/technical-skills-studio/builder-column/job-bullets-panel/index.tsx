'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import type { TechnicalSkillItem } from '@/model/technical-skills';
import { CurrentTechnicalSkillsActions } from '@/store/current/currentTechnicalSkills';

type JobBulletGroup = {
  employmentId: string;
  companyName: string;
  jobTitle: string;
  responsibilities: string[];
  requirements: string[];
  niceToHaves: string[];
};

const JobGroup = ({
  group,
  isSaving,
  onAddSkill,
}: {
  group: JobBulletGroup;
  isSaving: boolean;
  onAddSkill: (text: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const totalBullets =
    group.responsibilities.length + group.requirements.length + group.niceToHaves.length;
  if (totalBullets === 0) return null;

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.groupToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
        )}
        <span className={styles.groupCompany}>{group.companyName}</span>
        <span className={styles.groupDivider}>·</span>
        <span className={styles.groupJob}>{group.jobTitle}</span>
        <span className={styles.groupCount}>{totalBullets}</span>
      </button>
      {open && (
        <div className={styles.groupBody}>
          <BulletSection label="Responsibilities" bullets={group.responsibilities} isSaving={isSaving} onAddSkill={onAddSkill} />
          <BulletSection label="Requirements" bullets={group.requirements} isSaving={isSaving} onAddSkill={onAddSkill} />
          <BulletSection label="Nice to have" bullets={group.niceToHaves} isSaving={isSaving} onAddSkill={onAddSkill} />
        </div>
      )}
    </div>
  );
};

const BulletSection = ({
  label,
  bullets,
  isSaving,
  onAddSkill,
}: {
  label: string;
  bullets: string[];
  isSaving: boolean;
  onAddSkill: (text: string) => void;
}) => {
  if (bullets.length === 0) return null;
  return (
    <div className={styles.bulletSection}>
      <span className={styles.bulletSectionLabel}>{label}</span>
      <ul className={styles.bulletList}>
        {bullets.map((b, i) => (
          <li key={i} className={styles.bulletRow}>
            <span className={styles.bulletText}>{b}</span>
            <button
              type="button"
              className={styles.addSkillBtn}
              disabled={isSaving}
              onClick={() => onAddSkill(b)}
              title="Add as technical skill"
            >
              + skill
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Reference panel showing job bullets from all employment-linked jobs.
 * Allows quick-adding a bullet as a technical skill row.
 */
export const JobBulletsPanel = ({ isSaving }: { isSaving: boolean }) => {
  const dispatch = useAppDispatch();
  const employmentsById = useAppSelector((s) => s.employments);
  const jobsById = useAppSelector((s) => s.jobs);
  const companiesById = useAppSelector((s) => s.companies);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);

  const [open, setOpen] = useState(false);

  const groups = useMemo((): JobBulletGroup[] =>
    Object.values(employmentsById)
      .map((emp) => {
        const job = jobsById[emp.jobId];
        const company = companiesById[emp.companyId];
        if (!job || !company) return null;
        return {
          employmentId: emp.id,
          companyName: company.name,
          jobTitle: job.title,
          responsibilities: job.responsibilities ?? [],
          requirements: job.requirements ?? [],
          niceToHaves: job.niceToHaves ?? [],
        };
      })
      .filter((g): g is JobBulletGroup => g !== null),
    [employmentsById, jobsById, companiesById],
  );

  const totalBullets = useMemo(
    () => groups.reduce((sum, g) => sum + g.responsibilities.length + g.requirements.length + g.niceToHaves.length, 0),
    [groups],
  );

  if (groups.length === 0) return null;

  const handleAddSkill = (text: string) => {
    if (isSaving) return;
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const maxOrder = Math.max(-1, ...draftTechnicalSkills.map((i) => i.sortOrder));
    const row: TechnicalSkillItem = {
      id,
      sortOrder: maxOrder + 1,
      title: text.length > 80 ? `${text.slice(0, 80)}…` : text,
      body: '',
      status: 'active',
    };
    dispatch(CurrentTechnicalSkillsActions.addDraftTechnicalSkill(row));
  };

  return (
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.panelToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
        )}
        <span className={styles.panelLabel}>Job bullets</span>
        <span className={styles.panelMeta}>
          {totalBullets} bullets from {groups.length} job{groups.length !== 1 ? 's' : ''}
        </span>
      </button>
      {open && (
        <div className={styles.panelBody}>
          {groups.map((group) => (
            <JobGroup
              key={group.employmentId}
              group={group}
              isSaving={isSaving}
              onAddSkill={handleAddSkill}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  panel: `rounded-md border border-gray-200/90 bg-zinc-50/80`,
  panelToggle: `flex w-full items-center gap-1.5 px-2.5 py-2 text-left`,
  panelLabel: `text-[11px] font-semibold uppercase tracking-wide text-gray-500`,
  panelMeta: `ml-auto text-[11px] text-gray-400`,
  panelBody: `border-t border-gray-200/80 px-2.5 py-2 flex flex-col gap-2`,
  group: `flex flex-col`,
  groupToggle: `flex items-center gap-1.5 py-1 text-left`,
  groupCompany: `text-[11px] font-semibold text-gray-700`,
  groupDivider: `text-gray-400 text-[11px]`,
  groupJob: `text-[11px] text-gray-600 truncate min-w-0`,
  groupCount: `ml-auto shrink-0 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500`,
  groupBody: `pl-5 flex flex-col gap-2`,
  bulletSection: `flex flex-col gap-1`,
  bulletSectionLabel: `text-[10px] font-semibold uppercase tracking-wide text-gray-400`,
  bulletList: `flex flex-col gap-0.5`,
  bulletRow: `flex items-start gap-2 group`,
  bulletText: `flex-1 min-w-0 text-[11px] leading-relaxed text-gray-700`,
  addSkillBtn: `shrink-0 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-orange-600 opacity-0 group-hover:opacity-100 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`,
};
