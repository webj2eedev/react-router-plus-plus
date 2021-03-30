type CallBack = () => void
export function runQueue<T>(queue: Array<T>, iterator: (item: T, next: CallBack) => void, allDone: CallBack): void {
    const step = (index) => {
        if (index >= queue.length) {
            allDone()
        } else {
            if (queue[index]) {
                iterator(queue[index], () => {
                    step(index + 1)
                })
            } else {
                step(index + 1)
            }
        }
    }
    step(0)
}
