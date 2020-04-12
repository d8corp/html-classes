import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

const def = {
  input: {
    index: 'src/index.ts',
  }
}

export default [{
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs'
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    })
  ]
}, {
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es'
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6'
        }
      }
    })
  ]
}, {
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: 'classes.min.js',
    format: 'iife',
    name: 'classes',
    plugins: [terser()]
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
}]
