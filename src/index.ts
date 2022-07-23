export type ClassesArray<K extends string = string> = ClassesArgument<K>[]
export type ClassesFunction<K extends string = string> = () => ClassesArgument<K>
export type ClassesMeta<K extends string = string> = {[T in K]?: any}
export type Primitives = string | symbol | undefined | number | boolean | null
export type ClassesArgument<K extends string = string> = ClassesFunction<K> | Primitives | ClassesMeta<K> | ClassesArray<K>

export const isIterable = typeof Symbol === 'undefined'
  ? (value): value is {[Symbol.iterator]} => Array.isArray(value)
  : (value): value is {[Symbol.iterator]} => Symbol.iterator in value

export function classes <S extends string> (value?: ClassesArgument<S>): string {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'object' && value !== null) {
    let result = ''

    if (isIterable(value)) {
      for (let subValue of value) {
        subValue = classes(subValue)

        if (subValue) {
          result += (result ? ' ' : '') + subValue
        }
      }
    } else {
      for (const key in value) {
        let subValue = value[key]

        while (typeof subValue === 'function') {
          subValue = subValue()
        }

        if (subValue) {
          result += (result ? ' ' : '') + key
        }
      }
    }

    return result
  }

  if (value instanceof Function) {
    return classes(value())
  }

  return ''
}

classes.isIterable = isIterable

export default classes
