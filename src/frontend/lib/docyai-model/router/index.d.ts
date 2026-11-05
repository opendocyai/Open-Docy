import { Router, RouteRecordRaw, NavigationGuard } from 'vue-router';
export interface CreateDocYaiRouterOptions {
    base?: string;
    beforeEach?: NavigationGuard;
}
export declare function getDocYaiRoutes(): RouteRecordRaw[];
export declare function createDocYaiRouter(options?: CreateDocYaiRouterOptions): Router;
export default createDocYaiRouter;
