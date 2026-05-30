import type { Company } from "@/model/company";

/**
 * Builds a Google search query from company name and first line of notes.
 *
 * @param company - Company entity
 * @returns Query string or null when no searchable text exists
 */
export const buildGoogleSearchQuery = (company: Company): string | null => {
  const name = company.name?.trim() || "";
  const hint = company.notes?.trim().split("\n")[0]?.trim() || "";
  const parts = [name, hint].filter((p) => p.length > 0);
  if (parts.length === 0) return null;
  return parts.join(" ");
};
