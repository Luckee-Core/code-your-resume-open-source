export type ImageGraphic = {
  id: string;
  title: string;
  /** Preview / export canvas in CSS pixels. */
  canvasWidthPx: number;
  canvasHeightPx: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};
