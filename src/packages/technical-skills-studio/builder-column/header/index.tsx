'use client';

type Props = {
  dirty: boolean;
  isSaving: boolean;
  onSave: () => void | Promise<void>;
};

/**
 * Save bar for the Technical Skills builder column.
 */
export const TechnicalSkillsBuilderColumnHeader = ({ dirty, isSaving, onSave }: Props) => (
  <div className={styles.wrap}>
    <span className={styles.title}>Technical Skills</span>
    <button
      type="button"
      className={styles.saveBtn}
      disabled={!dirty || isSaving}
      onClick={() => void onSave()}
    >
      {isSaving ? 'Saving…' : 'Save'}
    </button>
  </div>
);

const styles = {
  wrap: `
    flex shrink-0 items-center justify-between gap-2
    border-b border-gray-200/80 bg-white px-3 py-2.5 sm:px-4
  `,
  title: `
    text-sm font-semibold text-gray-900
  `,
  saveBtn: `
    rounded-md border border-gray-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800
    shadow-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
  `,
};
