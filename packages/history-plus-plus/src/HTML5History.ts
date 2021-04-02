import type {
    HistoryOptions,
    RawLocation,
    Route,
    ErrorHandler,
    TransitionCompleteHandler,
    TransitionAbortHandler,
    NavigationGuard,
    AfterNavigationHook,
} from '../types'
import { normalizeBase } from './utils/base'
import { runQueue } from './utils/async'
import { START } from './utils/route'
import { pushState, replaceState, supportsPushState } from './utils/push-state'
import { cleanPath } from './utils/path'
import {
    createNavigationAbortedError,
    createNavigationDuplicatedError,
    createNavigationRedirectedError,
    createNavigationCancelledError,
    isError,
} from './utils/errors'

import createListenerManager from "./utils/createListenerManager"
import type {ListenerManager, Listener} from "./utils/createListenerManager"


export default class HTML5History {
    base: string
    current: Route
    pending: Route

    beforeHooks: Array<NavigationGuard>
    afterHooks: Array<AfterNavigationHook>
    errorCbs: Array<ErrorHandler>
    private routeChangeListenerManager: ListenerManager<Route>
    private popstateEventListener: {
        dispose: Function
    }

    constructor(options?: HistoryOptions) {
        this.base = normalizeBase(options?.basename)
        this.current = START
        this.pending = null

        this.routeChangeListenerManager = createListenerManager<Route>();
        this.beforeHooks = []
        this.afterHooks = []
        this.errorCbs = []
        this.popstateEventListener = null
    }

    setup(): void {
        if (this.popstateEventListener) {
            return
        }

        const handleRoutingEvent = () => {
            // Avoiding first `popstate` event dispatched in some browsers but first
            // history route not updated since async guard at the same time.
            const location = getLocation(this.base)
            if (this.current === START) {
                return
            }

            this.transitionTo(location)
        }

        window.addEventListener('popstate', handleRoutingEvent)
        this.popstateEventListener = {
            dispose: () => {
                window.removeEventListener('popstate', handleRoutingEvent)
            },
        }
    }
    teardown(): void {
        this.popstateEventListener.dispose()
        this.popstateEventListener = null

        // reset current history route
        this.current = START
        this.pending = null
    }

    getCurrentLocation(): string {
        return getLocation(this.base)
    }

    go(n: number): void {
        window.history.go(n)
    }
    back() {
        this.go(-1)
    }
    forward() {
        this.go(1)
    }

    push(location: RawLocation): Promise<Route>
    push(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): void
    push(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): any {
        if (onComplete == null && onAbort == null) {
            return new Promise((resolve, reject) => {
                this.transitionTo(
                    location,
                    (route) => {
                        pushState(cleanPath(this.base + route.fullPath))
                        resolve && resolve(route)
                    },
                    reject
                )
            })
        } else {
            this.transitionTo(
                location,
                (route) => {
                    pushState(cleanPath(this.base + route.fullPath))
                    onComplete && onComplete(route)
                },
                onAbort
            )
        }
    }

    replace(location: RawLocation): Promise<Route>
    replace(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): void
    replace(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): any {
        if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                this.transitionTo(
                    location,
                    (route) => {
                        replaceState(cleanPath(this.base + route.fullPath))
                        resolve && resolve(route)
                    },
                    reject
                )
            })
        } else {
            this.transitionTo(
                location,
                (route) => {
                    replaceState(cleanPath(this.base + route.fullPath))
                    onComplete && onComplete(route)
                },
                onAbort
            )
        }
    }

    private transitionTo(
        location: RawLocation,
        onComplete?: TransitionCompleteHandler,
        onAbort?: TransitionAbortHandler
    ): void {
        let route
        // catch redirect option https://github.com/vuejs/vue-router/issues/3201
        try {
            route = null // this.router.match(location, this.current) TODO 这里...切换前要进行匹配
        } catch (e) {
            this.errorCbs.forEach((cb) => {
                cb(e)
            })
            // Exception should still be thrown
            throw e
        }

        const prev = this.current

        const handleComplete: TransitionCompleteHandler = (route: Route) => {
            this.updateRoute(route)
            onComplete && onComplete(route)
            this.ensureURL()
            // 调用全局的 afterEach 钩子
            this.afterHooks.forEach((hook) => {
                hook && hook(route, prev)
            })
        }

        const handleAbort: TransitionAbortHandler = (err) => {
            if (onAbort) {
                onAbort(err)
            }
        }

        this.confirmTransition(route, handleComplete, handleAbort)
    }

    private confirmTransition(
        route: Route,
        onComplete: TransitionCompleteHandler,
        onAbort?: TransitionAbortHandler
    ): void {
        const current = this.current
        this.pending = route

        const handleAbort: TransitionAbortHandler = (err) => {
            onAbort && onAbort(err)
        }

        const queue: Array<NavigationGuard> = [].concat(
            // global before hooks
            this.beforeHooks
        )

        if (false) {
            this.ensureURL()
            return handleAbort(createNavigationDuplicatedError(current, route))
        }

        runQueue<NavigationGuard>(
            queue,
            (hook, next) => {
                if (this.pending !== route) {
                    return handleAbort(createNavigationCancelledError(current, route))
                }

                hook(route, current, (to) => {
                    if (to === false) {
                        this.ensureURL(true)
                        handleAbort(createNavigationAbortedError(current, route))
                    } else if (isError(to)) {
                        this.ensureURL(true)
                        handleAbort(to as Error)
                    } else if (
                        typeof to === 'string' ||
                        (typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string'))
                    ) {
                        handleAbort(createNavigationRedirectedError(current, route))
                        if (typeof to === 'object' && to.replace) {
                            this.replace(to)
                        } else {
                            this.push(to)
                        }
                    } else {
                        next()
                    }
                })
            },
            () => {
                this.pending = null
                onComplete(route)
            }
        )
    }

    private updateRoute(route: Route): void {
        this.current = route
        this.routeChangeListenerManager.notifyListeners(route)
    }

    private ensureURL(push?: boolean) {
        if (getLocation(this.base) !== this.current.fullPath) {
            const current = cleanPath(this.base + this.current.fullPath)
            push ? pushState(current) : replaceState(current)
        }
    }

    /**
     * 事件监听
     */
    listen(fn: Listener<Route>): void {
        this.routeChangeListenerManager.appendListener(fn);
    }
    beforeEach(fn: NavigationGuard): () => void {
        return registerHook<NavigationGuard>(this.beforeHooks, fn)
    }
    afterEach(fn: AfterNavigationHook): () => void {
        return registerHook<AfterNavigationHook>(this.afterHooks, fn)
    }
    onError(errorCb: ErrorHandler): void {
        this.errorCbs.push(errorCb)
    }
}

function registerHook<T>(list: Array<T>, fn: T): () => void {
    list.push(fn)
    return () => {
        const i = list.indexOf(fn)
        if (i > -1) list.splice(i, 1)
    }
}

function getLocation(base: string): string {
    let path = window.location.pathname
    if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) {
        path = path.slice(base.length)
    }
    return (path || '/') + window.location.search + window.location.hash
}
