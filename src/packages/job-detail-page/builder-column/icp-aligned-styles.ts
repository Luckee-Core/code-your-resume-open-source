/**
 * Tailwind class strings aligned with Luckee ICP Studio builder rail (`IcpStudioDraftSections`
 * scroll/list + `IcpStudioSectionRow` card body).
 */
export const jobDetailBuilderIcpStyles = {
  draftColumn: `
    flex min-w-0 shrink-0 flex-col gap-2
    max-lg:flex-none
    lg:min-h-0 lg:flex-1
  `,
  draftBody: `
    max-lg:overflow-visible
    lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-y-contain lg:[-webkit-overflow-scrolling:touch]
  `,
  draftList: `
    list-none space-y-2
  `,
  /** One rail block: label (outside card) + card */
  sectionItem: `
    list-none flex flex-col gap-2
  `,
  /** `IcpStudioSectionRow` card — content only (title is outside) */
  rowCard: `rounded-lg border border-gray-200 bg-white px-3 py-3`,
  /** `IcpStudioSectionRow` sectionTitle — used for outside heading */
  rowSectionTitle: `text-[13px] font-medium text-gray-900 leading-snug break-words`,
  rowBodyText: `text-sm font-normal leading-relaxed text-gray-800 whitespace-pre-wrap`,
  rowMuted: `text-sm italic text-gray-400`,
} as const;
