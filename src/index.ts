export type ClassesArgument = (() => ClassesArgument) | string | {[key: string]: any} | ClassesArgument[]

function classes (value: any): string {
  let valueType
  while ((valueType = typeof value) === 'function') {
    value = value()
  }
  if (valueType === 'object' && value !== null) {
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
  } else if (valueType !== 'string') {
    return ''
  }

  return value
}

function htmlClasses (...values: ClassesArgument[]): string
function htmlClasses (...values: any[]): string
function htmlClasses (): string {
  let value = ''
  for (let i = 0; i < arguments.length; i++) {
    const subValue = classes(arguments[i])
    if (subValue) {
      value += (value ? ' ' : '') + subValue
    }
  }
  return value
}

const isIterable = typeof Symbol === 'undefined' ? value => Array.isArray(value) : value => Symbol.iterator in value

htmlClasses.isIterable = isIterable
htmlClasses.classes = classes

export default htmlClasses
