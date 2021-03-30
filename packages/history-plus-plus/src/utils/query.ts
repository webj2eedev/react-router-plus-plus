import type {QueryObject} from "../../types"

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = (c) => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g
const encode = (str) =>
    encodeURIComponent(str)
        .replace(encodeReserveRE, encodeReserveReplacer)
        .replace(commaRE, ',')


export function stringifyQuery(obj: QueryObject): string {
    const res = obj
        ? Object.keys(obj)
              .map((key) => {
                  const val = obj[key]

                  if (val === undefined) {
                      return ''
                  }

                  if (val === null) {
                      return encode(key)
                  }

                  if (Array.isArray(val)) {
                      const result = []
                      val.forEach((val2) => {
                          if (val2 === undefined) {
                              return
                          }
                          if (val2 === null) {
                              result.push(encode(key))
                          } else {
                              result.push(encode(key) + '=' + encode(val2))
                          }
                      })
                      return result.join('&')
                  }

                  return encode(key) + '=' + encode(val)
              })
              .filter((x) => x.length > 0)
              .join('&')
        : null
    return res ? `?${res}` : ''
}
