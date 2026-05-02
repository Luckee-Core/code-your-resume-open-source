/**
 * Shared Tailwind class strings for CRM detail surfaces (ADR 009).
 * Import from `@/packages/crm-detail-ui`; keep in sync with Lead Studio lead-detail-page patterns.
 */
export const crmDetailPageTokens = {
  pageWrap: `w-full max-w-6xl mx-auto space-y-6 px-4 py-4`,
  /** Same vertical rhythm as `pageWrap` but uses the full main column width (no max-width). */
  pageWrapFullWidth: `w-full min-w-0 space-y-6 px-4 py-4`,
  emptyMessage: `text-sm text-gray-500 py-4`,
  researchGrid: `grid grid-cols-1 gap-5 lg:grid-cols-2`,
  twoCol: `grid grid-cols-1 gap-6 lg:grid-cols-2`,

  headerCard: `bg-white rounded border border-gray-300 py-2 px-3 mb-3 space-y-2`,
  headerOneLine: `flex flex-wrap items-center justify-between gap-x-3 gap-y-1 min-h-0`,
  headerTitleRow: `flex flex-wrap items-center gap-1.5 min-w-0 flex-1`,
  headerPrimaryTitle: `text-sm font-semibold text-gray-900 truncate`,
  headerMetaLine: `text-sm text-gray-600 leading-snug`,
  headerMutedLine: `text-xs text-gray-400 italic leading-snug`,
  headerActions: `flex shrink-0 flex-wrap items-center gap-1.5`,
  btnGhost: `rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50`,
  btnDanger: `rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50`,
  btnPrimarySm: `rounded-md border-none bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`,
  selectSm: `rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900`,
  labelInline: `flex items-center gap-2 text-xs font-medium text-gray-600`,

  researchCard: `rounded-lg border border-gray-200 bg-white p-5 space-y-4`,
  researchCardTitle: `text-sm font-semibold text-gray-900`,
  researchCardBody: `text-sm leading-relaxed text-gray-800`,
  onlineProfilesCardHeader: `flex items-center gap-2`,
  onlineProfilesIcon: `h-4 w-4 shrink-0 text-[#FF7C1E]`,
  profileChipGrid: `mt-1 flex flex-wrap gap-2`,

  sectionPanel: `space-y-3`,
  sectionHeader: `flex flex-wrap items-center justify-between gap-3`,
  sectionTitle: `text-sm font-semibold text-gray-900 uppercase tracking-wider`,
  sectionAction: `shrink-0`,
  tableViewport: `overflow-visible`,
  tableShell: `relative overflow-x-auto overflow-y-visible rounded-lg border border-gray-200`,
  table: `min-w-full divide-y divide-gray-200`,
  theadRow: `bg-gray-50`,
  thCell: `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600`,
  thCellRight: `px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600`,
  tbodyRow: `cursor-pointer hover:bg-gray-50`,
  tdCell: `px-4 py-3 text-sm text-gray-900`,
  tdCellMuted: `px-4 py-3 text-sm text-gray-500`,
  tdCellTruncate: `max-w-xs truncate px-4 py-3 text-sm text-gray-500`,

  emptyState: `flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 py-10`,
  emptyTitle: `text-sm font-medium text-gray-900`,
  emptyHint: `max-w-sm px-4 text-center text-sm text-gray-500`,
  emptyIcon: `h-8 w-8 text-gray-300`,

  chipLink: `inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-800 hover:border-orange-300 hover:bg-orange-50`,
  formDashedBox: `space-y-3 rounded-md border border-dashed border-gray-200 bg-gray-50/80 p-3`,
  formLabel: `flex flex-col gap-1 text-xs font-medium text-gray-600`,
  formInput: `rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900`,
  formTextarea: `rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900`,
  btnPrimaryMd: `rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50`,

  narrowWrap: `w-full max-w-3xl mx-auto space-y-6 px-4 py-4`,
} as const;
