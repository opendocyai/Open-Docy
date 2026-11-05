import {type PdfManagerType, PdfManager} from "@/shared";
import {shallowRef, ref} from "vue";
import {setupPdfWorker} from '@/utils'

const pdfManager = shallowRef<PdfManagerType | null>(null);

export const usePdfViewer = (isIndependent?: boolean) => {
	const scale = ref<number>(1.5);
	setupPdfWorker();

	const initPdfManager = (initialScale?: number): PdfManagerType => {
		if (isIndependent) {
			scale.value = initialScale ?? scale.value;
			pdfManager.value = new PdfManager(scale.value);
		}

		if (!pdfManager.value) {
			const scaleValue = initialScale ?? scale.value;
			scale.value = scaleValue;
			pdfManager.value = new PdfManager(scaleValue);
		} else if (initialScale !== undefined && initialScale !== scale.value) {
			scale.value = initialScale;
			pdfManager.value.setScale(initialScale);
		}

		return pdfManager.value;
	}

	const pdfViewerInstance = (initialScale?: number): PdfManagerType => {
		return initPdfManager(initialScale);
	}

	return {
		pdfViewerInstance,
		pdfManager,
		scale,
	}
}
