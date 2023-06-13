---
title: "网站装修"
date: 2023-04-04
draft: false
weight: 5
author: "L."
categories: ["记录"]
tags: ["hugo建站"]
code:
  copy: true
  maxShownLines: 15
---

这个网站使用的是 [LoveIt 主题](https://themes.gohugo.io/themes/loveit/)，所有的修改也是基于这个模板的结构。安装主题和自定义方法可以参考该主题的[示例网站](https://hugoloveit.com/)。

使用 `hugo new site` 命令可以生成网站文件夹，它的目录结构和主题文件夹是相似的。Hugo 的特性是优先读取根目录。为了不和主题后续更新产生冲突，以及避免不小心把东西改坏了无处可退的情况，可以把主题内想要更改的文件复制到根目录的同名路径之下，再进行修改。没有那个文件夹的话大概可以新建一个。

{{< admonition warning " 提醒 " true>}}
还在摸索中......记下的修改方法很有可能不是最优的、恰当的，只能说当下可以起效。另外我需要记下，因为大概率以后会忘记之前是怎么改的了。
{{< /admonition>}}

## 参考资源

所有操作基于 windows 系统，用 [Visual Studio Code](https://code.visualstudio.com/) 处理文档代码，终端使用 [Git Bash](https://git-scm.com/downloads "Git下载官网")。大致流程：使用 [Hugo](https://gohugo.io/) 这个静态网站生成器，托管到 Github Pages，在 [NameSilo](https://www.namesilo.com/) 购买域名，用 [Backblaze](https://www.backblaze.com/) 存储图片，在 [Cloudflare](https://www.cloudflare.com/) 上改写图片链接地址，以隐藏存储桶的名字。

一些对我有帮助的资源和教程（不完全）：
- Hugo 官方的[入门文档](https://gohugo.io/getting-started/quick-start/)；
- [MDN文档——Web入门概述](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)。照葫芦画瓢，现学现画必备指南；
- [Git Cheatsheet](https://cs.fyi/guide/git-cheatsheet "Git 常用命令")
- [小球飞鱼——Hugo | 一起动手搭建个人博客吧](https://mantyke.icu/posts/2021/hugo-build-blog/)。从安装 Hugo 开始超详细教程。Https 和 SSH 推送的区别以及如何创建 SSH key 也可参考[石斛](https://www.cnblogs.com/yinminbo/p/11810302.html "创建一个 SSH key详细过程")这篇;
- [郝鸿涛——如何零基础免费搭建个人网站（2021-03-02）](https://hongtaoh.com/cn/2021/03/02/personal-website-tutorial/#前期准备)。主要参考了托管这部分；

以及 Bing AI。

## 更改主题色

在 SCSS 文件中会看到这样的语句：

`color: $global-font-color;` 意为颜色指定为所定义的全局字体颜色，`$` 表示这是一个变量。

这个主题另有 `assets\css\_variables.scss` 文件存放变量定义，同时 LoveIt 主题提供了 `_override.scss` 空白文件，将想要更改的变量定义写在这个文件中，会覆盖原先的定义。通过修改变量就可以大致修改整个网站的颜色。

🌈 挑颜色和配色的网站：
- [中国传统色色谱](https://coolfishstudio.github.io/cfs-color/)。提供了 rgb 和 hex 两种格式的色彩码，点击色块自动复制 hex 码，顶部标题栏预览颜色；
- [潘通颜色](https://hexcolor.co/pantone-colors)。这个网站可以查看具体的颜色信息，也有色板生成器、对比度检查工具、单色渐变、近似色、色彩搭配和运用等等之类的；
- [Color Space](https://mycolor.space/)。输入颜色代码，可以生成多种色板；
- [Color Shade Generator](https://mdigi.tools/color-shades/)。只想找一找渐变色这个就合适，有 hex, rgb, hsl, hsv 四种格式的颜色代码。

### 对比度

如果担心字的颜色太淡显示不清，可以使用**开发人员工具——元素检查器**检查。

🔧 工具：
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum)。有意义的、非装饰性的文字与背景的对比度至少应该达到 4.5:1；
- [Material Design —— Color & Accessibility](https://m3.material.io/styles/color/the-color-system/accessibility)。谷歌的设计规范指引;
- [Contrast Checker](https://webaim.org/resources/contrastchecker/ "对比度在线检查")。输入两种颜色的 hex 码即可检查对比度；
- [tanaguru contrast finder](https://contrast-finder.tanaguru.com/)。方法和上面的网站大致一样。如果未达到标准的话，还提供了一些接近所选颜色，但是更符合对比度标准的颜色。


## 修改样式

### 更改字体

现在网站使用的字体是思源宋体，可以通过 CDN 引用（来源：[npmjs](https://www.npmjs.com/package/cn-fontsource-source-han-serif-sc-vf-regular)）。在 `_override.scss` 中增改一下：

``` scss
@import url('https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf-regular/font.css');
$global-font-family: Roboto, "Source Han Serif SC VF", sans-serif !important;
```

就是加载太慢了。

还试过[霞鹜文楷](https://github.com/lxgw/LxgwWenKai "字体 Github 仓库")，也可使用 CDN 引入：

``` scss
@import url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css');
$global-font-family: "LXGW WenKai", sans-serif;
```

### 删掉标题的项目符号

{{< image src="/images/ori-theme.jpg" caption="原始主题（image-test）" title="原始主题"  >}}

不太喜欢主题自带的次级标题前的项目符号。在这个主题里，文内标题的样式是在 `assets\css\_page\single.scss` 这个文件里定义的，在 `.content >h2` 这里添加了两行，以在 h2 标题下添加分割线，拉开间距。

``` scss
border-bottom: 1px dashed #BDB9C5;
padding-bottom: 1.2em;
```

但是改完这个之后，我还是希望鼠标悬停在标题行时前面能够出现点东西。研究了不止一下这个网站（[驱蚊器喵的插座](https://blog.meow.page/)）页面上的代码，换了选择器，移植到了这个页面上（移动端无效）：

``` scss
// custom-icon before the h//
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
        
        .header-mark {
          visibility: hidden;
        }
        
      > .header-mark::before {
              content: '\1f342';      //落叶的 unicode
              position:absolute;
              margin-left: -2.15em;
              padding-right: 1.15em;
              color: $single-link-color;

              [theme=dark] & {
              color: $single-link-color-dark;
              }
         }
    }

    :hover .header-mark {
      visibility: visible;
    }
  // custom-icon before the h//
```

### 给文内链接换个悬停效果

主题默认超链接用蓝色来表示，鼠标滑到链接时变成红色，但是我在 [Stack 主题](https://demo.stack.jimmycai.com/)里看到了更喜欢的效果。同样在上面的那个`single.scss`中更改。Markdown 中的超链接就是 html 中的`<a>`。元素检查模式下选中想要更改的元素，在样式一栏可以看到这个元素在哪个文件里。代码来自[这篇文章](https://css-tricks.com/css-link-hover-effects/ "Creative-Ideas-for-CSS-Link-Hover-Effects") 中的 growing background hover effect。改了颜色，并且加上了暗色模式下适用的。

``` scss
:is(p, ul) a {
      @include overflow-wrap(break-word);
      text-decoration: none;
      color: $single-link-color;
      font-weight: 700; 
      position: relative;
       
      [theme=dark] & {
      color: #e5e5e6;
      font-weight: 400;
      }

         &::before {
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

         &:hover {
            color: #2e561a;
         
           [theme=dark] & {
            color: #fcfaf8;
           }
      }

         &:hover::before {
            bottom: 0;
            height: 100%;
      }
    }
    /* custom-growing bg hover effect */
```

一开始简单更改了这个悬停效果，以为万事大吉了。后来发现和文档里的标题样式有冲突，因为标题同样使用了`<a>`标签，我猜可能是因为这个（事后想想好像又不是）。需要让这个效果只作用于自己在文档里添加的超链接。目前的解决办法是将选择器写成`:is(p, ul) a`，选择`<p>`和`<ul>`标签内的`<a>`。应该还有别的办法。暂时没有出现更诡异的画面，除了移动端这个效果无效以及换行了的链接悬停背景不会出现。

### 鼠标点击效果

代码是在 [ANY_ME—— Hugo 博客自定义优化](https://shishuochen.gitee.io/2020/uffick8u1/)这篇中看到的，如下：

``` html
<script src="https://cdn.jsdelivr.net/gh/ITJoker233/ITJoker233.github.io@latest/CDN/js/love.min.js"></script>
```

原先是红色的心，我想换个颜色，就把上面那条换成`js`格式的添加在了自定 js 文件中。按照主题提供的自定义方式，在`assets\js`下新建了`some.js`，并且将根目录配置文件中的`[params.page.library.js]`变量下添加路径 `someJavascript = "js/some.js"`。更改了颜色代码：

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
      return "#c4c3cb" //change color of the heart 
  }
  var l = [];
  e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
          setTimeout(e, 1e3 / 60)
      }, n()
}(window, document);
```

### 目录样式

回头看已经搞不清楚怎么改的了。改完这个之后发现点击目录无法跳转到页面指定位置，我以为是锚点的问题，检查过后发现是匹配的。偶然搜索时看到[这篇文章](https://www.ariesme.com/posts/2019/add_toc_for_hugo/ "Hugo 添加文章目录 toc")中提到了这个问题，“toc模板......会将中文字符编码成%xx...这样 js 无法识别”。果然，换成英文标题就可以，我想着把网站语言设置成中文能不能解决呢，在配置文件中添加了简体中文后一切如常，没有变化。但知道具体问题之后再问 AI，

{{< image src="/images/bingai.jpg" caption="和 Bing AI 的对话（image-test）" title="和 Bing AI 的对话"  >}}

它就给了一段基础代码：

``` js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.textContent.match(/[\u4e00-\u9fa5]/)) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
```

添加至自定义 js 文件后，就可以正常跳转了。

## 添加虫洞

点击虫洞会随机去一个十年之约成员的博客，还挺有意思的。虽然我没加入这个，可不影响访问其他人的网站。[十年之约官网](https://www.foreverblog.cn/notice/16.html)提供了 html 格式的链接 logo。在 `layouts\partials\footer.html` 中添加了这两行：

``` html
<div>
    <a href="https://www.foreverblog.cn/go.html" target="_blank"> <img src="https://img.foreverblog.cn/wormhole_3_tp.gif" alt="" style="width:auto;height:32px;padding:0.8rem 0" title="穿梭虫洞-随机访问十年之约友链博客">
    </a>
</div>

```

## 加一个音乐播放器

代码来自[山茶花舍——安装音乐播放器](https://irithys.com/p/%E7%BB%99hugo%E5%8A%A0%E4%B8%80%E7%82%B9%E5%A5%BD%E7%8E%A9%E7%9A%84%E5%8A%9F%E8%83%BD/#%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8)。

LoveIt 主题提供了文档内加音乐播放器的短代码，使用的是 APlayer 和 MetingJS 库，以及 APlayer 也有适合多个平台的[插件](https://github.com/DIYgod/APlayer)。短代码可以放在文档里，但不能全局使用。这个主题也没有 `custom.html` 文件，所以呢，在 Bing AI 的（~~指导~~）启发之下，我在 `layouts\partials\` 下新建了一个 `music.html` 文件，复制了上边那篇文章里的代码。在根目录的 `static` 文件夹中建了 `images` 和 `music` 两个子文件夹用来存放本地资源。

一开始添加音乐播放器的时候，出现了只有主页能播放音乐的问题，其他页面只有播放器那个空壳子，没有封面，没有音乐，显示 **an audio error has occurred**，控制台显示找不到资源。Bing AI 说可能是引用路径没写对，前面要加斜杠。在 `music` 这个属性中添加本地文件路径，要写做：

``` js
audio:[
            {
                name:'Teo Torriatte',
                url:'/music/Teo Torriatte-c.mp3',
                artist:'Queen',
                cover:'/images/Teo Torriatte.jpg'
            },
            {
                name:'Brideshead Revisited Theme',
                url:'/music/Brideshead Revisited Theme.flac',
                artist:'Geoffrey Burgon',
                cover:'/images/revisited.jpg'
            }
            ]
```

然后在 `layouts\_default\baseof.html` 的 `wrapper` 容器里添加一行（不确定添在这个位置是不是合适的）：

``` html
{{- partial "music.html" . -}}
```
添了这段我又测试了一下，跨页面的话音乐就会停。后来看到可以使用 pjax 解决这个音乐会重新加载的问题（但也可能造成更多问题？），来来去去折腾我放弃解决这个问题了。 

## 相册模式

五年前就想建个站，那时我在 lofter 上传了一张照片，标题有“空椅子”三个字，触发了荒唐神经构成的敏感词库。这事拖到23年才开工，总觉得好难啊做不到，但现在磕磕绊绊搞出来了，感觉还不错。

主题已经含有了 [lightgallery](https://www.lightgalleryjs.com/)，貌似默认状态下照片只会以单列的形式出现，不是我想要的，或者是我打开方式不正确？

就只好手动编了。代码来自[这个教程](https://w3bits.com/css-masonry/ "纯CSS实现响应式瀑布流布局")。要在 Hugo 中直接使用 html 写东西，需要将配置文件中的这条设置为 true：

``` toml
[markup.goldmark.renderer]
      # whether to use HTML tags directly in the document
      # 是否在文档中直接使用 HTML 标签
      unsafe = true
```

在相册 markdown 文档中添加了下面的代码，`cell`中添加图片：

``` html
<head>
  <link href="album.css" rel="stylesheet" type="text/css">
</head>
  <div class="masonry">
      <div class="cell">
        ...
      </div>
      <div>
        ...
      </div>
  </div>
```

样式表放在同层目录下：

``` css
* {
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

.masonry {
    margin-top: 3em;
    column-gap: 0.5em;
    max-width: 768px;
}

.cell {
    display:inline-block;
    margin: 0 0 auto;
    width: 100%;
}

.cell:hover {
    filter: brightness(115%);
}

@media only screen and (min-width:768px) {
    .masonry {
        column-count: 3;
    }
}

@media only screen and (max-width: 767px) and (min-width: 576px) {
    .masonry {
        column-count: 2;
    }
}

@media only screen and (max-width:575px) {
    .masonry {
        column-count: 1;
    }
}

img {
    border-radius: 3px;
    object-fit: cover;
}
```

---

然后我终于意识到自己就是喜欢搞点有的没的。
