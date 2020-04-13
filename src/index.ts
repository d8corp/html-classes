function classes (...values: any[]): string
function classes () {
  let value = arguments[0]
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
  }
  else if (typeof value !== 'string') {
    value = ''
  }

  for (let i = 1; i < arguments.length; i++) {
    const subValue = classes(arguments[i])
    if (subValue) {
      value += (value ? ' ' : '') + subValue
    }
  }

  return value
}

function isIterable (value: object): value is any[] {
  return 'Symbol' in window ? Symbol.iterator in value : Array.isArray(value)
}

classes.isIterable = isIterable

export default classes
