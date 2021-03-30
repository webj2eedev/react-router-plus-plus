import type { RouterError, Route } from '../../types'

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

function createRouterError(from, to, type, message): RouterError {
    const error = new Error(message) as RouterError
    error._isRouter = true
    error.from = from
    error.to = to
    error.type = type

    return error
}
