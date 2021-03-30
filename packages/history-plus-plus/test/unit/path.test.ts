import { getFullPath } from '../../src/utils/path'

describe('path', () => {
    test('normalizeBase', async () => {
        expect(getFullPath({
            path: "",
            query: {},
            hash:""
        })).toBe('/');
    })
})
