import { normalizeBase } from '../../src/utils/base'

describe('base', () => {
    test('normalizeBase', async () => {
        expect(normalizeBase('/foo/')).toBe('/foo');
        expect(normalizeBase('foo')).toBe('/foo')
        expect(normalizeBase('foo/')).toBe('/foo')
    })
})
