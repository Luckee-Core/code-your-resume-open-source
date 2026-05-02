'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadTechnicalSkillsThunk } from '@/store/thunks/technical-skills';
import { loadCrmVaultThunk } from '@/store/thunks/crm/load-crm-vault-thunk';
import { TechnicalSkillsStudioChatColumn } from './chat-column';
import { TechnicalSkillsBuilderColumn } from './builder-column';

/**
 * Technical Skills Studio — two-column split view: coach chat on the left,
 * skill row editor on the right.
 */
export const TechnicalSkillsStudio = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.technicalSkillsBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.technicalSkillsBuilder.error);
  const crmLoadStatus = useAppSelector((s) => s.crmBuilder.listLoadStatus);

  useEffect(() => {
    void dispatch(loadTechnicalSkillsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (crmLoadStatus === 'idle') {
      void dispatch(loadCrmVaultThunk());
    }
  }, [dispatch, crmLoadStatus]);

  if (loadStatus === 'loading') {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Loading Technical Skills Studio…</p>
      </div>
    );
  }

  if (loadStatus === 'error') {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Could not load Technical Skills Studio</p>
        <p className={styles.emptySub}>{loadError ?? 'Unknown error'}</p>
        <button
          type="button"
          className={styles.retryBtn}
          onClick={() => void dispatch(loadTechnicalSkillsThunk())}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.chatPane}>
        <TechnicalSkillsStudioChatColumn />
      </div>
      <div className={styles.builderPane}>
        <TechnicalSkillsBuilderColumn />
      </div>
    </div>
  );
};

const styles = {
  root: `flex w-full min-w-0 min-h-0 flex-1 overflow-hidden`,
  chatPane: `flex min-w-0 flex-col border-r border-zinc-200 lg:min-h-0 lg:flex-1`,
  builderPane: `flex min-w-0 flex-col overflow-hidden flex-1 lg:min-h-0 lg:w-[45%] lg:max-w-[45%]`,
  emptyState: `py-16 text-center px-4`,
  emptyTitle: `text-base font-semibold text-gray-900`,
  emptySub: `mt-1 text-sm text-gray-600`,
  retryBtn: `mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700`,
};
