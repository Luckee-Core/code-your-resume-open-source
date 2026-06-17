import type { ProjectNote } from "@/model/project";

type ApiRow = {
  id: string;
  projectId: string;
  body: string;
  createdAt: string;
};

/**
 * Map Express project note payload to frontend model.
 */
export const mapProjectNote = (row: ApiRow): ProjectNote => ({
  id: row.id,
  projectId: row.projectId,
  body: row.body ?? "",
  createdAt: row.createdAt,
});
