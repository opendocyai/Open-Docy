
export function useCopyText() {

	const copy = async (text: string): Promise<boolean> => {
		if (navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(text);
				return true;
			} catch (err) {
				console.warn('Clipboard API failed, fallback to execCommand.', err);
			}
		}
		return copyByExecCommand(text);
	}

	const copyByExecCommand = (text: string): boolean => {
		const textarea = document.createElement('textarea');

		textarea.value = text;
		textarea.setAttribute('readonly', '');
		textarea.style.position = 'fixed';
		textarea.style.top = '-9999px';
		textarea.style.left = '-9999px';

		document.body.appendChild(textarea);
		textarea.select();

		const success = document.execCommand('copy');

		document.body.removeChild(textarea);

		return success;
	}

	return { copy };

}
