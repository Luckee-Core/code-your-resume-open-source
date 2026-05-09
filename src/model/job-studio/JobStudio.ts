/** One chat turn in Job Studio (coach is narrative / structured sections only — no CRM suggestions). */
export type JobStudioChatMessage = {
  id: string;
  role: "user" | "coach";
  content: string;
  sections?: { heading: string; bullets: string[] }[];
  timestamp: string;
  rawTime: string;
};

/** Payload returned by GET/POST `/api/job-studio`. */
export type JobStudioPayload = {
  messages: JobStudioChatMessage[];
};
