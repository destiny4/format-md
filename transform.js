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
let imgUrl
let dest
if (!program.dest) {
  dest = program.src
} else {
  dest = program.dest
}
const goalPath = path.resolve(process.cwd(), dest)

let str = fs.readFileSync(srcPath, { encoding: 'utf-8' })
let scriptArr = []

str = str.replace(/<img.+?>/gs, function (val) {
  val.replace(/(?<=src=").+?(?=")/, function (url) {
    imgUrl = url
  })
  let ret = `<a data-fancybox  href="${imgUrl}">
  <img src="${imgUrl}"  border="0" />
  </a>`
  return ret
})

if (fs.pathExistsSync(goalPath)) fs.removeSync(goalPath)
fs.outputFileSync(goalPath, str)
