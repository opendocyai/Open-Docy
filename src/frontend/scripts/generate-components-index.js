import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../src/components')
const indexPath = path.join(componentsDir, 'index.ts')

/**
 * kebab-case, snake_case, camelCase, PascalCase
 * Convert all to PascalCase
 */
function toPascalCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .split(/[-_]/)
    .filter(Boolean)
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join('')
}

/**
 * Get component name
 *
 * Supports:
 * defineOptions({ name })
 * defineComponent({ name })
 * export default { name }
 */
function getComponentName(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8')

    const patterns = [
      // defineOptions({
      //   name: 'BaseButton'
      // })
      /defineOptions\s*\(\s*\{[\s\S]*?name\s*:\s*['"`]([^'"`]+)['"`]/m,

      // defineComponent({
      //   name: 'BaseButton'
      // })
      /defineComponent\s*\(\s*\{[\s\S]*?name\s*:\s*['"`]([^'"`]+)['"`]/m,

      // export default {
      //   name: 'BaseButton'
      // }
      /export\s+default\s+\{[\s\S]*?name\s*:\s*['"`]([^'"`]+)['"`]/m,
    ]

    for (const pattern of patterns) {
      const match = code.match(pattern)

      if (match) {
        return toPascalCase(match[1])
      }
    }
  } catch {}

  return null
}

/**
 * Get export name
 */
function getExportName(filePath) {
  const ext = path.extname(filePath)

  // For Vue/JSX/TSX prefer the component name
  if (['.vue', '.tsx', '.jsx'].includes(ext)) {
    const name = getComponentName(filePath)

    if (name) {
      return name
    }
  }

  // Default to the file name
  return toPascalCase(path.basename(filePath, ext))
}

/**
 * Scan components
 */
function getComponents(dir) {
  const components = []

  function scan(currentPath) {
    const items = fs.readdirSync(currentPath)

    for (const item of items) {
      // Ignore generated files
      if (item === 'index.ts') continue

      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      // Recurse into directories
      if (stat.isDirectory()) {
        scan(fullPath)
        continue
      }

      const ext = path.extname(item)

      // Supported file types
      if (!['.vue', '.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        continue
      }

      const relativePath = path.relative(componentsDir, fullPath)

      components.push({
        path: './' + relativePath.replace(/\\/g, '/'),
        name: getExportName(fullPath),
      })
    }
  }

  if (fs.existsSync(dir)) {
    scan(dir)
  }

  return components
}

/**
 * Generate index.ts
 */
function generateContent(components) {
  let content = ''


  const exportNames = new Set()

  for (const component of components) {
    if (exportNames.has(component.name)) {
      console.warn(`⚠️ Duplicate component name: ${component.name}`)
      continue
    }

    exportNames.add(component.name)

    content += `export { default as ${component.name} } from '${component.path}'\n`
    content += `export * from '${component.path}'\n\n`
  }

  return content
}

const components = getComponents(componentsDir)
const content = generateContent(components)

fs.writeFileSync(indexPath, content, 'utf8')

console.log(`✅ Generated ${components.length} components`)
