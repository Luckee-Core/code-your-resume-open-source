'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import type { TechnicalSkillItem } from '@/model/technical-skills';
import { saveTechnicalSkillsThunk } from '@/store/thunks/technical-skills';
import { getTechnicalSkillsFingerprint } from '@/utils/technical-skills';
// getTechnicalSkillsFingerprint is used inside useMemo above
import { CurrentTechnicalSkillsActions } from '@/store/current/currentTechnicalSkills';
import { TechnicalSkillsBuilderColumnHeader } from './header';
import { JobBulletsPanel } from './job-bullets-panel';

const filledCount = (items: TechnicalSkillItem[]): number =>
  items.filter((i) => i.status === 'active' && (Boolean(i.title?.trim()) || Boolean(i.body?.trim()))).length;

/**
 * Builder column for the Technical Skills Studio.
 * Manages the editable skill rows and delegates persistence to the save thunk.
 */
export const TechnicalSkillsBuilderColumn = () => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);
  const isSaving = useAppSelector((s) => s.technicalSkillsBuilder.isSaving);
  const loadStatus = useAppSelector((s) => s.technicalSkillsBuilder.loadStatus);

  const committedFingerprint = useAppSelector((s) => s.currentTechnicalSkills.committedFingerprint);

  const dirty = useMemo(
    () => committedFingerprint !== getTechnicalSkillsFingerprint(draftTechnicalSkills),
    [committedFingerprint, draftTechnicalSkills],
  );

  const activeRows = useMemo(
    () =>
      draftTechnicalSkills
        .filter((i) => i.status === 'active')
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [draftTechnicalSkills],
  );

  const filled = useMemo(() => filledCount(activeRows), [activeRows]);

  const handleSave = useCallback(async () => {
    if (isSaving) return;
    await dispatch(saveTechnicalSkillsThunk());
  }, [dispatch, isSaving]);

  const handleRemoveRow = useCallback(
    async (rowId: string) => {
      if (isSaving) return;
      dispatch(CurrentTechnicalSkillsActions.removeDraftTechnicalSkill(rowId));
      await dispatch(saveTechnicalSkillsThunk());
    },
    [dispatch, isSaving],
  );

  const handleAddRow = useCallback(() => {
    if (isSaving) return;
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const maxOrder = Math.max(-1, ...draftTechnicalSkills.map((i) => i.sortOrder));
    const row: TechnicalSkillItem = {
      id,
      sortOrder: maxOrder + 1,
      title: '',
      body: '',
      status: 'active',
    };
    const savedTop = scrollRef.current?.scrollTop ?? 0;
    dispatch(CurrentTechnicalSkillsActions.addDraftTechnicalSkill(row));
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = savedTop;
    });
  }, [dispatch, draftTechnicalSkills, isSaving]);

  if (loadStatus === 'loading') {
    return <div className={styles.column} />;
  }

  return (
    <div className={styles.column}>
      <TechnicalSkillsBuilderColumnHeader dirty={dirty} isSaving={isSaving} onSave={handleSave} />
      <div ref={scrollRef} className={styles.scroll}>
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <div className={styles.blockHeadLeft}>
              {filled > 0 && <span className={styles.meta}>{filled} filled</span>}
            </div>
            <button
              type="button"
              className={styles.addRowBtn}
              disabled={isSaving}
              onClick={handleAddRow}
            >
              Add row
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Tool / Technology</th>
                  <th className={styles.th}>How you use it</th>
                  <th className={styles.thNarrow} aria-label="actions" />
                </tr>
              </thead>
              <tbody>
                {activeRows.length === 0 ? (
                  <tr>
                    <td className={styles.tdMuted} colSpan={3}>
                      No skills yet. Add a row or ask the coach to suggest skills.
                    </td>
                  </tr>
                ) : (
                  activeRows.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.td}>
                        <input
                          className={styles.input}
                          disabled={isSaving}
                          value={row.title}
                          placeholder="e.g. React Native"
                          onChange={(e) =>
                            dispatch(
                              CurrentTechnicalSkillsActions.updateDraftTechnicalSkill({
                                id: row.id,
                                title: e.target.value,
                              }),
                            )
                          }
                        />
                      </td>
                      <td className={styles.td}>
                        <textarea
                          className={styles.cellTextarea}
                          rows={2}
                          disabled={isSaving}
                          value={row.body ?? ''}
                          placeholder="Brief description of how you use it"
                          onChange={(e) =>
                            dispatch(
                              CurrentTechnicalSkillsActions.updateDraftTechnicalSkill({
                                id: row.id,
                                body: e.target.value,
                              }),
                            )
                          }
                        />
                      </td>
                      <td className={styles.tdNarrow}>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          disabled={isSaving}
                          onClick={() => void handleRemoveRow(row.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <JobBulletsPanel isSaving={isSaving} />
      </div>
    </div>
  );
};

const styles = {
  column: `flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden`,
  scroll: `flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain px-2 py-3 sm:px-3 sm:py-4`,
  block: `flex flex-col gap-1.5`,
  blockHead: `flex items-center justify-between gap-2`,
  blockHeadLeft: `flex min-w-0 items-center gap-2`,
  meta: `text-xs text-gray-400`,
  addRowBtn: `shrink-0 rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,
  tableWrap: `overflow-x-auto rounded-md border border-gray-200/90 bg-zinc-50/80`,
  table: `min-w-full border-collapse text-left text-xs`,
  th: `border-b border-gray-200/80 bg-zinc-100/90 px-2 py-1.5 font-semibold text-gray-700`,
  thNarrow: `border-b border-gray-200/80 bg-zinc-100/90 px-1.5 py-1.5 w-[5.5rem]`,
  td: `border-b border-gray-200/60 px-2 py-1.5 align-top bg-white/60`,
  tdNarrow: `border-b border-gray-200/60 px-1.5 py-1.5 align-top w-[5.5rem] bg-white/60`,
  tdMuted: `border-b border-gray-200/60 px-2 py-2 text-gray-500 italic bg-white/40`,
  input: `w-full rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50`,
  cellTextarea: `w-full min-h-[48px] resize-y rounded border border-gray-200 px-2 py-1.5 text-xs leading-relaxed text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50`,
  removeBtn: `text-[11px] font-medium text-red-600 hover:underline disabled:opacity-50`,
};
