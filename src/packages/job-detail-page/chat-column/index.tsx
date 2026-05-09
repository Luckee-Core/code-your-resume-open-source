'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { sendJobStudioMessageThunk } from '@/store/thunks';
import { filterJobStudioMessagesRollingWindow } from '@/utils/job-studio';
import { JOB_COACH_STARTER_PROMPTS } from './constants';
import { JobCoachMessage } from './coach-message';

/**
 * Job detail coach thread (left column of the two-pane layout).
 */
export const JobDetailChatColumn = () => {
  const dispatch = useAppDispatch();
  const jobId = useAppSelector((s) => s.currentJob.id);
  const coachBusy = useAppSelector((s) => s.jobStudioBuilder.isPostingMessage);
  const loadStatus = useAppSelector((s) => s.jobStudioBuilder.loadStatus);
  const allMessages = useAppSelector((s) => s.currentJobStudio.messages);

  const coachDisabled = coachBusy || !jobId;

  const messages = useMemo(
    () => filterJobStudioMessagesRollingWindow(allMessages),
    [allMessages],
  );

  const hasMessages = messages.length > 0;

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (coachBusy || !jobId) return;
      await dispatch(sendJobStudioMessageThunk(jobId, text));
    },
    [coachBusy, dispatch, jobId],
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSubmit = () => {
    const el = inputRef.current;
    const raw = el?.value?.trim() ?? '';
    if (!raw || coachDisabled) return;
    void handleSendMessage(raw);
    if (el) el.value = '';
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
            <p className={styles.emptyTitle}>Job coach</p>
            <p className={styles.emptySub}>
              Ask about fit, gaps, interview prep, and how to position your applications for this role.
            </p>
            <div className={styles.starters}>
              {JOB_COACH_STARTER_PROMPTS.map((prompt) => (
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
                  <div className={styles.coachCluster}>
                    <JobCoachMessage message={msg} />
                    <span className={styles.coachTime}>{msg.timestamp}</span>
                  </div>
                )}
              </div>
            ))}
            {coachBusy ? (
              <div className={styles.coachBubbleWrap}>
                <div className={styles.typingIndicator}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className={styles.composer}>
        <div className={styles.composerInner}>
          <textarea
            ref={inputRef}
            className={styles.textarea}
            rows={2}
            placeholder={coachDisabled ? 'Coach is replying…' : 'Ask about this job…'}
            disabled={coachDisabled}
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
    flex min-w-0 flex-col border border-gray-200 bg-white
    max-lg:flex-none max-lg:min-h-[min(50vh,420px)]
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
  coachCluster: `
    flex max-w-[85%] flex-col gap-0.5
  `,
  coachTime: `
    pl-1 text-[10px] text-gray-400
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
    min-h-[72px] max-h-[40vh] flex-1 resize-y overflow-y-auto rounded-lg border border-gray-300
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
