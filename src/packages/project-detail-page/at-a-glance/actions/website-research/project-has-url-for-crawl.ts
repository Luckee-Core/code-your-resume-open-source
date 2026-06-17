type ProjectUrlInput = {
  url: string;
};

/**
 * True when the project has a non-empty URL suitable for website research.
 */
export const projectHasUrlForCrawl = (input: ProjectUrlInput): boolean =>
  input.url.trim().length > 0;
