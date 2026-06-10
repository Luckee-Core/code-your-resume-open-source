import type { LinkedInEmployment } from "@/model/linkedin-employment";

/**
 * Formats LinkedIn employment start/end for table display.
 */
export const formatLinkedInEmploymentDates = (row: LinkedInEmployment): string => {
  if (row.duration.trim()) return row.duration;

  const startParts = [row.startMonth, row.startYear?.toString()].filter(Boolean);
  const start = startParts.join(" ").trim();

  if (row.isCurrent) {
    return start ? `${start} – Present` : "Present";
  }

  const endParts = [row.endMonth, row.endYear?.toString()].filter(Boolean);
  const end = endParts.join(" ").trim();

  if (start && end) return `${start} – ${end}`;
  return start || end || "—";
};
