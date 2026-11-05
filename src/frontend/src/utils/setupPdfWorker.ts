import * as pdfjsLib from "pdfjs-dist";

export function setupPdfWorker() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

export { pdfjsLib };
