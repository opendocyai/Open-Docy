import type {FileStatus} from '../types'

class StatusFile {
	ready: FileStatus = 'ready'
	uploading: FileStatus = 'uploading'
	success: FileStatus = 'success'
	fail: FileStatus = 'fail'

	get_status(status: FileStatus): FileStatus {
		const statuses = [this.ready, this.uploading, this.success, this.fail]
		if (!statuses.includes(status)) return this.ready as FileStatus
		return statuses.find(s => s === status) as FileStatus
	}
}

export const statusFile = new StatusFile()

export const STATUS_READY = statusFile.ready
export const STATUS_UPLOADING = statusFile.uploading
export const STATUS_SUCCESS = statusFile.success
export const STATUS_FAIL = statusFile.fail

export const get_status = statusFile.get_status.bind(statusFile)

export default statusFile


