#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const program = require('commander')
const pkg = require('./package.json')
program
  .version(pkg.version)
  .option('-s, --src [value]', 'source file')
  .option(
    '-d, --dest [value]',
    'destination file,如果不提供该参数，默认覆盖源文件'
  )
  .option('-p, --split', '英文两边是否添加空格，默认false')
  .parse(process.argv)
const srcPath = path.resolve(process.cwd(), program.src)
let dest
if (!program.dest) {
  dest = program.src
} else {
  dest = program.dest
}
const goalPath = path.resolve(process.cwd(), dest)

let str = fs.readFileSync(srcPath, { encoding: 'utf-8' })
let scriptArr = []
let imageArr = []
let noNeedArr = []

str = str.replace(/```.*?```/gs, function (val) {
  scriptArr.push(val)
  return '#**#'
})
str = str.replace(/\[.*\]\(.*\)/g, function (val) {
  imageArr.push(val)
  return '$$&&'
})
str = str.replace(/`.+?`/g, function (val) {
  noNeedArr.push(val)
  return '$&&$'
})
str=str.replace(/\n\n/g,'\n')
const arr = str.split('\n')
let arr1 = []
const bestReg=/([<\(\-_@$`&\!.{\/]*[a-z]{1}[<>\[\]\w\-\d\.\,\+:\@`\?\/\s{}#&\$\*\\\(\)=;"]*[a-z]+([;,]?[\}`\(\)">\{\s]+)?([\.]{2,})?)|[a-z]/gi
for (let i = 0; i < arr.length; i++) {
  let item = arr[i]
  if (item.indexOf('#') === 0) {
    arr1.push(item)
    continue
  }
  if (program.split) {
    item = item.replace(
      bestReg,
      function (val) {
        const reg = /(\$&&\$)|(#\*\*#)|(\$\$&&)|(<br.*?>)/
        if (reg.test(val)) {
          let split = ''
          val = val.replace(/((\$&&\$)|(#\*\*#)|(\$\$&&)|(<br.*?>))/, function (
            real
          ) {
            split = real
            return real
          })
          let arr = val.split(split)
          let arr1 = arr.map(item => {
            item = ' `' + item + '` '
            return item
          })
          val = arr1.join(` ${split} `)
        } else {
          val = ' `' + val + '` '
        }
        return val
      }
    )
  } else {
    item = item.replace(
      bestReg,
      function (val) {
        const reg = /(\$&&\$)|(#\*\*#)|(\$\$&&)|(<br.*?>)/
        if (reg.test(val)) {
          let split = ''
          val = val.replace(/((\$&&\$)|(#\*\*#)|(\$\$&&)|(<br.*?>))/, function (
            real
          ) {
            split = real
            return real
          })
          let arr = val.split(split)
          let arr1 = arr.map(item => {
            item = '`' + item + '`'
            return item
          })
          val = arr1.join(` ${split} `)
        } else {
          val = '`' + val + '`'
        }
        return val
      }
    )
  }
  arr1.push(item)
}
str = arr1.join('\n')
scriptArr.forEach(function (item) {
  str = str.replace('#**#', item)
})
imageArr.forEach(function (item) {
  str = str.replace('$$&&', item)
})
noNeedArr.forEach(function (item) {
  str = str.replace('$&&$', function (val) {
    return item
  })
})
if (fs.pathExistsSync(goalPath)) fs.removeSync(goalPath)
fs.outputFileSync(goalPath, str)
