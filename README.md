# html-classes
[![NPM](https://img.shields.io/npm/v/html-classes.svg)](https://www.npmjs.com/package/html-classes)
![minzipped size](https://img.shields.io/bundlephobia/minzip/html-classes)
![downloads](https://img.shields.io/npm/dm/html-classes.svg)
![license](https://img.shields.io/npm/l/html-classes)  
This is the simple converter from any type to string of HTML classes.
## Installation
```bash
npm i html-classes
# or
yarn add html-classes
```
Or you can use [minified file](https://github.com/d8corp/html-classes/blob/master/lib/classes.min.js).
```html
<!doctype html>
<html>
  <head>
    <script src="classes.min.js"></script>
  </head>
  <body>
    <script>
      console.log(classes('test'))
    </script>
  </body>
</html>
```
## Using
##### String
Any string value provides as is.
```javascript
classes('test')
// 'test'

classes('test1', 'test2')
// 'test1 test2'
```
##### Array
Any array spreads like the `flat` method of an array.
```javascript
classes(['test'])
// 'test'

classes(['test1', 'test2'])
// 'test1 test2'

classes(['test1', ['test2']], 'test3')
// 'test1 test2 test3'
```
##### Object
The key of the object will be used as a class when the value equals true.
```javascript
classes({test: true})
// 'test'

classes({test1: true, test2: 1, test3: NaN})
// 'test1 test2'

classes({test1: () => true, test2: () => false})
// 'test1'
```
> The last example works that 'cause of the next definition.
##### Function
Any function will be called.
```javascript
classes(() => 'test')
// 'test'

classes(() => ['test1', 'test2'])
// 'test1 test2'

classes(() => ({test1: () => () => true, test2: () => () => false}))
// 'test1'
```
##### Class
Any instance of class will be handled the same as an object.
```javascript
class Custom {
  test1 () {
    return true
  }
  test2 () {
    return false
  }
  get test3 () {
    return true
  }
  dynamicTest = true
}

classes(new Custom())
// 'dynamicTest test1 test3'
```
##### Other
Any other type will be ignored.
```javascript
classes() // ''
classes(undefined) // ''
classes(null) // ''
classes(false) // ''
classes(true) // ''
classes(0) // ''
classes(-1) // ''
classes(1) // ''
classes(NaN) // ''
classes(Symbol('test')) // ''
```
##### ES6
For the [ES6](https://github.com/d8corp/html-classes/blob/master/lib/es6.js) version, you can use iterable functionality.   
If the type can be iterable then `html-classes` goes through values.
```javascript
classes(new Set(['test1', 'test2']))
// 'test1 test2'

classes(new Map([
  ['test1', false],
  ['', 'test2'],
  [undefined, null]
]))
// 'test1 test2'

class Test {
  *[Symbol.iterator] () {
    let i = 0
    while (i++ < 3) {
      yield `test${i}`
    }
  }
}

classes(new Test())
// 'test1 test2 test3'
```
##### Performance  
You can look at [performance test](https://jsperf.com/classnames-vs-htmlclasses) vs [classnames](https://www.npmjs.com/package/classnames).  
Also you can look at [performance test](https://jsperf.com/classnames-vs-html-classes-vs-merge-class-names) vs [merge-class-names](https://www.npmjs.com/package/merge-class-names).  
Check on the different browsers.  

If you are going to use the function to handle only one argument you should keep in mind that the argument often maybe just a string.
```javascript
function createElement (type, classNames = '') {
  const element = document.createElement(type)
  if (classes) {
    element.className = classes(classNames)
  }
  return element
}
```
[This test](https://jsperf.com/classnames-vs-html-classes-vs-merge-class-names-test1) shows the difference between the above libraries.
## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/html-classes/issues)  

[![downloads](https://img.shields.io/github/stars/d8corp/html-classes?style=social)](https://github.com/d8corp/html-classes)
[![downloads](https://img.shields.io/github/watchers/d8corp/html-classes?style=social)](https://github.com/d8corp/html-classes)
