import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, Download, Loader2, RefreshCw, FileWarning } from "lucide-react";
import {
  getInstructionSheetUrl,
  downloadInstructionSheet,
} from "../services/instructionSheetService";

/**
 * Dark-themed modal that previews and downloads the service instruction-sheet
 * PDF. The PDF is fetched from the backend (which streams it from MongoDB
 * GridFS) and shown in an <iframe>. Includes loading, error, retry, download,
 * and close states, plus keyboard/accessibility support.
 *
 * Props:
 * - categorySlug: string
 * - subServiceSlug: string
 * - serviceLabel: string (localized service name, for the modal title)
 * - onClose: () => void
 */
function InstructionSheetModal({
  categorySlug,
  subServiceSlug,
  serviceLabel,
  onClose,
}) {
  const { t } = useTranslation();
  const pdfUrl = getInstructionSheetUrl(categorySlug, subServiceSlug);

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [downloadError, setDownloadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const closeRef = useRef(null);

  // When the URL changes (new attempt), reload the iframe.
  useEffect(() => {
    setStatus("loading");
    setDownloadError(false);
  }, [attempt]);

  // Focus the close button when the modal opens (keyboard accessibility).
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Close on the Escape key.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleLoad = () => setStatus("ready");
  const handleError = () => setStatus("error");
  const retry = () => setAttempt((a) => a + 1);

  const handleDownload = async () => {
    setDownloadError(false);
    try {
      await downloadInstructionSheet(
        categorySlug,
        subServiceSlug,
        `${subServiceSlug}-instruction-sheet.pdf`
      );
    } catch (err) {
      setDownloadError(true);
    }
  };

  // Dynamic title: "<Service> - <Instruction Sheet>" using the localized label.
  const modalTitle = `${serviceLabel || t("instructionSheet.title")} - ${t(
    "instructionSheet.title"
  )}`;

  return (
    <div
      className="gn-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={modalTitle}
    >
      <div className="gn-instruction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gn-instruction-modal-header">
          <span className="gn-instruction-modal-title font-display">
            {modalTitle}
          </span>
          <button
            ref={closeRef}
            className="gn-modal-x"
            onClick={onClose}
            aria-label={t("instructionSheet.close")}
            title={t("instructionSheet.close")}
          >
            <X size={18} />
          </button>
        </div>

        <div className="gn-instruction-preview">
          {(status === "loading" || status === "ready") && (
            <iframe
              key={attempt}
              className={`gn-instruction-frame ${
                status === "loading" ? "gn-instruction-frame--hidden" : ""
              }`}
              title={modalTitle}
              src={pdfUrl}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}

          {status === "loading" && (
            <div className="gn-instruction-state">
              <Loader2 size={28} className="gn-instruction-spinner" />
              <p>{t("instructionSheet.loading")}</p>
            </div>
          )}

          {status === "error" && (
            <div className="gn-instruction-state">
              <FileWarning size={28} className="gn-instruction-error-icon" />
              <p>{t("instructionSheet.unavailable")}</p>
              <button
                type="button"
                className="gn-instruction-retry"
                onClick={retry}
                aria-label={t("instructionSheet.retry")}
              >
                <RefreshCw size={14} />
                <span>{t("instructionSheet.retry")}</span>
              </button>
            </div>
          )}
        </div>

        <div className="gn-instruction-actions">
          {downloadError && (
            <span className="gn-instruction-dl-error">
              {t("instructionSheet.downloadError")}
            </span>
          )}
          <button
            type="button"
            className="gn-instruction-download"
            onClick={handleDownload}
            aria-label={t("instructionSheet.download")}
          >
            <Download size={16} />
            <span>{t("instructionSheet.download")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionSheetModal;
