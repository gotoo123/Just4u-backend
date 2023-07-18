## 随笔记

* NPM 换源指令
  - npm config set registry https://registry.npm.taobao.org
  - npm config set registry https://registry.npmjs.org
  - npm get registry

+ 正则中 \* 的用法 (返回 0 次及 0 次以上的匹配)

  reg = /bo\*/;

  - 'b' -> 'b'

  - 'bo' -> 'bo'

  - 'boooo' -> 'boooo'

  - 'bbo' -> 'b' (重点)

  Reg = /b\*/

  - 'shabi' -> '' (重点) [只能匹配以 b 开头的 0-n 次]

  '\t\t#item'.match(/(\t)\*/) => ['\t\t', '\t', index:0, input:'\t\t#item', groups: undefined]

  '#item\t\t'.match(/(\t)\*/) => ['', undefined, index: 0, input: '#item\t\t', groups: undefined]

* DOM attribute 和 property

  - property 是 attribute 对应的 dom 节点的对象属性
  - attribute 始终会保持 html 代码中的初始值，而 property 是有可能变化的
  - <https://zhuanlan.zhihu.com/p/70671215>

+ HOOK 技术

  把系统的程序拉出来变成我们自己执行代码片段。

* css 实现竖线

  - 使用 borer-right，border-left
  - 使用伪元素 content: ''; width: 1px; background: red;
  - 使用内外阴影 box-shadow: inset 1xp 0 red; / box-shadow: -1px 0 red;
  - 使用 drop-shadow ： filter: drop-shadow(-5px 0 0 red);
  - 渐变 inearGradient: background-color: inear-gradient(90deg, red 0, red 5px, transparent 5px);

+ Amis: 一个低代码前端框架，使用 JSON 配置来生成页面，减少页面的开发工作量
  - JSON 配置使得 amis 更适合做有大量常见 UI 组件的页面，不适合大量自定义 UI
  - 无法较好实现需要依赖原生 DOM 实现大量交互的复杂前端功能

* 横线转驼峰

  ```js
  let camelizeRE = /-(\w)/g;
  ```

+ 驼峰转横线

  ```js
  let hyphenateRE = /\B([A-Z])/g;
  ```

* NPM version 和 tag

  ```bash
  // 查看当前的tag和对应的version
  npm dist-tag ls

  // 查看my-package发布过的所有版本号
  npm view my-package versions

  // 给my-package设置对应的tag, 对应到版本version
  npm dist-tag add my-package@version tag
  // eg:
  npm dist-tag add my-package@1.0.0 latest
  npm dist-tag add my-package@1.0.0-alpha.1 next

  ```

+ export 和 module.exports

  <https://www.cnblogs.com/kreo/p/11069640.html>

  ```js
  // ----ES6----
  // 第一种方式
  export const a = 1;

  // 第二种方式
  const a = 1;
  const b = 2;
  export {a, b};

  // 第三种方式
  const a = 1;
  export {x as a};

  import { xx } from './example' // 逐一加载
  import * as xxx from './example' // 整体加载

  // 第四种（用户只想使用接口，而不去关心源码）
  export default function example(){
   	console.log('foo');
  }

  // ----CommonJS----
  const x = 1;
  const add = function (){
    console.log('hello');
  }
  module.exports.x = x;
  module.exports.add = add;

  var example = require('./example.js');
  console.log(example.x);
  console.log(example.add);

  ```

* 当我们在文件中引入 npm 包时，npm 搜索会从当前目录的 node_modules 中找，找不到，就往上一级 node_modules 中找，直到找到根目录仍未查找到，才会报错。

+ inline-block 元素设置 overflow: hidden 后， 会使其 baseline 强制修改为元素下边外沿，通常元素会升高。

  解决方法：在该元素或其父元素上设置 vertical-align: bottom;

* redis 利用内存存储，而 mysql 也有缓存：

  - mysql 的缓存是本地缓存，如果服务器分布式，只是在一台服务器上有缓存

  - mysql 表的结构或内容发生变化，缓存查询不再有效

  - > https://blog.csdn.net/weixin_42659196/article/details/115926725

