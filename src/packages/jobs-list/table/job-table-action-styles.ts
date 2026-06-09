/**
 * Shared Tailwind class strings for compact icon action cells in the jobs table.
 * Mirrors the leads table research column pattern.
 */
export const jobsTableActionStyles = {
  actionCell: `px-2 py-2 text-center align-middle`,
  actionButtonWrap: `relative inline-flex group`,
  actionDataDot: `
    pointer-events-none absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500
    ring-2 ring-white
  `,
  actionIconButton: `
    inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-gray-200 bg-white
    text-gray-600 hover:text-[#FF7C1E] hover:border-orange-200 hover:bg-orange-50
    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200
    transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
  `,
  actionIcon: `h-3.5 w-3.5`,
};
