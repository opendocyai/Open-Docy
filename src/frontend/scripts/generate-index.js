import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * ============================================================
 * Base paths
 * ============================================================
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, '../src')

const componentsDir = path.join(srcDir, 'components')
const sharedDir = path.join(srcDir, 'shared')

const rootIndexPath = path.join(srcDir, 'index.ts')

/**
 * Slim rete entry
 *
 * Built separately with BUILD_MODE=lib-rete into rete.js, referenced by pages via
 * "@docyai/rete" (see vite.config.ts).
 */
const reteEntryPath = path.join(srcDir, 'rete-entry.ts')

/**
 * Extra modules aggregated in the rete entry besides rete components
 */
const reteEntryExtraLines = [
  "export { default as AuditPublish } from './components/audit/publish/index.vue'",
  "export * from './components/audit/publish/index.vue'",
  "export { default as NuxtIcon } from './components/nuxt/icon/index.vue'",
  "export * from './components/nuxt/icon/index.vue'",
  '',
  "export * from './composables/addPorts'",
  "export * from './composables/rete'",
  "export * from './composables/reteCustoms'",
  "export * from './composables/reteDrop'",
  "export * from './composables/reteEditor'",
  "export * from './composables/reteLabels'",
  "export * from './composables/reteNodes'",
  "export * from './composables/reteRun'",
  "export * from './composables/settingNodeId'",
  '',
  "export * from './shared/types/rete'",
  "export * from './shared/utils/createReteApp'",
  "export * from './shared/utils/keyboard'",
  "export * from './shared/utils/rete'",
  "export * from './shared/utils/reteAddPorts'",
  "export * from './shared/utils/reteComponents'",
  "export * from './shared/utils/reteConnection'",
  "export * from './shared/utils/reteConnections'",
  "export * from './shared/utils/reteControls'",
  "export * from './shared/utils/reteExportImport'",
  "export * from './shared/utils/reteNodeConnections'",
  "export * from './shared/utils/reteNodeEventBus'",
  "export * from './shared/utils/reteNodes'",
  "export * from './shared/utils/reteSocket'",
  "export * from './shared/utils/reteSockets'",
  '',
  "export * from './stores/rete'",
  "export * from './stores/reteLabels'",
  '',
  "export * from './core'",
]

/**
 * ============================================================
 * Config
 * ============================================================
 */

/**
 * Regular directories
 *
 * These directories generate index.ts directly:
 *
 * client/index.ts
 * composables/index.ts
 * utils/index.ts
 * api/index.ts
 * stores/index.ts
 */
const normalDirectories = [
  'client',
  'composables',
  'utils',
  'api',
  'stores'
]

/**
 * shared Special directories
 *
 * Result:
 *
 * shared/
 * ├── types/
 * │   └── index.ts
 * │
 * ├── utils/
 * │   └── index.ts
 * │
 * └── index.ts
 */
const sharedDirectories = [
  'types',
  'utils',
]

/**
 * components Supported files
 */
const componentExtensions = [
  '.vue',
  '.tsx',
  '.jsx',
  '.ts',
  '.js',
]

/**
 * Regular modulesSupported files
 */
const moduleExtensions = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
]

/**
 * ============================================================
 * Utilities
 * ============================================================
 */

/**
 * Convert to PascalCase
 *
 * Supports:
 *
 * kebab-case
 * snake_case
 * camelCase
 * PascalCase
 * space name
 *
 * Examples:
 *
 * user-info -> UserInfo
 * user_info -> UserInfo
 * userInfo  -> UserInfo
 * UserInfo  -> UserInfo
 * base-button -> BaseButton
 */
function toPascalCase(str) {
  return str
    /**
     * userInfo -> user-Info
     */
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')

    /**
     * underscores/spaces -> -
     */
    .replace(/[_\s]+/g, '-')

    /**
     * path separators -> -
     */
    .replace(/[\\/]+/g, '-')

    /**
     * collapse consecutive -
     */
    .replace(/-+/g, '-')

    /**
     * Split
     */
    .split('-')

    /**
     * Drop empty strings
     */
    .filter(Boolean)

    /**
     * Capitalize first letter
     */
    .map(item => {
      return item.charAt(0).toUpperCase() + item.slice(1)
    })

    /**
     * Join
     */
    .join('')
}

