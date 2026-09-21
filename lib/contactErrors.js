// Shared between app/api/contact/route.js (which returns these codes) and
// ContactForm.js (which decides whether to show a "call us instead" fallback
// based on them), so the two can't drift into disagreeing about which codes
// are the visitor's own input mistake vs. a server-side failure.
export const CONTACT_ERROR_CODES = {
  INVALID_BODY: 'INVALID_BODY',
  MISSING_FIELDS: 'MISSING_FIELDS',
  INVALID_EMAIL: 'INVALID_EMAIL',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_NOT_READY: 'SERVER_NOT_READY',
  SEND_FAILED: 'SEND_FAILED',
};

// Codes caused by the visitor's own input/behavior — no need to suggest
// calling instead (rate limiting means "wait and retry", not "call us").
export const CLIENT_FIXABLE_ERROR_CODES = [
  CONTACT_ERROR_CODES.INVALID_BODY,
  CONTACT_ERROR_CODES.MISSING_FIELDS,
  CONTACT_ERROR_CODES.INVALID_EMAIL,
  CONTACT_ERROR_CODES.RATE_LIMITED,
];
