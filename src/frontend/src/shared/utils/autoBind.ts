export const autoBind = <T extends object>(instance: T): T => {
	return new Proxy(instance, {
		get(target, prop, receiver) {
			const value = Reflect.get(target, prop, receiver)

			if (typeof value === 'function') {
				return value.bind(target)
			}

			return value
		}
	})
}
