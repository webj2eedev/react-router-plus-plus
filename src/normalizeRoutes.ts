import { cloneDeep } from "lodash"
import { join } from "path-browserify"

import winPath from "./utils/winPath"

import type { RouteConfig, RouteConfigs } from "./types"

export default function normalizeRoutes(routes: RouteConfigs) {
    // 避免修改配置里的 routes，导致重复 patch
    let newRoutes = cloneDeep(routes);
    patchRoutes(newRoutes);
    return newRoutes;
}

function patchRoutes(routes: RouteConfigs, parentRoute?: RouteConfig) {
    for (const route of routes) {
        patchRoute(route, parentRoute);
    }
}

function patchRoute(route: RouteConfig, parentRoute?: RouteConfig) {
    // route.path 的修改需要在子路由 patch 之前做
    if (
        route.path &&
        route.path.charAt(0) !== '/' &&
        !/^https?:\/\//.test(route.path)
    ) {
        route.path = winPath(join(parentRoute?.path || '/', route.path));
    }
    if (route.redirect && route.redirect.charAt(0) !== '/') {
        route.redirect = winPath(
            join(parentRoute?.path || '/', route.redirect),
        );
    }

    if (route.children) {
        patchRoutes(route.children, route);
    } else {
        if (!('exact' in route)) {
            // exact by default
            route.exact = true;
        }
    }
}