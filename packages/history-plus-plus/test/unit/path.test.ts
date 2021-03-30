import { getFullPath } from '../../src/utils/path'

describe('path', () => {
    test('normalizeBase', async () => {
        expect(getFullPath({
            path: "/",
            query: {},
            hash:""
        })).toBe('/');

        expect(getFullPath({
            path: "/foo",
            query: {
                p1: undefined,
                p2: null,
                p3: "v3",
                p4: ["v4-1", "v4-2"]
            },
            hash:""
        })).toBe('/foo?p2&p3=v3&p4=v4-1&p4=v4-2');
    })
})
