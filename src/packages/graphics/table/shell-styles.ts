/**
 * Shared table shell classes for image graphic lists (main /graphics page + job detail sections).
 * `overflow-y-visible` keeps ellipsis action menus from being clipped by horizontal scroll.
 */
export const imageGraphicsTableShellStyles = {
  tableViewport: `overflow-visible`,
  tableWrap: `
    relative overflow-x-auto overflow-y-visible rounded-md border border-gray-200 bg-white
  `,
} as const;
