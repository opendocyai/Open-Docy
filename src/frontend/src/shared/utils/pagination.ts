
class PaginationUtils {
	getPaginate = (total: number, pageSize: number, pageNumber: number, deleteCount: number): number  => {

		const newTotal = total - deleteCount
		const newTotalPages = Math.max(
			1,
			Math.ceil(newTotal / pageSize)
		)
		return Math.min(pageNumber, newTotalPages)
	}

}

const pagination = new PaginationUtils()

export const getPaginate = pagination.getPaginate.bind(pagination)

export default pagination
