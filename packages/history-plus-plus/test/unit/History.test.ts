import { History } from '../../src'

describe('History', () => {
    test('normalizeBase', async () => {
        const mockOnComplete = jest.fn()
        const mockOnAbort = jest.fn()
        const mockListener = jest.fn()

        const history = new History()
        history.listen(mockListener)
        history.confirmTransition(null, mockOnComplete, mockOnAbort);

        expect(mockOnComplete).toHaveBeenCalledWith(null);
        expect(mockListener).toHaveBeenCalledWith(null);

    })
})
