import type {NavigationGuard} from "./types"

export default class PPRouter {

    beforeHooks: Array<?NavigationGuard>
    resolveHooks: Array<?NavigationGuard>
    afterHooks: Array<?AfterNavigationHook>

    constructor(/*options: RouterOptions = {}*/) {
        this.beforeHooks = []
        this.resolveHooks = []
        this.afterHooks = []
    }


    beforeEach(fn: Function): Function {
        return registerHook(this.beforeHooks, fn)
    }

    beforeResolve(fn: Function): Function {
        return registerHook(this.resolveHooks, fn)
    }

    afterEach(fn: Function): Function {
        return registerHook(this.afterHooks, fn)
    }
}

function registerHook(list: Array<any>, fn: Function): Function {
    list.push(fn)
    return () => {
        const i = list.indexOf(fn)
        if (i > -1) list.splice(i, 1)
    }
}