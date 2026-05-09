/**
 * Builder-rail section identity for the job detail page (parallel to Luckee ICP `IcpSection`
 * `key` / `title` — metadata only; bullet rows live in Redux dumps).
 */
export type JobDetailBuilderSectionKey =
  | "responsibilities"
  | "requirements"
  | "niceToHaves"
  | "applications";

/** Display titles keyed like ICP draft section keys. */
export const JOB_DETAIL_BUILDER_SECTION_TITLE: Record<JobDetailBuilderSectionKey, string> = {
  responsibilities: "Responsibilities",
  requirements: "Requirements",
  niceToHaves: "Nice to haves",
  applications: "Applications",
};

/** Render order in the builder scroll list. */
export const JOB_DETAIL_BUILDER_SECTION_ORDER: JobDetailBuilderSectionKey[] = [
  "responsibilities",
  "requirements",
  "niceToHaves",
  "applications",
];
