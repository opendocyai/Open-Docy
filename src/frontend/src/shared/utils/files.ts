import {type ChunkItem, FILE_TYPE_MAP, type OpenFilePickerOptions} from "@/shared";

class FilesClass {
	base64ToFile = (base64Str: string, filename = "file.png"): File => {
		const arr = base64Str.split(",");
		const mimeMatch = arr[0]?.match(/:(.*?);/);
		const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
		const better = atob(arr[1] as string);
		let n = better.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = better.charCodeAt(n);
		}

		return new File([u8arr], filename, {type: mime});
	}

	base64ToBlob = (base64: string): Blob => {
		const [meta, data] = base64.split(",");
		const mime = meta?.match(/:(.*?);/)?.[1] || "application/octet-stream";
		const bytes = atob(data as string);
		const u8arr = new Uint8Array(bytes.length);
		for (let i = 0; i < bytes.length; i++) {
			u8arr[i] = bytes.charCodeAt(i);
		}
		return new Blob([u8arr], {type: mime});
	}

	blobToFile = (blob: Blob, fileName: string): File => {
		return new File([blob], fileName, {
			type: blob.type,
			lastModified: Date.now(),
		});
	}

	fileToBlob = (file: File): Blob => {
		return new Blob([file], {type: file.type});
	}

	buildAcceptMap = (extList: string[]) => {
		return extList.reduce<Record<string, string[]>>((acc, ext) => {
			const mime = FILE_TYPE_MAP[ext] || `application/${ext}`
			acc[mime] = [`.${ext}`]
			return acc
		}, {})
	}

	pickFiles = async (
		options: OpenFilePickerOptions
	): Promise<File[]> => {

		const handles: FileSystemFileHandle[] =
			await (window as any).showOpenFilePicker(options);

		return Promise.all(
			handles.map((handle) => handle.getFile())
		);
	};

	createChunks = (
		file: File,
		chunkSize = 1024 * 1024,
		type = 'file'
	): ChunkItem[] => {
		const chunks: ChunkItem[] = []

		let start = 0
		let index = 0
		while (start < file.size) {
			const end = Math.min(
				start + chunkSize,
				file.size
			)

			const chunk = file.slice(start, end, file.type)

			const chunkFile = new File(
				[chunk],
				`${file.name}.part${index}`,
				{
					type: file.type
				}
			)

			chunks.push({
				index,
				start,
				end,
				chunk: type == 'file' ? chunkFile : chunk
			})


			start = end
			index++
		}

		return chunks
	}

	fileSuffix (name: string) {
		return name.split('?')?.[0]?.split('.')?.pop()?.toLowerCase()
	}


}

export const files = new FilesClass()

export const base64ToFile = files.base64ToFile.bind(files)
export const base64ToBlob = files.base64ToBlob.bind(files)
export const blobToFile = files.blobToFile.bind(files)
export const fileToBlob = files.fileToBlob.bind(files)
export const buildAcceptMap = files.buildAcceptMap.bind(files)
export const pickFiles = files.pickFiles.bind(files)
export const createChunks = files.createChunks.bind(files)
export const fileSuffix = files.fileSuffix.bind(files)



export default files

