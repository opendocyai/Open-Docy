export const UUID_CHARS = [
	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
	't','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','A','B','C',
	'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W',
	'X','Y','Z'
];

export const FILE_TYPE_MAP: Record<string, string> = {
	pdf: 'application/pdf',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	png: 'image/png',
	gif: 'image/gif',
	svg: 'image/svg+xml',
	webp: 'image/webp',
	docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	doc: 'application/msword',
	txt: 'text/plain',
	mp4: 'video/mp4',
	mp3: 'audio/mpeg',
	zip: 'application/zip',
	html: 'text/html',
}

export const FILE_TYPES: Record<string, string[]> = {
	image: [
		"jpg",
		"jpeg",
		"png",
		"gif",
		"bmp",
		"webp",
		"svg",
		"jfif",
	],

	video: [
		"mp4",
		"mov",
		"avi",
		"mkv",
		"wmv",
		"flv",
		"m3u8",
	],

	audio: [
		"mp3",
		"wav",
		"ogg",
		"aac",
		"flac",
	],

	pdf: ["pdf"],

	word: ["doc", "docx"],

	excel: ["xls", "xlsx"],

	zip: ["zip", "rar", "7z"],
}
export type FileTypeKey = keyof typeof FILE_TYPES;


export interface OpenFilePickerOptions {
	multiple?: boolean
	excludeAcceptAllOption?: boolean
	types?: FilePickerAcceptType[]
	id?: string
	startIn?: WellKnownDirectory | FileSystemHandle
}

export interface FilePickerAcceptType {
	description?: string
	accept: Record<string, string[]>
}

export type WellKnownDirectory =
	| 'desktop'
	| 'documents'
	| 'downloads'
	| 'music'
	| 'pictures'
	| 'videos'


export type FileStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadFile  {
	name?: string
	raw?: File
	size?: number
	status?: FileStatus
	percentage?: number
	uid?: number | string
	type?: string
	url?: string
	key?: string
	file_ext?: string
	fileType?: string
}

export interface ChunkItem {
	index: number
	start: number
	end: number
	chunk: File | Blob
}

