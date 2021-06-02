# 5 为应用开发做准备
- 除非出于原型展示或测试`JSX`的目的，否则对于任何开发与发布流程，都应该设置构建流程。如果你已经拥有一套现成的构建流程，只需要再添加`Babel`转换的步骤就可以了
## 一个模板应用
### 文件和目录

- 建立`/css`、`/js`和`/images`文件夹用于存放静态资源，然后通过`index.html`文件把静态资源关联起来
- `/js/source`（使用`JSX`语法编写的脚本）和`/js/build`（源代码经过转译后，浏览器可以运行的脚本）。另外，我们还建立了`/scripts`目录，用于存放构建过程用到的命令行脚本
![image-20210531191100914](https://pic-1251136242.file.myqcloud.com/imgs/2021-05-31-111101.png)
- 进一步划分`/css`和`/js`目录
1. 在整个应用中通用的文件
2. 与某个特定组件相关的文件
![image-20210531191136718](https://pic-1251136242.file.myqcloud.com/imgs/2021-05-31-111136.png)
### index.html
- `index.html`文件引入如下内容
1. 所有`CSS`文件打包生成的单个`bundle.css`文件
2. 所有`JavaScript`文件打包生成的单个`bundle.js`文件
3. 放置应用渲染的容器`<div id="app">`
```html
<!DOCTYPE html>
<html>
  <head>
    <title>hello React</title>
    <link rel="stylesheet" type="text/css" href="bundle.css">
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app">
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```
- 单一`.css`和单一`.js`的文件组织形式适用于大部分应用。但当你的应用规模接近`Facebook`和`Twitter`时，初始化加载这些脚本就会非常耗时，而且用户可能不需要一开始就用到所有功能。这时你可以建立一个脚本/资源加载器，使得代码可以按需加载
### CSS
- 全局作用的样式文件`/css/app.css`包含整个应用的通用样式
```css
html {
  background-color: #f0f0f0;
  font: 16px Arial;
}
```
- 约定每个组件对应一个`CSS`文件和一个`JavaScript`文件，放置在`/css/components`和`/js/components`。现在我们来实现`/css/component/Logo.css`文件
```css
.Logo {
  background-image: url('../../images/wp-logo2.png');
  background-repeat: no-repeat;
  display: inline-block;
  height: 80px;
  vertical-align: middle;
  width: 111px;
}
```
- 在保持组件名称首字母在确定的同时，还要给组件的顶层元素设置和该组件名相同的类名，在这里对应为`className="Logo"`
### JavaScript
- 应用的入口处是`/js/source/app.js`脚本文件。入口文件是所有逻辑开始的地方
```js
ReactDOM.render(
  <h1>
  	<Logo /> Welcome to App!
  </h1>,
  document.getElementById('app')
);
```
- 在`/js/source/components/Logo.js`
```js
var Logo = React.createClass({
  render: function () {
    return <div className="Logo" />
  }
})
```
### 更现代化的JavaScript
- 出于方便起见，让`React`和`ReactDOM`暴露为全局变量。但当你的应用变得复杂，且组件数量越来越多的时候，你就需要使用更好的代码组织形式。这是因为暴露全局变量是有风险的（往往会导致命名冲突），一直依赖全局变量也并不安全
#### 模块化
- `CommonJS`广泛接受的方案。在`CommonJS`中，假如你在一个文件中编写了逻辑，就可以导出（`export`）一个或多个符号（最常见的是对象，不过也可以是函数，甚至是单独的变量）
```js
var Logo = React.createClass({/* ... */});
module.exports = Logo;
```
- 通常约定：一个模块只导出一个内容（比如一个`React`组件）
```js
var React = require('react');
var Logo = React.createClass({/* ... */});
module.exports = Logo;
```
#### ECMAScript模块
- 建议延续了这种模块化思想，并引入了一种新语法（与`require()`和`module.exports`相对）。使用这种新语法，`Babel`会帮你将其转译为浏览器可以识别的旧语法
- 在定义其他模块的依赖关系时，可以把
```js
var React = require('react')
```
- 改为
```js
import React from 'react';
```
- 在导出模块内容时，可以把
```js
module.exports = Logo;
```
- 改为
```js
export default Logo
```
#### 类
- 引入了类概念，因此使用可以新的语法
- 修改前
```js
var Logo = React.createClass({/* ... */});
```
- 修改后
```js
class Logo extends React.Component {/* ... */}
```
1. 对象中没有定义属性，只有函数（方法）。如果需要定义属性，可以在构建函数中通过`this`关键字定义
2. 方法通过`render() {}`定义，不需要在前面添加`function`关键字
3. 方法之间不需要像这样使用逗号分隔
```js
var obj = {a: 1, b: 2};
```

```js
class Logo extends React.Component {
  someMethod() {
    
  } // 此处不需要添加逗号
  
  another() { // 此处不需要添加function关键字
    
  }
  
  render() {
    return <div className="Logo" />;
  }
}
```
#### 概括
- 模板中已经包含了
1. `index.html`
2. 全局`CSS`样式`(app.css)`
3. 每个组件独立的`CSS`样式`(/css/components/Logo.css)`
4. `JavaScript`代码的入口`(app.js)`
5. 按照`React`组件划分的具体模块`(/js/source/components/Logo.js)`
> `app.js`
```js
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';

ReactDOM.render(
  <h1>
    <Logo />Welcome to The App!
  </h1>,
  document.getElementById('app')
);
```
> `Logo.js`
```js
import React from 'react';

class Logo extends React.Component {
  render() {
    return <div className="Logo" />;
  }
}

export default Logo
```
- 导入`React`库和导入`Logo`组件时区别
1. 前者是从一个共享目录导入依赖
2. 后者从相对路径中导入依赖
## 安装必备工具
- 要让`index.html`打开后能显示预期效果，需要预先完成以下工作
1. 创建`bundle.css`。这个文件只是简单地拼接`CSS`，因此不需要依赖安装其他工具
2. 让代码在浏览器中可读。你需要使用`Babel`进行转译
3. 创建`bundle.js`。我们使用`Browserify`完成这项工作
- `Browserify`完成以下任务
1. 解析并引入所有依赖。你只需要告诉它`app.js`的位置，它就能找出所有的依赖
2. 引入一个`CommonJS`实现，以保证`require()`调用可以在浏览器中正常工作。`Babel`会把所有的`import`语句转化为`require()`函数调用
- 需要事先安装`Babel`和`Browserify`。可以通过`npm`安装
### Browserify
```shell
npm install --global browserify
browserify --version
```
### Babel
```shell
npm install --global babel-cli
babel --version
```
- 推荐在项目本地安装`node`包（去掉上述例子中`--global`）。在全局范围安装能方便你在全局范围通过命令行界面进行访问
### React相关
- 最后还需要安装几个`React`相关的依赖包
1. `react`
2. `react-dom`
3. `Babel-preset-react`，让`Babel`支持`JSX`以及其他`React`语法
4. `babel-preset-es2015`，提供了对新版本`JavaScript`特性的支持
```shell
npm install --save-dev react
npm install --save-dev react-dom
npm install --save-dev babel-preset-react
npm install --save-dev babel-preset-es2015
```
- 应用目录中出现了一个`node_modules`目录，其中包含本地安装的包及其依赖包。前面两个全局安装的模块（`Babel`和`Browserify`）放在了另一个`node_modules`目录中
## 开始构建
- 构建过程需要完成三件事情
1. `CSS`拼接
2. `JavaScript`转译
3. `JavaScript`打包
- 这三个过程都很简单，只需运行三条命令即可
### 转译JavaScript
```shell
$ babel --presets react,es2015 js/source -d js/build
js/source/app.js -> js/build/app.js
js/source/components/Logo.js -> js/build/components/Logo.js
```
### 打包JavaScript
```shell
$ browserify js/build/app.js -o bundle.js
```
- 应用入口为`js/build/app.js`，找出其中所有依赖并把结果输出到文件`bundle.js`中。最后在`index.html`结尾处引入这个文件。要检查输出文件的内容，可以输入`less bundle.js`
### 打包CSS
- 只需要把所有的`CSS`文件拼接成一个就可以了（使用`cat`命令）。可是，由于移动了文件路径，`CSS`中原有的图像路径会失效，因此我们还需要使用`sed`命令简单地进行替换
```shell
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
```
### 大功告成
- 访问`index.html`文件

### 在开发过程中构建
- 可以通过脚本监听目录中的文件改变，并自动运行构建脚本
- 我们把构建过程用到的三条命令放到一个文件中，并命名为`scripts/build.sh`
```shell
# js transform
babel --presets react,es2015 js/source/ -d js/build
# js package
browserify js/build/app.js -o bundle.js
# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# done
date; echo;
```
- 安装一个名为`watch`的`NPM`包
```shell
npm install --global watch
```
- 运行`watch`命令对`js/source`和`/css`目录中的什么问题更改进行监听
> `scripts/build.sh`
```shell
$ watch "sh scripts/build.sh" js/source css
```
## 发布
- 还需要做一些额外的处理，比如代码压缩和图像优化
- 常用的`JavaScript`压缩工具`uglify`和`CSS`压缩工具`cssshrink`为例，实现一套简单的发布流程。你可以在此基础上压缩`HTML`代码、优化图像、复制文件到`CDN`
- 安装`uglify`
```shell
$ npm install --global uglify
```
- 安装`cssshrink`
```shell
$ npm install --global cssshrink
```

> `scripts/deploy.sh`文件内容如下
>
> `uglify`执行不报错，但不生成文件
>
> `cssshrink`运行报错
```shell
# cleanup last version
rm -rf __deployme
mkdir __deployme

# build
sh scripts/build.sh

# minify js
uglify -s bundle.js -o __deployme/bundle.js
# minify css
cssshrink bundle.css > __deployme/bundle.css
# copy html and images
cp index.html __deployme/index.html
cp -r images/ __deployme/images/

# done
date; echo;
```

## 更进一步


