/**
 * Resignation letter → A4 PDF, built in the browser (2026-11-02).
 *
 * Loaded with a dynamic import from the Download button, so jsPDF never
 * weighs on the page's first load. Nothing is sent anywhere: the PDF is
 * assembled from the same `letter` string the preview shows and handed to
 * the browser as a download.
 *
 * Uses jsPDF's built-in Times face, which only covers Latin text (WinAnsi).
 * `pdfUnsupportedText` lets the button warn before writing a PDF that would
 * mangle Arabic or other scripts; Copy letter still works for those.
 */
import { jsPDF } from "jspdf";

const PAGE_MARGIN_MM = 25;
const FONT_SIZE_PT = 11.5;
const LINE_HEIGHT = 1.45;
const PT_TO_MM = 0.3528;
// Must match the sign-off line buildResignationLetter() writes.
const SIGN_OFF = "Yours sincerely,";

// WinAnsi (cp1252) beyond Latin-1: the punctuation the letter actually uses.
const WIN_ANSI_EXTRAS = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";

/** True when the text holds characters the PDF's built-in font cannot draw. */
export function pdfUnsupportedText(text: string): boolean {
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 10 || (code >= 32 && code <= 126) || (code >= 160 && code <= 255)) continue;
    if (WIN_ANSI_EXTRAS.includes(ch)) continue;
    return true;
  }
  return false;
}

export function downloadLetterPdf(letter: string, fileName: string): void {
  buildLetterPdf(letter).save(fileName);
}

/** The A4 document itself; separate from saving so it can be checked in Node. */
export function buildLetterPdf(letter: string): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const textWidth = pageWidth - PAGE_MARGIN_MM * 2;
  const lineMm = FONT_SIZE_PT * PT_TO_MM * LINE_HEIGHT;

  doc.setProperties({ title: "Resignation letter", creator: "MakeMyCV.ae" });
  doc.setFont("times", "normal");
  doc.setFontSize(FONT_SIZE_PT);

  let y = PAGE_MARGIN_MM;
  for (const paragraph of letter.split("\n")) {
    // An empty source line is a paragraph gap; wrap everything else.
    const lines: string[] = paragraph === "" ? [""] : doc.splitTextToSize(paragraph, textWidth);
    for (const line of lines) {
      if (y + lineMm > pageHeight - PAGE_MARGIN_MM) {
        doc.addPage();
        y = PAGE_MARGIN_MM;
      }
      doc.text(line, PAGE_MARGIN_MM, y, { baseline: "top" });
      y += lineMm;
    }
    // Room for a handwritten signature under the sign-off (printed letters only).
    if (paragraph === SIGN_OFF) y += lineMm * 2.5;
  }

  return doc;
}
