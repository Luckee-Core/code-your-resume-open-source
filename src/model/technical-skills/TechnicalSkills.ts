/** One canonical technical skill row. */
export type TechnicalSkillItem = {
  id: string;
  sortOrder: number;
  title: string;
  body: string | null;
  status: "active" | "archived";
  sourceExchangeId?: string | null;
};

/** Pending coach suggestion for a new or updated skill row. */
export type TechnicalSkillSuggestion = {
  id: string;
  title: string;
  body: string | null;
  op: "add" | "update";
  targetSkillId: string | null;
  exchangeId: string;
};

export type TechnicalSkillsChatMessage = {
  id: string;
  role: "user" | "coach";
  content: string;
  sections?: { heading: string; bullets: string[] }[];
  suggestedSkills?: TechnicalSkillSuggestion[];
  timestamp: string;
  rawTime: string;
};

/** Full studio payload returned by the server. */
export type TechnicalSkillsStudioPayload = {
  skills: TechnicalSkillItem[];
  messages: TechnicalSkillsChatMessage[];
};
