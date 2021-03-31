import type { RouterError, Route } from '../../types'

/**
 * private
 */
function stringifyRoute(to) {
    const propertiesToLog = ['params', 'query', 'hash']

    if (typeof to === 'string') return to
    if ('path' in to) return to.path
    const location = {}
    propertiesToLog.forEach((key) => {
        if (key in to) location[key] = to[key]
    })
    return JSON.stringify(location, null, 2)
}

export const NavigationFailureType = {
    redirected: 2,
    aborted: 4,
    cancelled: 8,
    duplicated: 16,
}

export function createNavigationAbortedError(from: Route, to: Route): RouterError {
    return createRouterError(
        from,
        to,
        NavigationFailureType.aborted,
        `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`
    )
}

export function createNavigationDuplicatedError(from: Route, to: Route): RouterError {
    const error = createRouterError(
        from,
        to,
        NavigationFailureType.duplicated,
        `Avoided redundant navigation to current location: "${from.fullPath}".`
    )
    return error
}

export function createNavigationRedirectedError(from: Route, to: Route): RouterError {
    return createRouterError(
        from,
        to,
        NavigationFailureType.redirected,
        `Redirected when going from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`
    )
}

export function createNavigationCancelledError(from: Route, to: Route): RouterError {
    return createRouterError(
        from,
        to,
        NavigationFailureType.cancelled,
        `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`
    )
}

function createRouterError(from: Route, to: Route, type:number, message:string): RouterError {
    const error = new Error(message) as RouterError
    error._isRouter = true
    error.from = from
    error.to = to
    error.type = type

    return error
}

export function isError(err: any): boolean {
    return Object.prototype.toString.call(err).indexOf('Error') > -1
}
