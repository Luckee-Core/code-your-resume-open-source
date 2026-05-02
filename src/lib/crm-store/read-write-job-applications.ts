import { randomUUID } from "node:crypto";
import type { JobApplication } from "@/model/job-application";
import { readJsonArray, writeJsonArray } from "./crm-json-io";

const FILE = "job-applications.json";

/**
 * Returns all job applications from the on-disk JSON collection.
 */
export const listJobApplicationsFromStore = async (): Promise<JobApplication[]> => {
  return readJsonArray<JobApplication>(FILE, []);
};

/**
 * Inserts a new job application row and returns it.
 */
export const createJobApplicationInStore = async (input: {
  jobId: string;
  submittedAt: string;
  imageGraphicId: string;
  notes: string;
}): Promise<JobApplication> => {
  const rows = await listJobApplicationsFromStore();
  const now = new Date().toISOString();
  const row: JobApplication = {
    id: randomUUID(),
    jobId: input.jobId,
    submittedAt: input.submittedAt,
    imageGraphicId: input.imageGraphicId.trim(),
    notes: input.notes.trim(),
    createdAt: now,
    updatedAt: now,
  };
  rows.push(row);
  await writeJsonArray(FILE, rows);
  return row;
};

/**
 * Returns a job application by id or `null` if missing.
 */
export const getJobApplicationFromStore = async (id: string): Promise<JobApplication | null> => {
  const rows = await listJobApplicationsFromStore();
  return rows.find((r) => r.id === id) ?? null;
};

/**
 * Updates an existing job application; returns updated row or `null` if not found.
 */
export const updateJobApplicationInStore = async (
  id: string,
  patch: Partial<Pick<JobApplication, "jobId" | "submittedAt" | "imageGraphicId" | "notes">>,
): Promise<JobApplication | null> => {
  const rows = await listJobApplicationsFromStore();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const prev = rows[idx]!;
  const next: JobApplication = {
    ...prev,
    jobId: patch.jobId !== undefined ? patch.jobId : prev.jobId,
    submittedAt: patch.submittedAt !== undefined ? patch.submittedAt : prev.submittedAt,
    imageGraphicId:
      patch.imageGraphicId !== undefined ? patch.imageGraphicId.trim() : prev.imageGraphicId,
    notes: patch.notes !== undefined ? patch.notes.trim() : prev.notes,
    updatedAt: new Date().toISOString(),
  };
  rows[idx] = next;
  await writeJsonArray(FILE, rows);
  return next;
};

/**
 * Deletes a job application by id. Returns whether a row was removed.
 */
export const deleteJobApplicationFromStore = async (id: string): Promise<boolean> => {
  const rows = await listJobApplicationsFromStore();
  const next = rows.filter((r) => r.id !== id);
  if (next.length === rows.length) return false;
  await writeJsonArray(FILE, next);
  return true;
};
