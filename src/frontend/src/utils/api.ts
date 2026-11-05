import type {ApiMap} from '../shared/types/http';

export class ApiProxy {
	private api: ApiMap
	private name?: string

	constructor(api: ApiMap, name?: string) {
		this.api = api
		this.name = name
	}

	private getApiFn(name?: string) {
		if (!name) return undefined
		return this.api[name]
	}

	private call(name: string, ...args: any[]) {
		const fn = this.getApiFn(name)
		if (!fn) return undefined
		return fn(...args)
	}

	create() {
		const self = this

		const handler: ProxyHandler<any> = {
			get(target, prop: string | symbol, receiver) {

				if (typeof prop === 'symbol') {
					return Reflect.get(target, prop, receiver)
				}

				if (self.name) {
					const result = self.call(self.name)

					if (result && prop in result) {
						return result[prop]
					}
				}

				if (self.api[prop]) {
					const apiFn = self.api[prop]

					const fn = (...args: any[]) => apiFn(...args)

					return new Proxy(fn, {
						apply(_, __, args) {
							return apiFn(...args)
						},
						get(_, key: string) {
							const res = apiFn()
							return res?.[key]
						}
					})
				}

				return Reflect.get(target, prop, receiver)
			},

			apply(_, __, args) {
				if (!self.name) return undefined
				return self.call(self.name, ...args)
			}
		}

		const callable = (...args: any[]) => {
			if (!self.name) return undefined
			return self.call(self.name, ...args)
		}

		const proxy = new Proxy(callable, handler)

		return this.name ? proxy[this.name] : proxy
	}

}

export const apiProxy = (api: ApiMap, name?: string) => new ApiProxy(api, name)


export const useApiProxy = (api: ApiMap, name?: string) => {
	return apiProxy(api, name).create()
}

export default apiProxy
