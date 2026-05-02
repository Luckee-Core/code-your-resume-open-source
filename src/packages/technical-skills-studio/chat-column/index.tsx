'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { CoachStructuredMessage } from './CoachStructuredMessage';
import { filterTechnicalSkillsMessagesRollingWindow } from '@/utils/technical-skills';
import {
  acceptTechnicalSkillSuggestionThunk,
  sendTechnicalSkillsMessageThunk,
} from '@/store/thunks/technical-skills';
import { TECHNICAL_SKILLS_STUDIO_STARTER_PROMPTS } from '../constants';


const TEXTAREA_MAX_VH = 0.42;
const TEXTAREA_MIN_PX = 80;

/**
 * Coach thread for the Technical Skills Studio. Reads messages from Redux.
 */
export const TechnicalSkillsStudioChatColumn = () => {
  const dispatch = useAppDispatch();
  const coachBusy = useAppSelector((s) => s.technicalSkillsBuilder.isPostingMessage);
  const isSaving = useAppSelector((s) => s.technicalSkillsBuilder.isSaving);
  const loadStatus = useAppSelector((s) => s.technicalSkillsBuilder.loadStatus);
  const allMessages = useAppSelector((s) => s.currentTechnicalSkills.messages);

  const coachDisabled = coachBusy || isSaving;

  const messages = useMemo(
    () => filterTechnicalSkillsMessagesRollingWindow(allMessages),
    [allMessages],
  );

  const hasMessages = messages.length > 0;

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (coachBusy) return;
      await dispatch(sendTechnicalSkillsMessageThunk(text));
    },
    [coachBusy, dispatch],
  );

  const handleAcceptSuggestion = useCallback(
    (suggestionId: string, title: string, op: string) => {
      if (coachDisabled) return;
      const preview = title.trim().slice(0, 120);
      const ok = window.confirm(`Accept this ${op} suggestion?\n\n"${preview}"`);
      if (!ok) return;
      void dispatch(acceptTechnicalSkillSuggestionThunk(suggestionId));
    },
    [coachDisabled, dispatch],
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const syncTextareaHeight = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = '0px';
    const cap = Math.max(TEXTAREA_MIN_PX, Math.round(window.innerHeight * TEXTAREA_MAX_VH));
    const next = Math.min(Math.max(el.scrollHeight, TEXTAREA_MIN_PX), cap);
    el.style.height = `${next}px`;
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    syncTextareaHeight();
  }, [coachDisabled, syncTextareaHeight]);

  const handleSubmit = () => {
    const el = inputRef.current;
    const raw = el?.value?.trim() ?? '';
    if (!raw || coachDisabled) return;
    void handleSendMessage(raw);
    if (el) {
      el.value = '';
      el.style.height = '0px';
      syncTextareaHeight();
    }
  };

  if (loadStatus === 'loading') {
    return <div className={styles.column} />;
  }

  return (
    <div className={styles.column}>
      <div className={styles.threadWrap}>
        {!hasMessages ? (
          <div className={styles.empty}>
            <div className={styles.emptyIconWrap}>
              <Sparkles className={styles.emptyIcon} aria-hidden />
            </div>
            <p className={styles.emptyTitle}>Technical Skills Coach</p>
            <p className={styles.emptySub}>
              Ask the coach to capture, refine, or add new technical skills to your profile.
            </p>
            <div className={styles.starters}>
              {TECHNICAL_SKILLS_STUDIO_STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className={styles.starterPill}
                  disabled={coachDisabled}
                  onClick={() => void handleSendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.thread}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.role === 'user' ? styles.userBubbleWrap : styles.coachBubbleWrap}
              >
                {msg.role === 'user' ? (
                  <div className={styles.userBubble}>
                    <span className={styles.bubbleText}>{msg.content}</span>
                    <span className={styles.bubbleTime}>{msg.timestamp}</span>
                  </div>
                ) : (
                  <CoachStructuredMessage
                    message={msg}
                    onAccept={handleAcceptSuggestion}
                    disabled={coachDisabled}
                  />
                )}
              </div>
            ))}
            {coachBusy && (
              <div className={styles.coachBubbleWrap}>
                <div className={styles.typingIndicator}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className={styles.composer}>
        <div className={styles.composerInner}>
          <textarea
            ref={inputRef}
            className={styles.textarea}
            rows={1}
            placeholder={
              coachDisabled ? 'Coach is replying…' : 'Ask your coach about your technical skills…'
            }
            disabled={coachDisabled}
            onInput={syncTextareaHeight}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            type="button"
            className={styles.sendIconBtn}
            disabled={coachDisabled}
            onClick={handleSubmit}
            aria-label="Send message"
          >
            <Send className={styles.sendIcon} aria-hidden />
          </button>
        </div>
        <p className={styles.composerHint}>Enter to send · Shift+Enter for a new line</p>
      </div>
    </div>
  );
};

const styles = {
  column: `
    flex min-w-0 flex-col bg-white
    max-lg:flex-none
    lg:min-h-0 lg:flex-1
  `,
  threadWrap: `
    max-lg:overflow-visible
    lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-y-contain
  `,
  empty: `
    flex flex-col items-center justify-center px-4 py-16 text-center
  `,
  emptyIconWrap: `
    flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10
  `,
  emptyIcon: `
    h-6 w-6 text-orange-600
  `,
  emptyTitle: `
    mt-4 text-sm font-medium text-gray-900
  `,
  emptySub: `
    mt-1 max-w-xs text-xs text-gray-500
  `,
  starters: `
    mt-4 flex flex-wrap justify-center gap-2 pt-1
  `,
  starterPill: `
    cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1.5 text-left text-xs font-normal text-gray-700
    shadow-sm transition-colors hover:border-orange-200 hover:bg-orange-50/50 disabled:cursor-not-allowed disabled:opacity-50
  `,
  thread: `
    flex flex-col gap-3 px-4 py-4 sm:px-6
  `,
  userBubbleWrap: `
    flex justify-end
  `,
  coachBubbleWrap: `
    flex justify-start
  `,
  userBubble: `
    flex max-w-[80%] flex-col items-end gap-0.5 rounded-2xl rounded-br-sm bg-orange-600 px-3 py-2 text-white
  `,
  bubbleText: `
    whitespace-pre-wrap text-sm leading-relaxed
  `,
  bubbleTime: `
    mt-0.5 self-end text-[10px] text-white/60
  `,
  typingIndicator: `
    flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-3 py-2 shadow-xs
    [&>span]:h-1.5 [&>span]:w-1.5 [&>span]:animate-bounce [&>span]:rounded-full [&>span]:bg-gray-400
    [&>span:nth-child(2)]:animation-delay-100 [&>span:nth-child(3)]:animation-delay-200
  `,
  composer: `
    shrink-0 border-t border-gray-200 bg-white px-4 py-3 sm:px-6
  `,
  composerInner: `
    flex items-end gap-2
  `,
  textarea: `
    min-h-[80px] max-h-[40vh] flex-1 resize-y overflow-y-auto rounded-lg border border-gray-300
    px-3 py-2.5 text-sm leading-relaxed text-gray-900
    focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50
  `,
  composerHint: `
    mt-1.5 text-[11px] text-gray-500/70
  `,
  sendIconBtn: `
    flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white
    shadow-sm transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50
  `,
  sendIcon: `
    h-4 w-4
  `,
};
