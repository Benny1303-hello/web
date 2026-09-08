// Shared by every tel: link on the site, so the same Vietnamese phone number
// (as stored in lib/content.js, e.g. '0933 004 576') always produces the same
// href — previously 3 files each derived this differently, so the same
// person's number linked to a different tel: value depending on the page.
export function toTelHref(phone) {
  return `tel:+84${phone.replace(/\D/g, '').replace(/^0/, '')}`;
}
