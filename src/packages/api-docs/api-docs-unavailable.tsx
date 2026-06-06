type Props = {
  status: number;
};

/**
 * Shown when the Express catalog cannot be loaded (server down or misconfigured).
 */
export const ApiDocsUnavailable = (props: Props) => {
  const { status } = props;

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>API documentation unavailable</h1>
      <p className={styles.lead}>
        Could not load the catalog from Express (status {status}). Start{" "}
        <strong className={styles.strong}>code-your-resume-open-source-express-server</strong> on port{" "}
        <strong className={styles.strong}>3053</strong>. In production, set{" "}
        <code className={styles.code}>EXPRESS_API_URL</code> on Vercel to your Railway Express URL.
      </p>
      <p className={styles.hint}>
        See <strong className={styles.strong}>Getting started</strong> in the sidebar for the full local setup
        checklist.
      </p>
    </div>
  );
};

const styles = {
  wrap: `
    max-w-2xl mx-auto w-full px-6 py-10 lg:px-12 lg:py-12
  `,
  title: `
    text-2xl font-semibold text-zinc-900
  `,
  lead: `
    mt-4 text-sm text-zinc-600 leading-relaxed
  `,
  strong: `
    font-semibold text-zinc-900
  `,
  code: `
    rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800
  `,
  hint: `
    mt-6 text-sm text-zinc-500
  `,
};