+ 冒泡和捕获 (https://www.cnblogs.com/WangYujie1994/p/10246100.html)

  - 先捕获，后冒泡
  - onclick 是默认冒泡，而 addEventListener 第三个参数可以设置捕获还是冒泡
  - 冒泡 --> 事件委托
    - target： 触发事件的对象（dom）
    - currentTarge： 始终指向事件绑定的对象（dom）
    - 如果没有事件冒泡， e.currentTargert 与 e.target 都是一样的

* React 事件处理函数传参

  - onClick={e => handleClick('haha', e)}
    - handleClick(val, e){}
  - onClick={this.handleClick.bind(this, 'haha')}
    - handleClick(val, e){}
    - 要在处理函数中读 event，只需在参数列表最后一项加上 e 即可

+ React 中的 key 放在就近数组的上下文中才有意义

  - 一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。
  - key 只是在兄弟节点之中需要唯一
  - key 会传递信息给 React，但不会传递给组件。如果组件需要使用 key 的属性，那必须使用其他属性名显示传递这个值。

* v-if 和 v-show

  - v-show：元素始终被渲染到 HTML，他只是简单的元素设置 css 的 style 属性，当不满足条件的元素被设置 style="display: none"的样式，是通过修改元素的 css 属性来决定实现显示还是隐藏
  - v-if：满足条件是会渲染到 html 中，不满足条件时是不会渲染到 html 中的，是通过操纵 dom 元素来进行切换显示
  - 总结： v-if 需要操作 dom 元素，有更高的切换消耗，v-show 只是修改元素的 css 属性有更高的初始渲染消耗，如果需要非常频繁的切换，建议使用 v-show 较好，如果在运行时条件很少改变，则使用 v-if 较好

+ 纯函数

  一个函数的返回结果只依赖于它的参数，不更改入参，并且在执行过程里面没有副作用。

  - 副作用：一个函数执行过程中对产生了外部可观察的变化那么就说这个函数式有副作用的。

* 一些概念

  - > https://blog.csdn.net/crazy_jialin/article/details/114967245

  - SSR（server side render）

    服务端渲染，是指由服务侧完成页面的 DOM 结构拼接，然后发送到浏览器，为其绑定状态与事件，成为完全可交互页面的过程。

  - CSR（client side render）

    客户端渲染，是指由客户端 JS 完成页面和数据的拼接，生成 DOM 结构再交由浏览器渲染成页面的过程。

  - SPA （single page application）

    单页面应用，指只有一张 WEB 页面的应用，也就是说在导航切换的过程中页面不会刷新，只是局部更新内容。SPA 实现的原理就采用了 CSR，页面中所有内容由 JS 控制，需要浏览器进行 JS 解析才显示出来。

  - SEO （search engine optimization）

    搜索引擎优化，利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。

  - SSG（static side generate）

    无需服务器实时动态编译，在构建时针对特定路由简单的生成静态 HTML 文件，也可称之为渲染。

+ box-sizing

  - content-box: 元素的的宽高等于 height 和 width，不受 padding 和 border 的影响
  - border-box: 元素的实际宽度 = width - padding\*2 - border\*2

* react 组件中的副作用

  - 需要清除的（如不清除，可能会导致内存泄漏等问题）
    - 订阅外部数据源
  - 不需要清除的（执行完这些操作，就可以忽略他们）
    - 发送网络请求
    - 手动变更 DOM
    - 记录日志

+ NodeJS 特点

  - 异步 I/O （eg: 文件读写，网络请求，数据库操作等）
  - 单线程
  - 跨平台
  - 优势： I/O 密集型（而非计算密集型）

* 奇怪的问题

  - antd switch 组件，disabled 状态和 loading 状态的背景透明度不同，但其在样式实现上是相同的。去掉 loading 样式中的 animation 动画即可正常。

+ git 操作
  - git init
  - git add remote origin @git........
  - git push --set-upstream origin \<branch\>

Gotta make you mad not to know who you are. Your soul disappears. Nothing as bad as uncertainty.
