"use client";

import { AiPromptsPanel } from "./ai-prompts-panel";

/**
 * AI prompts — list chrome aligned with Companies / Jobs.
 */
export const AiPromptsList = () => {
  return (
    <div className={styles.pageContainer}>
      <AiPromptsPanel />
    </div>
  );
};

export { AiPromptsPanel } from "./ai-prompts-panel";

const styles = {
  pageContainer: `w-full p-2`,
} as const;
