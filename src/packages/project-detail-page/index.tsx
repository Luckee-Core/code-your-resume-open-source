"use client";

import { useCallback, useEffect, useMemo } from "react";
import { PROJECTS_PATH } from "@/config/routes";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadProjectNotesThunk } from "@/store/thunks";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import { ProjectDetailHeader } from "./header";
import { AtAGlanceSection } from "./at-a-glance";
import { ProjectLinksSection } from "./project-links";
import { NotesLogSection } from "./notes-log";

export const ProjectDetailPage = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.currentProject);
  const projectNotesMap = useAppSelector((s) => s.projectNotes);

  useRegisterBreadcrumbTrail(
    () => {
      const base = [{ label: "Projects", href: PROJECTS_PATH }];
      if (!project.id) return base;
      return [...base, { label: project.businessName }];
    },
    [project.id, project.businessName],
  );

  const reloadNotes = useCallback(async () => {
    if (!project.id) return;
    await dispatch(loadProjectNotesThunk(project.id));
  }, [dispatch, project.id]);

  useEffect(() => {
    void reloadNotes();
  }, [reloadNotes]);

  const notesForProject = useMemo(() => {
    if (!project.id) return [];
    return Object.values(projectNotesMap)
      .filter((note) => note.projectId === project.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [project.id, projectNotesMap]);

  if (!project.id) {
    return (
      <div className={styles.wrap}>
        <p className={t.emptyMessage}>
          Select a project from the list, or create one on Projects.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <ProjectDetailHeader />
      <div className={styles.researchGrid}>
        <AtAGlanceSection />
        <ProjectLinksSection />
      </div>
      <NotesLogSection notes={notesForProject} onNoteAdded={reloadNotes} />
    </div>
  );
};

const styles = {
  wrap: t.pageWrapFullWidth,
  researchGrid: t.researchGrid,
};
