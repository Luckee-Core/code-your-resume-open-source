"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createJobQuestionAnswerThunk,
  createJobQuestionWithAnswerForJobThunk,
  deleteJobQuestionAnswerThunk,
  updateJobQuestionAnswerThunk,
  updateJobQuestionThunk,
} from "@/store/thunks";
import { getMostRecentAnswerForJobQuestion } from "@/utils/job-questions";
import { JobDetailSectionCard } from "../section-card";
import { ApplicationQuestionRow } from "./application-question-row";
import { AddApplicationQuestionForm } from "./add-application-question-form";

export const ApplicationQuestionsSection = () => {
  const dispatch = useAppDispatch();
  const jobId = useAppSelector((s) => s.currentJob.id);
  const questionsMap = useAppSelector((s) => s.jobQuestions);
  const answersMap = useAppSelector((s) => s.jobQuestionAnswers);

  const linkedRows = useMemo(() => {
    if (!jobId) return [];
    return Object.values(answersMap)
      .filter((a) => a.jobId === jobId)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
  }, [answersMap, jobId]);

  const linkedQuestionIds = useMemo(
    () => new Set(linkedRows.map((r) => r.jobQuestionId)),
    [linkedRows],
  );

  const availableQuestions = useMemo(
    () => Object.values(questionsMap).filter((q) => !linkedQuestionIds.has(q.id)),
    [questionsMap, linkedQuestionIds],
  );

  const onAddExisting = async (jobQuestionId: string) => {
    if (!jobId) return;
    const answer = getMostRecentAnswerForJobQuestion(answersMap, jobQuestionId);
    const status = await dispatch(
      createJobQuestionAnswerThunk({ jobId, jobQuestionId, answer }),
    );
    if (status === 200) {
      toast.success("Question linked");
    } else if (status === 400) {
      toast.error("This question is already on this job");
    } else {
      toast.error("Could not link question");
    }
  };

  const onAddNew = async (prompt: string, answer: string) => {
    if (!jobId) return;
    const status = await dispatch(
      createJobQuestionWithAnswerForJobThunk({ jobId, prompt, answer }),
    );
    if (status === 200) {
      toast.success("Question added");
    } else if (status === 400) {
      toast.error("Could not add question");
    } else {
      toast.error("Could not add question");
    }
  };

  return (
    <JobDetailSectionCard
      sectionKey="applicationQuestions"
      title="Application questions"
      headingId="crm-job-application-questions-heading"
    >
      <div className={styles.stack}>
        <AddApplicationQuestionForm
          availableQuestions={availableQuestions}
          onAddExisting={(id) => void onAddExisting(id)}
          onAddNew={(prompt, answer) => void onAddNew(prompt, answer)}
        />

        {linkedRows.length === 0 ? (
          <p className={styles.empty}>No application questions for this job yet.</p>
        ) : (
          <ul className={styles.list}>
            {linkedRows.map((row) => {
              const question = questionsMap[row.jobQuestionId];
              if (!question) return null;
              return (
                <ApplicationQuestionRow
                  key={row.id}
                  answerRow={row}
                  question={question}
                  onSaveAnswer={async (answer) => {
                    const status = await dispatch(updateJobQuestionAnswerThunk({ id: row.id, answer }));
                    if (status === 200) toast.success("Answer saved");
                    else toast.error("Save failed");
                  }}
                  onSavePrompt={async (prompt) => {
                    const status = await dispatch(updateJobQuestionThunk({ id: question.id, prompt }));
                    if (status === 200) toast.success("Question saved");
                    else toast.error("Save failed");
                  }}
                  onRemove={async () => {
                    const status = await dispatch(deleteJobQuestionAnswerThunk(row.id));
                    if (status === 200) toast.success("Removed from job");
                    else toast.error("Remove failed");
                  }}
                />
              );
            })}
          </ul>
        )}
      </div>
    </JobDetailSectionCard>
  );
};

const styles = {
  stack: `space-y-4`,
  empty: `text-sm italic text-gray-400`,
  list: `space-y-4`,
};
