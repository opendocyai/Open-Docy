import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import JavaScriptObfuscator from 'javascript-obfuscator'

const files = await fg([
	'dist/**/*.js',
	'!dist/**/*.min.js'
])

for (const file of files) {
	const code = await fs.readFile(file, 'utf8')

	const result = JavaScriptObfuscator.obfuscate(code, {
		compact: true,

		controlFlowFlattening: true,

		controlFlowFlatteningThreshold: 0.7,

		deadCodeInjection: false,

		stringArray: true,

		stringArrayEncoding: ['base64'],

		stringArrayThreshold: 1,

		identifierNamesGenerator: 'hexadecimal',

		renameGlobals: false,

		selfDefending: false,

		debugProtection: false
	})

	await fs.writeFile(file, result.getObfuscatedCode())
	console.log(`✔ ${path.basename(file)}`)
}
