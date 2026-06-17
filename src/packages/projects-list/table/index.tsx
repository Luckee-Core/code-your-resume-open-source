"use client";

import { useRouter } from "next/navigation";
import { PROJECT_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentProjectActions } from "@/store/current/currentProject";
import { formatDateMedium } from "@/utils/date-time";

type Props = {
  projectIds: string[];
};

export const ProjectsTable = ({ projectIds }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const projectsMap = useAppSelector((s) => s.projects);

  if (projectIds.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No projects yet</p>
        <p className={styles.emptyDescription}>
          Add a project to capture business context, technologies, and freeform notes for your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.headerCell}>Business</th>
            <th className={styles.headerCell}>Technologies</th>
            <th className={styles.headerCell}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {projectIds.map((id, index) => {
            const project = projectsMap[id];
            if (!project) return null;
            return (
              <tr
                key={id}
                className={styles.row}
                onClick={() => {
                  dispatch(CurrentProjectActions.setCurrentProject(project));
                  router.push(PROJECT_DETAIL_PAGE_PATH);
                }}
              >
                <td className={styles.rowNumberCell}>{index + 1}</td>
                <td className={styles.cell}>{project.businessName}</td>
                <td className={styles.cell}>{project.technologies.length}</td>
                <td className={styles.cell}>{formatDateMedium(project.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: `bg-white rounded border border-gray-300 overflow-x-auto`,
  table: `w-full border-collapse text-sm`,
  rowNumberHeader: `px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-100 border-b border-gray-300 w-8`,
  headerCell: `px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-100 border-b border-gray-300`,
  row: `border-b border-gray-200 hover:bg-orange-50 cursor-pointer`,
  rowNumberCell: `px-2 py-2 text-gray-500`,
  cell: `px-3 py-2 text-gray-900`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
};
