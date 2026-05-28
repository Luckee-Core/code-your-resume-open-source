export type ImageGraphic = {
  id: string;
  title: string;
  /** CRM job this graphic belongs to; empty when not job-scoped. */
  jobId: string;
  /** Preview / export canvas in CSS pixels. */
  canvasWidthPx: number;
  canvasHeightPx: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};
