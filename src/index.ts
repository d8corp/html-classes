export default function classes (value?: any, ...other: any[]): string {
  while (typeof value === 'function') {
    value = value()
  }
  if (typeof value === 'object' && value !== null) {
    if (isIterable(value)) {
      const values = value
      value = ''
      for (let subValue of values) {
        subValue = classes(subValue)
        if (subValue) {
          value += (value ? ' ' : '') + subValue
        }
      }
    } else {
      const values = value
      value = ''
      for (const key in values) {
        let subValue = values[key]
        while (typeof subValue === 'function') {
          subValue = subValue()
        }
        if (subValue) {
          value += (value ? ' ' : '') + key
        }
      }
    }
  } else if (typeof value !== 'string') {
    value = ''
  }

  if (other.length) {
    const otherValue = classes(...other)
    if (otherValue) {
      value += (value ? ' ' : '') + otherValue
    }
  }
  return value
}

export function isIterable (value: object): value is any[] {
  return Symbol.iterator in value
}
