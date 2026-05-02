'use client';

import { CheckCircle } from 'lucide-react';
import type { TechnicalSkillsChatMessage, TechnicalSkillSuggestion } from '@/model/technical-skills';

type Props = {
  message: TechnicalSkillsChatMessage;
  onAccept: (suggestionId: string, title: string, op: string) => void;
  disabled: boolean;
};

/**
 * Renders a coach assistant message with optional skill suggestions.
 */
export const CoachStructuredMessage = ({ message, onAccept, disabled }: Props) => {
  const { content, sections, suggestedSkills } = message;
  const hasSections = sections && sections.length > 0;
  const hasSuggestions = suggestedSkills && suggestedSkills.length > 0;

  return (
    <div className={styles.wrap}>
      {content && !hasSections && (
        <p className={styles.prose}>{content}</p>
      )}
      {hasSections &&
        sections!.map((sec, i) => (
          <div key={i} className={styles.section}>
            {sec.heading && <p className={styles.heading}>{sec.heading}</p>}
            {sec.bullets.length > 0 && (
              <ul className={styles.ul}>
                {sec.bullets.map((b, j) => (
                  <li key={j} className={styles.li}>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      {hasSuggestions && (
        <div className={styles.suggestions}>
          <p className={styles.suggestionsLabel}>Suggested additions</p>
          <div className={styles.suggestionList}>
            {suggestedSkills!.map((sug) => (
              <SuggestionCard
                key={sug.id}
                suggestion={sug}
                disabled={disabled}
                onAccept={onAccept}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type SuggestionCardProps = {
  suggestion: TechnicalSkillSuggestion;
  disabled: boolean;
  onAccept: (suggestionId: string, title: string, op: string) => void;
};

const SuggestionCard = ({ suggestion, disabled, onAccept }: SuggestionCardProps) => (
  <div className={styles.suggestionCard}>
    <div className={styles.suggestionText}>
      <span className={styles.suggestionTitle}>{suggestion.title}</span>
      {suggestion.body && (
        <span className={styles.suggestionBody}>{suggestion.body}</span>
      )}
    </div>
    <button
      type="button"
      className={styles.acceptBtn}
      disabled={disabled}
      onClick={() => onAccept(suggestion.id, suggestion.title, suggestion.op)}
      aria-label={`Accept suggestion: ${suggestion.title}`}
    >
      <CheckCircle className={styles.acceptIcon} aria-hidden />
      Accept
    </button>
  </div>
);

const styles = {
  wrap: `
    flex max-w-[85%] flex-col gap-3 rounded-2xl rounded-bl-sm border border-gray-200
    bg-white px-3.5 py-2.5 shadow-xs
  `,
  prose: `
    whitespace-pre-wrap text-sm leading-relaxed text-gray-800
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
  suggestions: `
    flex flex-col gap-2 rounded-lg bg-orange-50/60 px-3 py-2.5
  `,
  suggestionsLabel: `
    text-xs font-semibold text-orange-700
  `,
  suggestionList: `
    flex flex-col gap-1.5
  `,
  suggestionCard: `
    flex items-start justify-between gap-2 rounded-lg border border-orange-100 bg-white px-3 py-2
  `,
  suggestionText: `
    flex min-w-0 flex-1 flex-col gap-0.5
  `,
  suggestionTitle: `
    text-sm font-medium leading-snug text-gray-900
  `,
  suggestionBody: `
    text-xs leading-relaxed text-gray-600
  `,
  acceptBtn: `
    flex shrink-0 items-center gap-1 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-medium text-white
    shadow-sm transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50
  `,
  acceptIcon: `
    h-3.5 w-3.5
  `,
};
