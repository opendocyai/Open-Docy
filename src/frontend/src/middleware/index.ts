const modules = import.meta.glob('./*.ts', {
	eager: true,
	import: 'default'
})

const middlewareMap: Record<string, any> = {}

for (const path in modules) {

	const name = path
		.split('/')
		.pop()!
		.replace('.ts', '')

	middlewareMap[name] = modules[path]

}

export default middlewareMap
