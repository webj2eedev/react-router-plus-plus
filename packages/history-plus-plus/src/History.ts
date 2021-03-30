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
import { createNavigationAbortedError } from './utils/errors'

export class History {
    base: string
    current: Route
    pending: Route

    cb: (r: Route) => void //
    beforeHooks: Array<NavigationGuard>
    afterHooks: Array<AfterNavigationHook>
    errorCbs: Array<ErrorHandler>

    constructor(options?: HistoryOptions) {
        this.base = normalizeBase(options?.basename)
        this.current = START
        this.pending = null

        this.errorCbs = []

        this.beforeHooks = []
        this.afterHooks = []
    }

    go(n: number): void {
        console.log(n)
    }

    back(): void {
        console.log(1)
    }

    forward(): void {
        console.log(1)
    }

    push(location: RawLocation): Promise<Route>
    push(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): void
    push(
        location: RawLocation,
        onComplete?: TransitionCompleteHandler,
        onAbort?: TransitionAbortHandler
    ): Promise<Route> {
        console.log(location, onComplete, onAbort)
        return null
    }

    replace(location: RawLocation): Promise<Route>
    replace(location: RawLocation, onComplete?: TransitionCompleteHandler, onAbort?: TransitionAbortHandler): void
    replace(
        location: RawLocation,
        onComplete?: TransitionCompleteHandler,
        onAbort?: TransitionAbortHandler
    ): Promise<Route> {
        console.log(location, onComplete, onAbort)
        return null
    }

    transitionTo(
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

    confirmTransition(route: Route, onComplete: TransitionCompleteHandler, onAbort?: TransitionAbortHandler) {
        const current = this.current
        this.pending = route

        const handleAbort: TransitionAbortHandler = (err) => {
            onAbort && onAbort(err)
        }

        const queue = []

        runQueue<NavigationGuard>(
            queue,
            (hook, next) => {
                hook(route, current, (to) => {
                    if (to === false) {
                        handleAbort(createNavigationAbortedError(current, route))
                    }
                })
                next()
            },
            () => {
                this.pending = null
                onComplete(route)
            }
        )
    }

    updateRoute(route: Route) {
        this.current = route
        this.cb && this.cb(route)
    }

    /**
     * 事件监听
     */
    listen(cb: (r: Route) => void): void {
        this.cb = cb
    }
    onError(errorCb: ErrorHandler): void {
        this.errorCbs.push(errorCb)
    }
}

function registerHook(list: Array<any>, fn: Function): Function {
    list.push(fn)
    return () => {
        const i = list.indexOf(fn)
        if (i > -1) list.splice(i, 1)
    }
}
