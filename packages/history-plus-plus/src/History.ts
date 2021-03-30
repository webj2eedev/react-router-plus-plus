import type { HistoryOptions, RawLocation, Route, ErrorHandler } from '../types'
import {normalizeBase} from "./utils/base"
export class History {
    base: string
    current: Route

    constructor(options?: HistoryOptions) {
        this.base = normalizeBase(options?.basename)
        this.current = START
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
    push(
        location: RawLocation,
        onComplete?: (route: Route) => void,
        onAbort?: ErrorHandler
    ): void
    push(
        location: RawLocation,
        onComplete?: (route: Route) => void,
        onAbort?: ErrorHandler
    ): Promise<Route> {
        console.log(location, onComplete, onAbort)
        return null;
    }

    replace(location: RawLocation): Promise<Route>
    replace(
        location: RawLocation,
        onComplete?: (route: Route) => void,
        onAbort?: ErrorHandler
    ): void
    replace(
        location: RawLocation,
        onComplete?: (route: Route) => void,
        onAbort?: ErrorHandler
    ): Promise<Route> {
        console.log(location, onComplete, onAbort)
        return null;
    }
}
