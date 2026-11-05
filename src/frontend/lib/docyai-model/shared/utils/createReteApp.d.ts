import { App } from 'vue';
import { Router } from 'vue-router';
export interface CreateReteAppOptions {
    router?: Router;
}
/**
 * Rete editor config
 */
export interface CreateEditorOptions {
    router?: Router;
}
export declare function createReteApp(context: any, options?: CreateReteAppOptions): App;
