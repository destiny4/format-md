## 介绍

在写md文档的过程中，难免会遇到一些英文单词，为了给读者更好的阅读体验，我们都会给英文加上反引号，以突出显示，但是有时候可能会忘记，或者英文太多了，格式化比较麻烦，所以就有了这个工具。

## 安装

```shell
npm i krystal -g
```

## 使用

> 提示命令

```shell
krystal -h
```

> 命令说明

- -V 显示版本
- -s [源路径] 
- -d [目标路径] 如果不提供该参数，默认覆盖源文件
- -p 英文两边是否添加空格，默认false

`eg`

```shell
krystal -s demo.md -d dest.md
```

上面的命令会格式化`demo.md`里面的英文，并生成`dest.md`文件

```shell
krystal -s demo.md -d dest.md -p
```

上述命令，会在格式化的时候，在英文两边添加空格

```shell
krystal -s demo.md 
```

上述命令会在格式化之后，覆盖`demo.md`

