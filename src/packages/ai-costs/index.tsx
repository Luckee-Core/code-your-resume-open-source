"use client";

import { AiCostsPanel } from "./ai-costs-panel";

/**
 * AI costs — list chrome aligned with Companies / Jobs.
 */
export const AiCostsList = () => {
  return (
    <div className={styles.pageContainer}>
      <AiCostsPanel />
    </div>
  );
};

export { AiCostsPanel } from "./ai-costs-panel";
export { formatEstimatedCostUsd } from "./format-estimated-cost-usd";

const styles = {
  pageContainer: `w-full p-2`,
} as const;
