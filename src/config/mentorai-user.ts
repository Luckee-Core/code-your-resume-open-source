/**
 * User id sent to mentorai-server `/api/user-background-studio` handlers (`userId` query/body).
 * Defaults to local MentorAI dev user when unset so open-source dev works without auth.
 */
export const getMentoraiUserId = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_MENTORAI_USER_ID?.trim();
  return fromEnv || "dev-user-001";
};
