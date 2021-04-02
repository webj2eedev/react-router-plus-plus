export type Disposer = () => void
export type Listener<T> = (para?: T) => void
export interface ListenerManager<T> {
    appendListener: (fn: Listener<T>) => Disposer
    notifyListeners: (para?: T) => void
}
export default function createListenerManager<T>(): ListenerManager<T> {
    let listeners: Array<Listener<T>> = []

    function appendListener(fn: Listener<T>): Disposer {
        function listener(para: T) {
            fn(para)
        }

        listeners.push(listener)

        return () => {
            listeners = listeners.filter((item) => item !== listener)
        }
    }

    function notifyListeners(para: T) {
        listeners.forEach((listener) => listener(para))
    }

    return {
        appendListener,
        notifyListeners,
    }
}
