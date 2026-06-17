/**
 * Stable fingerprint for voice style dirty detection.
 */
export const getVoiceStyleFingerprint = (body: string): string =>
  JSON.stringify({ body });
