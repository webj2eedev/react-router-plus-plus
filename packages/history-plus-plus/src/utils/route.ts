import type { RouteRecord, Route, Location } from '../../types'
import { stringifyQuery } from './query'
import { getFullPath } from './path'
import clone from './clone'

export function createRoute(
    record: RouteRecord,
    location?: Location,
    redirectedFrom?: Location
): Route {
    let query: any = location.query || {}
    try {
        query = clone(query)
    } catch (e) {}

    const route: Route = {
        name: location.name || (record && record.name),
        meta: (record && record.meta) || {},
        path: location.path || '/',
        hash: location.hash || '',
        query,
        params: location.params || {},
        fullPath: getFullPath(location, stringifyQuery),
        matched: record ? formatMatch(record) : [],
    }
    if (redirectedFrom) {
        route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
    }
    return Object.freeze(route)
}

// the starting route that represents the initial state
export const START = createRoute(null, {
    path: '/',
})
