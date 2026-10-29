/**
 * Global Contact & Communication Configuration — JD Jackets & Co.
 *
 * Single source of truth for all WhatsApp order links, mobile click-to-call
 * telephone links, and correspondence email links across the application.
 */

/** Raw digits for https://wa.me/ links (Botswana +267 75 296 591) */
export const WHATSAPP_NUMBER = "26775296591";

/** Human-readable WhatsApp number for UI display */
export const WHATSAPP_DISPLAY = "+267 75 296 591";

/** Call-only telephone number for mobile click-to-call links (+267 78 720 925) */
export const CALL_ONLY_NUMBER = "+26778720925";

/** Human-readable Call-Only number for UI display */
export const CALL_ONLY_DISPLAY = "+267 78 720 925";

/** Standard tel: URI for mobile & desktop click-to-call */
export const CALL_ONLY_TEL_HREF = `tel:${CALL_ONLY_NUMBER}`;

/** Official correspondence email address */
export const CORRESPONDENCE_EMAIL = "Jdandco.conception@gmail.com";

/** Standard mailto: URI for correspondence email links */
export const CORRESPONDENCE_MAILTO_HREF = `mailto:${CORRESPONDENCE_EMAIL}`;

/** Default pre-filled inquiry message for global WhatsApp buttons */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello JD Jackets, I would like to inquire about custom branded apparel and jackets from the 2026/27 Collections for our organization. Please share quotation details and ordering information.";

/**
 * Generates an official `https://wa.me/` deep link pre-populated with a message.
 */
export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
