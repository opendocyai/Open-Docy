export function useCopyHTML() {
  const copyHTML = async (html: string): Promise<boolean> => {
    const plainText = htmlToText(html);

    if (
      navigator.clipboard?.write &&
      typeof ClipboardItem !== 'undefined'
    ) {
      const item = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
      });

      await navigator.clipboard.write([item]);
      return true;
    }

    return fallbackCopyHTML(plainText);
  };

  const fallbackCopyHTML = (html: string): boolean => {
    const container = document.createElement('div');

    container.contentEditable = 'true';
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';

    document.body.appendChild(container);

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(container);

    selection?.removeAllRanges();
    selection?.addRange(range);

    const success = document.execCommand('copy');

    selection?.removeAllRanges();

    document.body.removeChild(container);

    return success;
  };

  const htmlToText = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.innerText || div.textContent || '';
  };

  return { copyHTML };
}
