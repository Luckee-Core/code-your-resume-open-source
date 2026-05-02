"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector, store } from "@/store";
import {
  createCompanyThunk,
  createEmploymentThunk,
  createJobThunk,
  deleteEmploymentThunk,
  loadCrmVaultThunk,
} from "@/store/thunks";
import { ExperienceBuilderActions } from "@/store/builders/experienceBuilder";
import type { Company } from "@/model/company";
import type { Job, JobType } from "@/model/job";
import type { Employment } from "@/model/employment";

export const ExperiencePage = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((s) => s.companies);
  const jobs = useAppSelector((s) => s.jobs);
  const employments = useAppSelector((s) => s.employments);
  const modalOpen = useAppSelector((s) => s.experienceBuilder.isAddEmploymentModalOpen);
  const saving = useAppSelector((s) => s.experienceBuilder.isSavingEmployment);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  const companyList = useMemo(() => Object.values(companies) as Company[], [companies]);
  const jobList = useMemo(() => Object.values(jobs) as Job[], [jobs]);
  const employmentList = useMemo(() => Object.values(employments) as Employment[], [employments]);

  const sortedEmployments = useMemo(() => {
    return [...employmentList].sort((a, b) => {
      const ta = a.startDate ? new Date(a.startDate).getTime() : 0;
      const tb = b.startDate ? new Date(b.startDate).getTime() : 0;
      return tb - ta;
    });
  }, [employmentList]);

  const resolveCompanyName = useCallback(
    (id: string) => companies[id]?.name ?? id,
    [companies],
  );
  const resolveJobDisplay = useCallback(
    (id: string) => {
      const job = jobs[id];
      if (!job) return id;
      return { title: job.title, isContract: job.type === "contract" };
    },
    [jobs],
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Work History</h1>
          <p className={styles.muted}>Link a CRM company and job with start and end dates.</p>
        </div>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(true))}
        >
          Add employment
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Company</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Start</th>
              <th className={styles.th}>End</th>
              <th className={styles.th} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {sortedEmployments.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No employment rows yet. Add one to tie a company and job to dates.
                </td>
              </tr>
            ) : (
              sortedEmployments.map((row) => (
                <tr key={row.id}>
                  <td className={styles.td}>{resolveCompanyName(row.companyId)}</td>
                  <td className={styles.td}>
                    {(() => {
                      const d = resolveJobDisplay(row.jobId);
                      if (typeof d === "string") return d;
                      return (
                        <span className="flex items-center gap-1.5">
                          {d.title}
                          {d.isContract && (
                            <span className={styles.contractBadge}>Contract</span>
                          )}
                        </span>
                      );
                    })()}
                  </td>
                  <td className={styles.tdMuted}>{row.startDate || "—"}</td>
                  <td className={styles.tdMuted}>{row.endDate?.trim() ? row.endDate : "Present"}</td>
                  <td className={styles.tdRight}>
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      disabled={saving}
                      onClick={() => void dispatch(deleteEmploymentThunk(row.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen ? (
        <AddEmploymentModal
          companies={companyList}
          jobs={jobList}
          saving={saving}
          onClose={() => dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(false))}
          onSubmit={async (payload) => {
            const status = await dispatch(createEmploymentThunk(payload));
            if (status === 200) {
              dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(false));
            }
          }}
          onCreateCompany={async (name) => {
            const status = await dispatch(
              createCompanyThunk({ name: name.trim(), website: "", notes: "" }),
            );
            if (status !== 200) return null;
            return store.getState().currentCompany.id;
          }}
          onCreateJob={async (companyId, title, type) => {
            const status = await dispatch(
              createJobThunk({
                companyId,
                type: type ?? "job",
                title: title.trim(),
                url: "",
                status: "draft",
              }),
            );
            if (status !== 200) return null;
            return store.getState().currentJob.id;
          }}
        />
      ) : null}
    </div>
  );
};

type ModalProps = {
  companies: Company[];
  jobs: Job[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    companyId: string;
    jobId: string;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  onCreateCompany: (name: string) => Promise<string | null>;
  onCreateJob: (companyId: string, title: string, type: JobType) => Promise<string | null>;
};

const AddEmploymentModal = ({
  companies,
  jobs,
  saving,
  onClose,
  onSubmit,
  onCreateCompany,
  onCreateJob,
}: ModalProps) => {
  const [companyId, setCompanyId] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [jobId, setJobId] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobType, setNewJobType] = useState<JobType>("job");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [busy, setBusy] = useState(false);

  const jobsForCompany = useMemo(
    () => jobs.filter((j) => j.companyId === companyId),
    [jobs, companyId],
  );

  const handleCreateCompany = async () => {
    if (!newCompanyName.trim()) return;
    setBusy(true);
    try {
      const id = await onCreateCompany(newCompanyName);
      if (id) {
        setCompanyId(id);
        setNewCompanyName("");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleCreateJob = async () => {
    if (!companyId || !newJobTitle.trim()) return;
    setBusy(true);
    try {
      const id = await onCreateJob(companyId, newJobTitle, newJobType);
      if (id) {
        setJobId(id);
        setNewJobTitle("");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    if (!companyId || !jobId || !startDate.trim()) return;
    await onSubmit({
      companyId,
      jobId,
      startDate: startDate.trim(),
      endDate: endDate.trim(),
    });
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
            {companies.map((c) => (
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
  wrap: `w-full max-w-4xl space-y-6 p-6`,
  headerRow: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  h1: `text-xl font-semibold text-zinc-900`,
  muted: `text-sm text-zinc-500`,
  tableWrap: `overflow-x-auto rounded-lg border border-zinc-200 bg-white`,
  table: `min-w-full border-collapse text-left text-sm`,
  th: `border-b border-zinc-200 bg-zinc-50 px-3 py-2 font-medium text-zinc-700`,
  td: `border-b border-zinc-100 px-3 py-2.5 text-zinc-900`,
  tdMuted: `border-b border-zinc-100 px-3 py-2.5 text-zinc-600`,
  tdRight: `border-b border-zinc-100 px-3 py-2.5 text-right`,
  empty: `px-3 py-8 text-center text-sm text-zinc-500`,
  primaryBtn: `rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50`,
  secondaryBtn: `whitespace-nowrap rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 disabled:opacity-50`,
  dangerBtn: `text-sm text-red-600 hover:text-red-700 disabled:opacity-50`,
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`,
  modal: `max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-zinc-200 bg-white p-6 shadow-lg`,
  modalTitle: `text-lg font-semibold text-zinc-900`,
  modalHelp: `mt-1 text-sm text-zinc-500`,
  label: `mt-4 flex flex-col gap-1 text-sm font-medium text-zinc-700`,
  select: `rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900`,
  input: `rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900`,
  contractBadge: `inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800`,
  inline: `mt-2 flex flex-col gap-2 sm:flex-row sm:items-center`,
  typeToggle: `flex shrink-0 overflow-hidden rounded-md border border-zinc-300`,
  typeBtn: (active: boolean) =>
    `px-2.5 py-1.5 text-xs font-medium transition-colors ${active ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50"}`,
  dateRow: `mt-4 grid gap-4 sm:grid-cols-2`,
  hint: `mt-2 text-xs text-zinc-500`,
  modalActions: `mt-6 flex justify-end gap-2`,
  ghostBtn: `rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100`,
};
