import { saveAs } from 'file-saver';

export const useDownload = () => {

	const init = (data: Blob | string, filename?: string) => {
		saveAs(data, filename)
	}


	const downloadFile = async (url: string, fileName: string) => {
		const response = await fetch(url, {
			headers: {
				'Content-Disposition': `attachment; filename="${fileName}"`
			}
		});
		const blob = await response.blob();

		init(blob, fileName)
	}

  return {
	  init,
	  downloadFile
  }
}
