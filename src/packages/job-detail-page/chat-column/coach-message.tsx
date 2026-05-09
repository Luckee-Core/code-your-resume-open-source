'use client';

import type { JobStudioChatMessage } from '@/model/job-studio';

type Props = {
  message: JobStudioChatMessage;
};

/**
 * Renders a job coach message (narrative + optional section blocks).
 */
export const JobCoachMessage = ({ message }: Props) => {
  const { content, sections } = message;
  const hasSections = sections && sections.length > 0;

  return (
    <div className={styles.wrap}>
      {content && hasSections ? <p className={styles.proseLead}>{content}</p> : null}
      {content && !hasSections ? <p className={styles.prose}>{content}</p> : null}
      {hasSections
        ? sections!.map((sec, i) => (
            <div key={i} className={styles.section}>
              {sec.heading ? <p className={styles.heading}>{sec.heading}</p> : null}
              {sec.bullets.length > 0 ? (
                <ul className={styles.ul}>
                  {sec.bullets.map((b, j) => (
                    <li key={j} className={styles.li}>
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
};

const styles = {
  wrap: `
    flex max-w-[85%] flex-col gap-3 rounded-2xl rounded-bl-sm border border-gray-200
    bg-white px-3.5 py-2.5 shadow-xs
  `,
  prose: `
    whitespace-pre-wrap text-sm leading-relaxed text-gray-800
  `,
  proseLead: `
    text-sm font-medium leading-relaxed text-gray-900
  `,
  section: `
    space-y-1
  `,
  heading: `
    text-xs font-semibold uppercase tracking-wide text-gray-500
  `,
  ul: `
    list-disc space-y-0.5 pl-4 text-sm text-gray-800
  `,
  li: `
    leading-relaxed
  `,
};
