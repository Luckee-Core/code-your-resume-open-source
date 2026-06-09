/**
 * Format estimated USD cost for display.
 */
export const formatEstimatedCostUsd = (value: number): string => {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "$0.00";
  if (value < 0.01) return `<$0.01`;
  return `$${value.toFixed(4)}`;
};
