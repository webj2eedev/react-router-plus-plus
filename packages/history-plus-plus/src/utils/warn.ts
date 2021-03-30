export function assert(condition: string | boolean, message: string): void {
    if (!condition) {
        throw new Error(`[history++] ${message}`)
    }
}

export function warn(condition: string | boolean, message: string): void {
    if (process.env.NODE_ENV !== 'production' && !condition) {
        console.warn(`[history++] ${message}`)
    }
}
