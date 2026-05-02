/**
 * Central registry for browser `localStorage` keys (graphics vault, UI flags).
 * CRM entity data must not use these keys — it persists via `app/api` + `.data/crm`.
 */

const APP_PREFIX = "nextjs-to-download";

/** Vault: persisted image graphics JSON blob. */
export const IMAGE_GRAPHICS_VAULT_KEY = `${APP_PREFIX}:vault:image-graphics:v1`;
