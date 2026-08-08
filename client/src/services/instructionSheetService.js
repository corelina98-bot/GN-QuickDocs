import api from "../api/axios";

/**
 * Builds the absolute URL for an instruction-sheet PDF served by the backend.
 * The backend streams the PDF from MongoDB GridFS as `application/pdf`.
 *
 * Uses the same API base URL as the shared axios instance (VITE_API_URL) so
 * the iframe <src> points directly at the backend, not the Vite dev origin.
 *
 * @param {string} categorySlug  e.g. "identity-verification-certificates"
 * @param {string} subServiceSlug e.g. "residence-certificate"
 */
export function getInstructionSheetUrl(categorySlug, subServiceSlug) {
  const base = api.defaults.baseURL || "/api";
  return `${base}/services/${categorySlug}/${subServiceSlug}/instruction-sheet`;
}

/**
 * Downloads the instruction-sheet PDF to the user's device with a meaningful
 * filename. Uses the existing axios instance (no second HTTP client).
 *
 * @param {string} categorySlug
 * @param {string} subServiceSlug
 * @param {string} filename  download filename, e.g. "residence-certificate-instruction-sheet.pdf"
 */
export async function downloadInstructionSheet(categorySlug, subServiceSlug, filename) {
  const response = await api.get(
    getInstructionSheetUrl(categorySlug, subServiceSlug),
    { responseType: "blob" }
  );

  const disposition = response.headers?.["content-disposition"] || "";
  const match = disposition.match(/filename="?([^";]+)"?/);
  const resolvedName = match?.[1] || filename || "instruction-sheet.pdf";

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", resolvedName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
