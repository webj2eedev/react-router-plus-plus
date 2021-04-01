import type { QueryObject } from '../../types'
import { stringifyQuery } from './query'

export function getFullPath(
    {
        path = '/',
        query = {},
        hash = '',
    }: {
        path?: string
        query?: QueryObject
        hash?: string
    },
    stringify: typeof stringifyQuery = stringifyQuery
): string {
    return path + stringify(query) + hash
}

export function cleanPath(path: string): string {
    return path.replace(/\/\//g, '/')
}
