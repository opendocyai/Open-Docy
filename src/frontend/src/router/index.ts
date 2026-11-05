import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
  type NavigationGuard,
} from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";

import middlewareMap from "@/middleware";

export interface CreateDocYaiRouterOptions {
  base?: string;

  beforeEach?: NavigationGuard;
}

export function getDocYaiRoutes(): RouteRecordRaw[] {
  return routes;
}

export function createDocYaiRouter(
  options: CreateDocYaiRouterOptions = {},
): Router {
  const router = createRouter({
    history: createWebHistory(options.base),
    routes,
  });

  if (import.meta.hot) {
    handleHotUpdate(router);
  }

  router.beforeEach(async (to, from) => {
    const title = to.meta.title;
    if (title) {
      document.title = `${title}`;
    }

    const auth = await to.meta.auth;
    if (auth === false) {
      return true;
    } else {
      const result = await middlewareMap?.["auth"]?.(to, from);
      if (result !== undefined) return result;
    }

    const middleware = to.meta.middleware;

    if (!middleware) {
      return true;
    } else {
      if (typeof middleware === "function") {
        return middleware(to, from);
      }

      const list = Array.isArray(middleware) ? middleware : [middleware];

      for (const item of list) {
        if (typeof item === "string") {
          const fn = middlewareMap[item as keyof typeof middlewareMap];
          if (!fn) {
            console.warn(`Middleware "${item}" not found`);
            continue;
          }
          const result = await fn(to, from);
          if (result !== undefined) return result;
        }
      }
    }

    return true;
  });

  if (options.beforeEach) {
    router.beforeEach(options.beforeEach);
  }

  return router;
}

export default createDocYaiRouter;
