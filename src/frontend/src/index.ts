import type { App, Plugin } from 'vue'

import 'virtual:uno.css'
import './assets/styles/style.scss'

import { setCodyAIConfig, type CodyAIOptionsType } from './core'
import * as Components from './components'

export * from './components'
export * from './client'
export * from './composables'
export * from './utils'
export * from './api'
export * from './stores'
export * from './shared'
export * from './core'
export * from './rete'
export * from './router'

export { AuditPublish, NuxtIcon } from './components'
export { setCodyAIConfig, getCodyAIConfig } from './core'
export type { CodyAIOptions, CodyAIOptionsType } from './core'

const plugin: Plugin<CodyAIOptionsType, any> = {
  install(app: App, config: CodyAIOptionsType = {}) {
    Object.entries(Components).forEach(([name, component]) => {
      if (component) {
        app.component(name, component as any)
      }
    })

    setCodyAIConfig(config)

    app.provide('CODY_AI_OPTIONS', config)
  },
}

export default plugin
