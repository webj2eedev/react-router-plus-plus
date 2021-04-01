import { HTML5History } from '../../src'

describe('HTML5History', () => {
    test('normalizeBase', async () => {
        const mockOnComplete = jest.fn()
        const mockOnAbort = jest.fn()
        const mockListener = jest.fn()

        const history = new HTML5History()
        history.listen(mockListener)
        history.transitionTo(null, mockOnComplete, mockOnAbort);

        expect(mockOnComplete).toHaveBeenCalledWith(null);
        expect(mockListener).toHaveBeenCalledWith(null);

    })
})