/**
 * Check file extension
 */
function hasExtension(filePath, extensions) {
  const ext = path.extname(filePath).toLowerCase()

  return extensions.includes(ext)
}

/**
 * ============================================================
 * Vue Component name parsing
 * ============================================================
 */

/**
 * Get the inner component name
 *
 * Supports:
 *
 * 1.
 *
 * defineOptions({
 *   name: 'BaseButton'
 * })
 *
 * 2.
 *
 * defineComponent({
 *   name: 'BaseButton'
 * })
 *
 * 3.
 *
 * export default {
 *   name: 'BaseButton'
 * }
 */
function getComponentName(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8')

    const patterns = [
      /**
       * defineOptions({
       *   name: 'BaseButton'
       * })
       */
      /defineOptions\s*\(\s*\{[\s\S]*?\bname\s*:\s*['"`]([^'"`]+)['"`]/m,

      /**
       * defineComponent({
       *   name: 'BaseButton'
       * })
       */
      /defineComponent\s*\(\s*\{[\s\S]*?\bname\s*:\s*['"`]([^'"`]+)['"`]/m,

      /**
       * export default {
       *   name: 'BaseButton'
       * }
       */
      /export\s+default\s*\{[\s\S]*?\bname\s*:\s*['"`]([^'"`]+)['"`]/m,
    ]

    for (const pattern of patterns) {
      const match = code.match(pattern)

      if (match?.[1]) {
        return toPascalCase(match[1])
      }
    }
  } catch (error) {
    console.warn(
      `⚠️ Failed to read component: ${filePath}`,
    )

    console.warn(error)
  }

  return null
}

/**
 * ============================================================
 * Get export name
 * ============================================================
 */

/**
 * Vue / JSX / TSX
 *
 * Preferred:
 *
 * defineOptions name
 * defineComponent name
 * export default name
 *
 * Fallback:
 *
 * Use the file name
 */
function getExportName(filePath) {
  const ext = path.extname(filePath).toLowerCase()

  /**
   * Vue / JSX / TSX
   */
  if (
    ['.vue', '.tsx', '.jsx'].includes(ext)
  ) {
    const componentName =
      getComponentName(filePath)

    if (componentName) {
      return componentName
    }
  }

  /**
   * Use the file name
   */
  return toPascalCase(
    path.basename(filePath, ext),
  )
}

/**
 * ============================================================
 * Recursively scan files
 * ============================================================
 */

/**
 * Scan all files under a directory
 *
 * Automatic:
 *
 * - recursion
 * - Ignore index.ts
 * - Ignore hidden files
 */
function scanFiles(
  dir,
  extensions,
) {
  const files = []

  /**
   * Directory does not exist
   */
  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {

    /**
     * Ignore index.ts
     */
    if (item === 'index.ts') {
      continue
    }

    /**
     * Ignore hidden files
     */
    if (item.startsWith('.')) {
      continue
    }

    const fullPath = path.join(
      dir,
      item,
    )

    const stat = fs.statSync(fullPath)

    /**
     * Directory
     */
    if (stat.isDirectory()) {
      files.push(
        ...scanFiles(
          fullPath,
          extensions,
        ),
      )

      continue
    }

    /**
     * File
     */
    if (
      !hasExtension(
        fullPath,
        extensions,
      )
    ) {
      continue
    }

    files.push(fullPath)
  }

  return files
}

/**
 * ============================================================
 * Generate components/index.ts
 * ============================================================
 */

function generateComponentsIndex() {

  /**
   * components Not found
   */
  if (!fs.existsSync(componentsDir)) {
    console.warn(
      '⚠️ src/components directory does not exist',
    )

    return []
  }

  /**
   * Get all components
   */
  const files = scanFiles(
    componentsDir,
    componentExtensions,
  )

  /**
   * Convert to component info
   */
  const components = files
    .map(filePath => {

      const relativePath = path
        .relative(
          componentsDir,
          filePath,
        )
        .replace(/\\/g, '/')

      return {
        name: getExportName(filePath),
        path: `./${relativePath}`,
        filePath,
      }
    })

    /**
     * Sort by name
     */
    .sort((a, b) => {
      return a.name.localeCompare(
        b.name,
      )
    })

  /**
   * Guard against duplicate names
   */
  const exportNames = new Set()

  /**
   * File content
   */
  let content = ''

  /**
   * Generate exports
   */
  for (const component of components) {

    /**
     * Duplicate name
     */
    if (
      exportNames.has(
        component.name,
      )
    ) {
      console.warn(
        `⚠️ Duplicate component name: ${component.name}`,
      )

      console.warn(
        `   ${component.filePath}`,
      )

      continue
    }

    exportNames.add(
      component.name,
    )

    /**
     * default export
     */
    content +=
      `export { default as ${component.name} } from '${component.path}'\n`

    /**
     * named export
     */
    content +=
      `export * from '${component.path}'\n\n`
  }

  /**
   * Write file
   */
  fs.writeFileSync(
    path.join(
      componentsDir,
      'index.ts',
    ),
    content,
    'utf8',
  )

  console.log(
    `✅ components/index.ts (${exportNames.size} components)`,
  )

  return components
}

/**
 * ============================================================
 * GenerateRegular directories index.ts
 * ============================================================
 *
 * client
 * composables
 * utils
 * api
 * stores
 *
 * e.g.:
 *
 * src/utils/
 *
 * ├── format.ts
 * ├── date.ts
 * └── index.ts
 *
 * Output:
 *
 * export * from './date'
 * export * from './format'
 */
function generateDirectoryIndex(name) {

  const dir = path.join(
    srcDir,
    name,
  )

  /**
   * Not found
   */
  if (!fs.existsSync(dir)) {
    console.warn(
      `⚠️ src/${name} directory does not exist`,
    )

    return
  }

  /**
   * Scan
   */
  const files = scanFiles(
    dir,
    moduleExtensions,
  )

  /**
   * Sort
   */
  files.sort((a, b) => {
    return a.localeCompare(b)
  })

  /**
   * File content
   */
  let content = ''

  /**
   * Generate
   */
  files.forEach(filePath => {

    const relativePath = path
      .relative(
        dir,
        filePath,
      )
      .replace(/\\/g, '/')
      .replace(
        /\.(ts|tsx|js|jsx)$/,
        '',
      )

    content +=
      `export * from './${relativePath}'\n`
  })

  /**
   * Write file
   */
  fs.writeFileSync(
    path.join(
      dir,
      'index.ts',
    ),
    content,
    'utf8',
  )

  console.log(
    `✅ ${name}/index.ts (${files.length} files)`,
  )
}

/**
 * ============================================================
 * Generate shared/types/index.ts
 *
 * Generate shared/utils/index.ts
 * ============================================================
 */

function generateSharedSubIndex(name) {

  const dir = path.join(
    sharedDir,
    name,
  )

  /**
   * Not found
   */
  if (!fs.existsSync(dir)) {
    console.warn(
      `⚠️ src/shared/${name} directory does not exist`,
    )

    return
  }

  /**
   * Scan TS File
   */
  const files = scanFiles(
    dir,
    moduleExtensions,
  )

  /**
   * Sort
   */
  files.sort((a, b) => {
    return a.localeCompare(b)
  })

  /**
   * File content
   */
  let content = ''

  /**
   * Generate exports
   */
  files.forEach(filePath => {

    const relativePath = path
      .relative(
        dir,
        filePath,
      )
      .replace(/\\/g, '/')
      .replace(
        /\.(ts|tsx|js|jsx)$/,
        '',
      )

    content +=
      `export * from './${relativePath}'\n`
  })

  /**
   * Write file
   */
  fs.writeFileSync(
    path.join(
      dir,
      'index.ts',
    ),
    content,
    'utf8',
  )

  console.log(
    `✅ shared/${name}/index.ts (${files.length} files)`,
  )
}

/**
 * ============================================================
 * Generate shared/index.ts
 * ============================================================
 *
 * Result:
 *
 * export * from './types'
 * export * from './utils'
 */
function generateSharedIndex() {

  /**
   * shared Not found
   */
  if (!fs.existsSync(sharedDir)) {
    console.warn(
      '⚠️ src/shared directory does not exist',
    )

    return
  }

  /**
   * File content
   */
  let content = ''

  /**
   * shared subdirectories
   */
  sharedDirectories.forEach(name => {

    const dir = path.join(
      sharedDir,
      name,
    )

    /**
     * Skip when missing
     */
    if (!fs.existsSync(dir)) {
      return
    }

    content +=
      `export * from './${name}'\n`
  })

  /**
   * Write file
   */
  fs.writeFileSync(
    path.join(
      sharedDir,
      'index.ts',
    ),
    content,
    'utf8',
  )

  console.log(
    '✅ shared/index.ts',
  )
}

/**
 * ============================================================
 * Generate src/rete-entry.ts
 * ============================================================
 *
 * rete Slim entry for the rete public surface: aggregates rete modules but does NOT export ./router.
 *
 * The route table references the whole src/pages via dynamic import(); once bundled,
 * lib/docyai-model it would drag all page chunks into the web build
 * (measured: dist-web gains 67MB of duplicates).
 */
function generateReteEntry(components) {

  const reteComponents = components.filter(component =>
    component.path.startsWith('./rete/'),
  )

  /**
   * rete Skip when the canvas sources are missing from this checkout: rete is provided by the
   * compiled bundle lib/docyai-model/rete.js; files generated here would import non-existent modules.
   * Regenerate the rete entry in a checkout that carries src/rete-entry.ts.
   */
  if (reteComponents.length === 0) {

    console.log(
      '⏭  Skipping rete-entry.ts (no rete sources here, provided by lib/docyai-model/rete.js)',
    )

    return
  }

  let content = ''

  for (const component of reteComponents) {

    /**
     * './rete/editor/index.vue' -> './components/rete/editor/index.vue'
     */
    const target = `./components/${component.path.replace('./', '')}`

    /**
     * Vue SFC only has a default export, `export *` captures nothing,
     * so write both lines like components/index.ts does.
     */
    content += `export { default as ${component.name} } from '${target}'\n`
    content += `export * from '${target}'\n\n`
  }

  content += reteEntryExtraLines.join('\n')
  content += '\n'

  fs.writeFileSync(
    reteEntryPath,
    content,
    'utf8',
  )

  console.log(
    `✅ rete-entry.ts (${reteComponents.length} rete components)`,
  )
}

function generateRootIndex() {
  /**
   * Whether components exists
   */
  const hasComponents =
    fs.existsSync(
      componentsDir,
    )

  /**
   * Whether core exists
   */
  const coreDir =
    path.join(
      srcDir,
      'core',
    )

  const hasCore =
    fs.existsSync(coreDir)

  /**
   * File content
   */
  let content = ''

  /**
   * ==========================================================
   * Vue Types
   * ==========================================================
   */

  content +=
    `import type { App, Plugin } from 'vue'\n\n`

  content += 
    `import 'virtual:uno.css'\nimport './assets/styles/style.scss'\n\n`  

  /**
   * ==========================================================
   * Cody AI Config
   * ==========================================================
   */

  if (hasCore) {
    content +=
      `import { setCodyAIConfig, type CodyAIOptionsType } from './core'\n`
  }

  /**
   * ==========================================================
   * Components
   * ==========================================================
   */

  if (hasComponents) {

    content +=
      `import * as Components from './components'\n\n`
  }

  /**
   * ==========================================================
   * Export Components
   * ==========================================================
   */

  if (hasComponents) {

    content +=
      `export * from './components'\n`
  }

  /**
   * ==========================================================
   * Export Regular modules
   * ==========================================================
   */

  normalDirectories.forEach(name => {

    const dir = path.join(
      srcDir,
      name,
    )

    if (!fs.existsSync(dir)) {
      return
    }

    content +=
      `export * from './${name}'\n`
  })

  /**
   * ==========================================================
   * Export shared
   * ==========================================================
   */

  if (
    fs.existsSync(
      sharedDir,
    )
  ) {

    content +=
      `export * from './shared'\n`
  }

  /**
   * ==========================================================
   * Export core
   *
   * Export setCodyAIConfig / getCodyAIConfig:
   * Hosts (including src/main.ts referencing the built bundle in this repo) must set the config themselves.
   * ==========================================================
   */

  if (hasCore) {

    content +=
      `export * from './core'\n`
  }

  /**
   * ==========================================================
   * Export rete
   *
   * rete is reached through the @docyai/rete alias; src/rete.ts only forwards to the compiled bundle
   * lib/docyai-model/rete.js. Skip when sources are missing and this file is not generated.
   * ==========================================================
   */

  if (
    fs.existsSync(
      path.join(srcDir, 'rete.ts'),
    )
  ) {

    content +=
      `export * from './rete'\n`
  }

  content += `export * from './router'\n\n`

  /**
   * ==========================================================
   * Duplicate-name disambiguation
   *
   * ./rete forwards the compiled rete.js bundle, which also carries components / core
   * exports of the same names (NuxtIcon, AuditPublish, CodyAIOptions*, etc).
   * ESM Duplicate star exports are ignored under ESM; ./components and ./core win at runtime,
   * but TS reports TS2308, so re-export explicitly here per the TS hint.
   * ==========================================================
   */

  if (
    fs.existsSync(
      path.join(srcDir, 'rete.ts'),
    )
  ) {

    content +=
      `export { AuditPublish, NuxtIcon } from './components'\n`

    content +=
      `export { setCodyAIConfig, getCodyAIConfig } from './core'\n`

    content +=
      `export type { CodyAIOptions, CodyAIOptionsType } from './core'\n\n`
  }

  /**
   * ==========================================================
   * Plugin
   * ==========================================================
   */

  content +=
    `const plugin: Plugin<CodyAIOptionsType, any> = {\n`

  content +=
    `  install(app: App, config: CodyAIOptionsType = {}) {\n`

  /**
   * ==========================================================
   * Register components
   * ==========================================================
   */

  if (hasComponents) {

    content +=
      `    Object.entries(Components).forEach(([name, component]) => {\n`

    content +=
      `      if (component) {\n`

    content +=
      `        app.component(name, component as any)\n`

    content +=
      `      }\n`

    content +=
      `    })\n\n`
  }

  /**
   * ==========================================================
   * Token Token validation
   * ==========================================================
   */

  if (hasCore) {

    /**
     * ========================================================
     * Set Cody AI Config
     * ========================================================
     */

    content +=
      `    setCodyAIConfig(config)\n\n`
  }

  /**
   * ==========================================================
   * provide
   * ==========================================================
   */

  content +=
    `    app.provide('CODY_AI_OPTIONS', config)\n`

  content +=
    `  },\n`

  content +=
    `}\n\n`

  /**
   * ==========================================================
   * Default Export
   * ==========================================================
   */

  content +=
    `export default plugin\n`

  /**
   * ==========================================================
   * Write file
   * ==========================================================
   */

  fs.writeFileSync(
    rootIndexPath,
    content,
    'utf8',
  )

  console.log(
    '✅ src/index.ts',
  )
}

/**
 * ============================================================
 * Main flow
 * ============================================================
 */

function generate() {

  console.log(
    '\n🚀 Generating index.ts...\n',
  )

  /**
   * ==========================================================
   * components
   * ==========================================================
   */

  const components = generateComponentsIndex()

  /**
   * ==========================================================
   * Slim rete entry
   * ==========================================================
   */

  generateReteEntry(components)

  /**
   * ==========================================================
   * Regular modules
   * ==========================================================
   */

  normalDirectories.forEach(name => {
    generateDirectoryIndex(name)
  })

  /**
   * ==========================================================
   * shared
   *
   * shared/
   * ├── types/
   * │   └── index.ts
   * ├── utils/
   * │   └── index.ts
   * └── index.ts
   * ==========================================================
   */

  sharedDirectories.forEach(name => {
    generateSharedSubIndex(name)
  })

  generateSharedIndex()

  /**
   * ==========================================================
   * Root entry
   * ==========================================================
   */

  generateRootIndex()

  console.log(
    '\n🎉 All index.ts files generated!\n',
  )
}

/**
 * ============================================================
 * Run
 * ============================================================
 */

generate()
