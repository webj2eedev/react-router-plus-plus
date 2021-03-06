import React from 'react'

export interface RouterError extends Error {
    _isRouter: true
    from: Route
    to: Route
    type: number
}

export type ErrorHandler = (err: Error) => void
export type TransitionAbortHandler = ErrorHandler
export type TransitionCompleteHandler = (route: Route) => void

export type QueryObject = Record<string, string | (string | null)[] | null | undefined>

/*
 *  location
 */
export interface Location {
    name?: string
    path?: string
    hash?: string
    query?: QueryObject
    params?: Record<string, string>
    append?: boolean
    replace?: boolean
}

export type RawLocation = string | Location

/*
 *  Route
 */
export interface Route {
    path: string
    name?: string | null
    hash: string
    query: Record<string, string | (string | null)[]>
    params: Record<string, string>
    fullPath: string
    matched: RouteRecord[]
    redirectedFrom?: string
    meta?: Record<string, any>
}

/*
 *  redirect
 */
export type RedirectOption = RawLocation | ((to: Route) => RawLocation)

/**
 * NavigationGuard
 */
export type NavigationGuardNext = (to?: RawLocation | false | void | Error) => void
export type NavigationGuard = (to: Route, from: Route, next: NavigationGuardNext) => any
export type AfterNavigationHook = (to: Route, from: Route) => any

/**
 * RouteConfig、RouteRecord
 */
export interface PathToRegexpOptions {
    sensitive?: boolean
    strict?: boolean
    end?: boolean
}

type RoutePropsFunction = (route: Route) => Record<string, any>
type RoutePropsOptions = true | Record<string, any> | RoutePropsFunction

export interface RouteConfig {
    path: string
    name?: string
    children?: RouteConfig[]
    redirect?: RedirectOption
    alias?: string | string[]
    meta?: Record<string, any>
    beforeEnter?: NavigationGuard
    caseSensitive?: boolean
    pathToRegexpOptions?: PathToRegexpOptions
    component?: React.ReactElement
    props?: RoutePropsOptions
}

export interface RouteRecord {
    path: string
    regex: RegExp
    component: React.ReactElement
    name?: string
    parent?: RouteRecord
    redirect?: RedirectOption
    matchAs?: string
    meta: Record<string, any>
    beforeEnter?: (route: Route, redirect: (location: RawLocation) => void, next: () => void) => any
    props: RoutePropsOptions
}

/**
 * History
 */
export interface HistoryOptions {
    basename?: string
}

export declare class History {
    base: string

    constructor(options?: HistoryOptions)

    go(n: number): void
    back(): void
    forward(): void

    push(location: RawLocation): Promise<Route>
    push(location: RawLocation, onComplete?: (route: Route) => void, onAbort?: ErrorHandler): void

    replace(location: RawLocation): Promise<Route>
    replace(location: RawLocation, onComplete?: (route: Route) => void, onAbort?: ErrorHandler): void
}
