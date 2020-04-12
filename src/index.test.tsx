import classes from '.'

describe('classes', () => {
  test('empty', () => {
    expect(classes()).toBe('')
    expect(classes(undefined)).toBe('')
    expect(classes(null)).toBe('')
    expect(classes(false)).toBe('')
    expect(classes(true)).toBe('')
    expect(classes(0)).toBe('')
    expect(classes(100)).toBe('')
    expect(classes(-100)).toBe('')
    expect(classes(NaN)).toBe('')
    expect(classes('')).toBe('')
    expect(classes(Symbol('test'))).toBe('')
    expect(classes({})).toBe('')
    expect(classes([])).toBe('')
  })
  test('string', () => {
    expect(classes('test')).toBe('test')
    expect(classes('test1', 'test2')).toBe('test1 test2')
    expect(classes('test1', 'test2', 'test3')).toBe('test1 test2 test3')
  })
  test('array', () => {
    expect(classes(['test'])).toBe('test')
    expect(classes(['test1', 'test2', true])).toBe('test1 test2')
    expect(classes(['test1', ['test2', 'test3', false]])).toBe('test1 test2 test3')
  })
  test('object', () => {
    expect(classes({test: true})).toBe('test')
    expect(classes({test1: true, test2: 1, test3: NaN})).toBe('test1 test2')
    expect(classes({test1: () => true, test2: () => false})).toBe('test1')
  })
  test('function', () => {
    expect(classes(() => 'test')).toBe('test')
    expect(classes(() => ['test1', 'test2'])).toBe('test1 test2')
    expect(classes(() => ({test1: () => true, test2: () => false}))).toBe('test1')
    expect(classes(() => ({test1: () => () => true, test2: () => () => false}))).toBe('test1')
  })
  test('Set', () => {
    expect(classes(new Set(['test1', 'test2']))).toBe('test1 test2')
  })
  test('Map', () => {
    const mapValues = [
      ['test1', false],
      ['', 'test2'],
      [123, null]
    ]
    // @ts-ignore
    const map = new Map(mapValues)
    expect(classes(map)).toBe('test1 test2')
  })
  test('custom', () => {
    class Test {
      *[Symbol.iterator] () {
        let i = 0
        while (i++ < 3) {
          yield `test${i}`
        }
      }
    }
    const test = new Test()
    expect(classes(test)).toBe('test1 test2 test3')
  })
})
