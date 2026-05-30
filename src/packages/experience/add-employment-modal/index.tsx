"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector, store } from "@/store";
import {
  createCompanyThunk,
  createEmploymentThunk,
  createJobThunk,
} from "@/store/thunks";
import { ExperienceBuilderActions } from "@/store/builders/experienceBuilder";
import type { Company } from "@/model/company";
import type { Job, JobType } from "@/model/job";

type Props = {
  onClose: () => void;
};

export const AddEmploymentModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((s) => s.companies);
  const jobs = useAppSelector((s) => s.jobs);
  const saving = useAppSelector((s) => s.experienceBuilder.isSavingEmployment);

  const [companyId, setCompanyId] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [jobId, setJobId] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobType, setNewJobType] = useState<JobType>("job");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [busy, setBusy] = useState(false);

  const companyList = useMemo(() => Object.values(companies) as Company[], [companies]);
  const jobList = useMemo(() => Object.values(jobs) as Job[], [jobs]);

  const jobsForCompany = useMemo(
    () => jobList.filter((j) => j.companyId === companyId),
    [jobList, companyId],
  );

  const handleCreateCompany = async () => {
    if (!newCompanyName.trim()) return;
    setBusy(true);
    try {
      const status = await dispatch(
        createCompanyThunk({ name: newCompanyName.trim(), website: "", notes: "" }),
      );
      if (status === 200) {
        const id = store.getState().currentCompany.id;
        if (id) {
          setCompanyId(id);
          setNewCompanyName("");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const handleCreateJob = async () => {
    if (!companyId || !newJobTitle.trim()) return;
    setBusy(true);
    try {
      const status = await dispatch(
        createJobThunk({
          companyId,
          type: newJobType,
          title: newJobTitle.trim(),
          url: "",
          status: "draft",
        }),
      );
      if (status === 200) {
        const id = store.getState().currentJob.id;
        if (id) {
          setJobId(id);
          setNewJobTitle("");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    if (!companyId || !jobId || !startDate.trim()) return;
    const status = await dispatch(
      createEmploymentThunk({
        companyId,
        jobId,
        startDate: startDate.trim(),
        endDate: endDate.trim(),
      }),
    );
    if (status === 200) {
      dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(false));
      onClose();
    }
  };

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="employment-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="employment-modal-title" className={styles.modalTitle}>
          Add employment
        </h2>
        <p className={styles.modalHelp}>
          Pick an existing company and job from your CRM, or create them inline first.
        </p>

        <label className={styles.label}>
          Company
          <select
            className={styles.select}
            value={companyId}
            onChange={(e) => {
              setCompanyId(e.target.value);
              setJobId("");
            }}
          >
            <option value="">Select company…</option>
            {companyList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.inline}>
          <input
            type="text"
            className={styles.input}
            placeholder="New employer name"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
          />
          <button
            type="button"
            className={styles.secondaryBtn}
            disabled={busy || saving || !newCompanyName.trim()}
            onClick={() => void handleCreateCompany()}
          >
            Create company
          </button>
        </div>

        <label className={styles.label}>
          Role (job)
          <select
            className={styles.select}
            value={jobId}
            disabled={!companyId}
            onChange={(e) => setJobId(e.target.value)}
          >
            <option value="">Select job…</option>
            {jobsForCompany.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.inline}>
          <input
            type="text"
            className={styles.input}
            placeholder="New job title"
            value={newJobTitle}
            disabled={!companyId}
            onChange={(e) => setNewJobTitle(e.target.value)}
          />
          <div className={styles.typeToggle}>
            <button
              type="button"
              className={styles.typeBtn(newJobType === "job")}
              onClick={() => setNewJobType("job")}
            >
              Job
            </button>
            <button
              type="button"
              className={styles.typeBtn(newJobType === "contract")}
              onClick={() => setNewJobType("contract")}
            >
              Contract
            </button>
          </div>
          <button
            type="button"
            className={styles.secondaryBtn}
            disabled={busy || saving || !companyId || !newJobTitle.trim()}
            onClick={() => void handleCreateJob()}
          >
            Create
          </button>
        </div>

        <div className={styles.dateRow}>
          <label className={styles.label}>
            Start date
            <input
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            End date
            <input
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <p className={styles.hint}>Leave end date empty for a current role.</p>

        <div className={styles.modalActions}>
          <button type="button" className={styles.ghostBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            disabled={saving || busy || !companyId || !jobId || !startDate}
            onClick={() => void handleSave()}
          >
            Save employment
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`,
  modal: `max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-zinc-200 bg-white p-6 shadow-lg`,
  modalTitle: `text-lg font-semibold text-zinc-900`,
  modalHelp: `mt-1 text-sm text-zinc-500`,
  label: `mt-4 flex flex-col gap-1 text-sm font-medium text-zinc-700`,
  select: `rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900`,
  input: `rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900`,
  inline: `mt-2 flex flex-col gap-2 sm:flex-row sm:items-center`,
  typeToggle: `flex shrink-0 overflow-hidden rounded-md border border-zinc-300`,
  typeBtn: (active: boolean) =>
    `px-2.5 py-1.5 text-xs font-medium transition-colors ${active ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50"}`,
  dateRow: `mt-4 grid gap-4 sm:grid-cols-2`,
  hint: `mt-2 text-xs text-zinc-500`,
  modalActions: `mt-6 flex justify-end gap-2`,
  primaryBtn: `rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50`,
  secondaryBtn: `whitespace-nowrap rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 disabled:opacity-50`,
  ghostBtn: `rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100`,
};
