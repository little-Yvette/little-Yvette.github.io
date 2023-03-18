---
title: "网站装修"
date: 2023-02-21T21:35:33+08:00
draft: false
author: "L."
categories: ["记录"]
tags: ["hugo建站"]
code:
  copy: true
  maxShownLines: 15
---

修改的是根目录同名文件

## 更换配色

在 SCSS 文件中会看到这样的语句，`color: $global-font-color;` 意思是颜色指定为全局字体颜色，`$` 表示这是一个变量。在这个主题中另有 `assets/css/_variables.scss` 文件存放变量定义，同时 LoveIt 主题提供了 `_override.scss` 空白文件，将想要更改的变量定义写在这个文件中，会覆盖原来的定义。通过修改变量就可以修改整个网站的颜色。

🌈 挑颜色和配色的网站：
- [中国传统色色谱](https://coolfishstudio.github.io/cfs-color/)。提供了 rgb 和 hex 两种格式的色彩码，点击色块自动复制 hex 码，顶部标题栏预览颜色；
- [潘通颜色](https://hexcolor.co/pantone-colors)。这个网站也有色板生成器、对比度检查工具、单色渐变、近似色、色彩搭配和运用等等之类的，功能还挺多；
- [Color Space](https://mycolor.space/)。可以生成多种色板，比上面那个网站要好看些；
- [Color Shade Generator](https://mdigi.tools/color-shades/)。如果只想找一找渐变色这个就合适，有 hex, rgb, hsl, hsv 四种格式的颜色代码。

### 对比度

换了主题色，担心选的颜色会不会太淡了，感觉自己肉眼判断不可靠，就用**开发人员工具（F12）—— 元素检查器**查看，果然有些地方对比度达不到标准。有意义的、非装饰性的文字与背景的对比度至少应该达到 4.5:1（见 [WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum)）。

🔧 检查工具和参考：
- [Material Design —— Color & Accessibility](https://m3.material.io/styles/color/the-color-system/accessibility);
- [Contrast Checker](https://webaim.org/resources/contrastchecker/ "对比度在线检查")。输入两种颜色的 hex 码即可检查；
- [tanaguru contrast finder](https://contrast-finder.tanaguru.com/)。方法和上面的网站大致一样，但是如果未达到标准的话，还提供了一些接近所选颜色，但是更符合对比度标准的颜色。


## 调整样式

### 删掉标题的项目符号

不喜欢主题自带的次级标题前的项目符号，我觉得靠字体粗细和间距就可以区分层级了。在这个主题里，文内标题的样式是在 `assets/css/_page/single.scss` 这个文件里定义的，我在 `.conteng >h2` 这里添加了两行，以在 h2 标题下添加分割线，拉开间距。并且将后边的与 h2 和 h3 有关的 `.header-mark::before` 两段暂时用 `/**/` 注释掉了

``` scss
border-bottom: 1px dashed #BDB9C5;
padding-bottom: 1.2em;
```
### 给文内链接换个悬停效果

主题默认超链接用蓝色来表示，鼠标滑到链接时变成红色，但是我在 stack 主题里看到了更喜欢的效果。同样在上面的那个 `single.scss` 中更改。Markdown 中的超链接就是 html 中的 `<a>`。因此找到样式表中的这个标签进行更改就好了。代码来自 [6-Creative-Ideas-for-CSS-Link-Hover-Effects](https://css-tricks.com/css-link-hover-effects/) 中的 growing background hover effect。我改了颜色，并且加上了暗色模式下适用的。

``` scss
a {
      @include overflow-wrap(break-word);
//growing background hover effect
      text-decoration: none;
      color: $single-link-color;
      font-weight: 700; 
      position: relative;
       
       [theme=dark] & {
        color: #e5e5e6;
        font-weight: 400;
       }
    }

    a::before {
      content: '';
      background-color: hsla(42, 32%, 86%, 0.9);
      position: absolute;
      left: 0;
      bottom: 3px;
      width: 100%;
      height: 4px;
      z-index: -1;
      transition: all 0.3s ease-in-out;

       [theme=dark] & {
        background-color: hsla(34, 34%, 62%, 0.5);
       }
    }
    
    a:hover {
      color: #2e561a;
       
       [theme=dark] & {
        color: #fcfaf8;
       }
    }
    
    a:hover::before {
      bottom: 0;
      height: 100%;
    }
//growing background hover effect
```

### 鼠标点击效果

代码是在 [ANY_ME—— Hugo 博客自定义优化](https://shishuochen.gitee.io/)这篇中看到的，如下：

``` html
<script src="https://cdn.jsdelivr.net/gh/ITJoker233/ITJoker233.github.io@latest/CDN/js/love.min.js"></script>
```

原先的是红色的心，我想换个颜色，就把上面那条换成 `js`格式的添加在了自定 js 文件中，因为主题文档说可以自定义。虽然我看不懂 js 代码，但是能找到表示颜色的那句：

``` js
! function (e, t, a) {
  function n() {
      c(
          ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
      ), i(), r()
  }

  function r() {
      for (var e = 0; e < l.length; e++) l[e].alpha <= 0 ? (t.body.removeChild(l[e].el), l.splice(e, 1)) : (l[e].y--,
          l[e].scale += .004, l[e].alpha -= .013, l[e].el.style.cssText = "left:" + l[e].x + "px;top:" + l[e].y +
          "px;opacity:" + l[e].alpha + ";transform:scale(" + l[e].scale + "," + l[e].scale +
          ") rotate(45deg);background:" + l[e].color + ";z-index:99999");
      requestAnimationFrame(r)
  }

  function i() {
      var t = "function" == typeof e.onclick && e.onclick;
      e.onclick = function (e) {
          t && t(), o(e)
      }
  }

  function o(e) {
      var a = t.createElement("div");
      a.className = "heart", l.push({
          el: a,
          x: e.clientX - 5,
          y: e.clientY - 5,
          scale: 1,
          alpha: 1,
          color: s()
      }), t.body.appendChild(a)
  }

  function c(e) {
      var a = t.createElement("style");
      a.type = "text/css";
      try {
          a.appendChild(t.createTextNode(e))
      } catch (t) {
          a.styleSheet.cssText = e
      }
      t.getElementsByTagName("head")[0].appendChild(a)
  }

  function s() {
      return "rgb(236,138,164)" //change color of the heart 
  }
  var l = [];
  e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
          setTimeout(e, 1e3 / 60)
      }, n()
}(window, document);
```

## 添加虫洞

点击虫洞会随机去一个十年之约成员的博客，我觉得还挺有意思的。虽然我没加入这个，但不影响访问其他人的网站。[十年之约官网](https://www.foreverblog.cn/notice/16.html)提供了 html 格式的链接 logo。我在 `layouts/partials/footer` 中添加了这两行：

``` html
<p>
  <a href="https://www.foreverblog.cn/go.html" target="_blank"> 
    <img src="https://img.foreverblog.cn/wormhole_3_tp.gif" alt="" style="width:auto;height:32px;padding-bottom:1.5rem" title="穿梭虫洞-随机访问十年之约友链博客">
  </a>
</p>
```

## 加一个音乐播放器

代码来自[山茶花舍——安装音乐播放器](https://irithys.com/p/%E7%BB%99hugo%E5%8A%A0%E4%B8%80%E7%82%B9%E5%A5%BD%E7%8E%A9%E7%9A%84%E5%8A%9F%E8%83%BD/#%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8)。

LoveIt 主题提供了文档内加音乐播放器的短代码，使用的是 APlayer 和 MetingJS 库，以及 APlayer 也有适合多个平台的[插件](https://github.com/DIYgod/APlayer)。短代码可以放在文档里，但不能全局使用。这个主题也没有 `custom.html` 文件，所以呢，在 Bing AI 的（~~指导~~）启发之下，我在 `\layouts\partials\` 下新建了一个 `music.html` 文件，复制了上边那篇文章里的代码。在根目录的 `static` 文件夹中建了 `images` 和 `music` 两个子文件夹用来存放本地资源。

一开始添加音乐播放器的时候，出现了只有主页能播放音乐的问题，其他页面只有播放器那个空壳子，没有封面，没有音乐，显示 **an audio error has occurred**，控制台显示找不到资源。Bing AI 说可能是引用路径没写对哦，前面要加斜杠啦（当然它不是这个语气）。在 `music` 这个属性中添加本地文件路径，要写做：

``` js
music:[{
name:'Teo Torriatte',url:'/music/Teo Torriatte.mp3',artists:'Queen',cover:'/images/Teo Torriatte.jpg'}]
```

然后在 `\layouts\_default\baseof.html` 的 `wrapper` 属性里添加一行：

``` html
{{- partial "music.html" . -}}
```
为什么添加在这里呢，我也不知道，就是看到上面一行是和 footer 有关的。写完这段我又测试了一下，跨页面的话音乐就会停，不知道怎么解决。

---
打算做的：
-[ ] 
-[ ]