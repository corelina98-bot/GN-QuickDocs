import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";

/**
 * Themed "Instruction Sheet" button that opens the PDF preview modal.
 *
 * Styling intentionally reuses the app's existing card look (teal palette,
 * card backgrounds/borders, radius, shadows) so it blends seamlessly with the
 * Residence Certificate page. Uses the same lucide-react icon library already
 * used across the project.
 */
function InstructionSheetButton({ onClick, ariaLabel }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="gn-instruction-btn"
      onClick={onClick}
      aria-label={ariaLabel || t("instructionSheet.open")}
      title={t("instructionSheet.open")}
    >
      <span className="gn-instruction-icon">
        <FileText size={18} strokeWidth={1.6} />
      </span>
      <span className="gn-instruction-label">{t("instructionSheet.title")}</span>
    </button>
  );
}

export default InstructionSheetButton;
