---
title: "建站记录"
date: 2023-02-21T21:35:33+08:00
draft: false
weight: 4
author: "L."
categories: ["记录"]
tags: ["hugo建站"]
code:
  copy: true
  maxShownLines: 15
---
所有操作基于 windows 系统。大致的流程是：使用 hugo 这个静态网站生成器，将网站托管到 github pages，在 namesilo 购买域名，用 backblaze 存储图片，在 cloudflare 上改写图片链接地址，以隐藏存储桶的名字。
<!---->

{{< admonition warning "注意这里~" true>}}
这篇记录里提供的方法很有可能不是最优或者恰当的，只能说可以起效。
{{< /admonition>}}

## 预先准备

使用到工具/平台：
- 终端，比如：[Powershell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3 "微软关于Powershell的文档")，[Git Bash](https://git-scm.com/downloads "Git下载官网")
- [Visual Studio Code](https://code.visualstudio.com/)
- [Github](https://docs.github.com/zh/get-started)（需要注册账号）
- [Hugo官网](https://gohugo.io/)
- [Namesilo](https://www.namesilo.com/)
- [Backblaze](https://www.backblaze.com/)
- [Cloudflare](https://www.cloudflare.com/)
- Bing AI

参考：
- [Hugo官网](https://gohugo.io/)（hugo的介绍、说明文档、安装下载方式以及模板都可以在官网找到，✨有些模板也会提供比较详细的用户文档，从安装模板到自定义网站）
- [MDN文档——Web入门概述](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web) 👈 这里也有[HTML]^(超文本标记语言)，[CSS]^(层叠样式表)等等教程，能看懂一点的话，照葫芦画瓢就容易些；
- [Git Cheatsheet](https://cs.fyi/guide/git-cheatsheet "Git 常用命令")
- [郝鸿涛——如何零基础免费搭建个人网站（2021-03-02）](https://hongtaoh.com/cn/2021/03/02/personal-website-tutorial/#前期准备)
- [山茶花舍](https://irithys.com/categories/%E5%9C%A8%E5%B0%8F%E5%B1%8B%E9%87%8C%E6%94%BE%E4%B8%80%E6%9C%B5%E8%8A%B1%E5%84%BF/)。这里有不少有意思的教程，而且网站是我喜欢的风格。

## Hugo部分

### 下载hugo  

[Hugo官网安装页](https://gohugo.io/installation/)有适合不同系统环境的安装说明，并且介绍了多种安装方式。我是在 prebuilt binaries 这一节点击 [latest release](https://github.com/gohugoio/hugo/releases/tag/v0.111.2)，进入最新版本发布页面，下滑至页面尾端展开 Assets，下载了`hugo_extended_0.110.0_windows-amd64.zip`。

将压缩包解压，得到`exe`，`license`和`README`文件，在磁盘里建一个名为`hugo`的文件夹，在这个文件夹之下再创建一个叫做`bin`的文件夹，将解压后的`exe`文件拖到`bin`文件夹中。  

### 配置环境  

接下来需要将`hugo`添加到系统路径，复制含有`hugo.exe`文件的`bin`文件夹路径。然后可以按下`Win+X`，或者以其他习惯的方式找到**系统——高级系统设置——环境变量——用户变量——选中 path 变量并编辑添加**——粘贴刚刚复制下的路径。  

{{< admonition note "如果报错：得到的不是内部或外部命令，也不是可运行的程序或批处理文件" false>}}
需要检查一下含有 git.exe 的 bin 文件夹和 git-core 文件夹是否也在 path 变量中。如果不在，之后运行 git 命令时，可能会显示这个错误。如果先安装的是Github Desktop 这样一个用于使用 Git 的图形操作界面客户端，需要注意它虽然也含有一个旧版本的 git-for-windows，但在目录挺深的位置才能找到含有 git.exe 的 bin 文件夹，需要将这个路径添加至上面的 path 变量中才行。
{{< /admonition>}}

在终端输入`hugo version`，如果显示了版本号，则表示配置正确o(*￣▽￣*)ブ

### 安装主题

这部分可以参考官网中的 [Getting Started](https://gohugo.io/getting-started/quick-start/) 或者主题的用户文档。这个网站使用的是 [LoveIt](https://themes.gohugo.io/themes/loveit/)。大概有这么几步：

- 在终端使用`hugo new site`命令行新建一个网站文件夹；

- 在 [hugo 主题列表](https://themes.gohugo.io/)找一个心仪的主题。主题详情页一般会有 Github 仓库链接、用户说明文档和示例网站等。建议选一些文件结构和用户文档都清晰的主题开始折腾，以便之后更好地折腾；

- 安装主题；

- 修改根目录的配置文件；

- 新添一篇文章，以测试网站。

具体方法大同小异，以我在这步使用过的命令行为例：

```PowerShell
pwd               # 查看当前路径
cd C:\            # 转至 C 盘或者想放置网站文件夹的路径
hugo new site forest  
        #这行命令会在当前路径创建一个名为 forest 的 hugo 网站文件夹
cd forest         # 转到 forest 目录
git clone https://github.com/dillonzq/LoveIt.git themes/LoveIt 
        # 以克隆方式安装主题
cd themes\LoveIt
git pull
cd C:\forest
echo "theme = 'LoveIt'" >> config.toml 
        # 在配置文件中指定模板名字，否则会找不到模板
hugo new posts/first-post.md # 创建一篇博客
hugo server -D # 本地预览网站
```

使用`hugo new site`命令后，在网站文件夹内会生成如下的文件和子文件夹：

```Markdown
archetypes
    | default.md
assets
content
data
layouts
public
static
themes               
config.toml                  # 配置文件
```
  
运行`git clone`后 themes 文件夹之下会得到一个主题文件夹，目录如下：

```markdown
.circleci
.git
.github
.husky
archetypes
assets
exampleSite
i18n
images
layouts
resources
src
static
.babelrc
.gitignore
config.toml
go.mod
LICENSE
package.json
package-lock.json
README.md
README.zh-cn.md
theme.toml
```
  
有三种主题安装方式，使用`git clone`，`git submodule`以及直接下载主题压缩包，放到themes文件夹里。如果下载压缩包，就不会有`.git`这个文件夹，具体的区别我不是非常清楚。看到[这篇文章](https://randomwaves.space/posts/build-a-hugo-site-from-zero/ "波澜随心起的小站")说慎用前两种方式，还没有搞懂为什么。

根目录默认生成的配置文件 config.toml 起先只有三行：

```toml
baseURL = 'http://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
```

不修改这个的话主题里的那些东西就无法应用于自己的网站，会出现 Page Not Found。需要在配置文件中指定用的是这个主题，可以直接添一句`theme = 'LoveIt'`，或者通过上面的命令行添加，名字要和主题文件夹的名字一模一样。除此之外，还需要将属性或者参数添加进配置中。有些主题文件夹内包含了 exampleSite，其中就有可以作为参考的配置文件，我直接将这个示例配置复制到了根目录的配置文件中，再根据需要修改。不包含示例的话，可以去他们的 Github 仓库中找找。

`hugo new posts/first-post.md`这条命令会默认在 content 文件夹内创建 posts 文件夹，first-post 是文档的名字。posts是路径。换成`posts/tech/second-post.md`的话，就是在 posts 之下建个 tech 文件夹，再在里面生成文档。使用这个命令行创建文档会自动在新建文档内添加`_default.md`中定义的前置参数，比如标题、日期和是否为草稿等等，其他支持的参数可以参考主题文件夹内的同名文件。

运行`hugo server -D`，如果没有报错，浏览器内输入 localhost:1313 就可以看到网站了。`-D`的意思是也会显示前置参数中`draft`设置为`true`的文档。 

### 网站装修

在原主题的基础上，我做了一点改动，具体在[这篇记录](../brush)里。emmmmm 关于 html 和 css 我只懂最基础的，装修是在其他人的代码上小修小改。逻辑什么的我还没有搞明白，放上去能用就行，要求不高。

## 部署托管静态网站

### 上传至 Github Pages

参照的是[郝鸿涛——如何零基础免费搭建个人网站（2021-03-02）](https://hongtaoh.com/cn/2021/03/02/personal-website-tutorial/#前期准备)这篇中提供的方法。

后面的部分我还没写......好

<!--
- Github 的默认分支现在从 `master` 改成了 `main`（见[官方说明](https://github.com/github/renaming)）。但我看了其他的教程，这个修改应该不是必须的；
- `ubuntu-18.04` 这个版本到 2023-04-01 就不能用，需要改成 `ubuntu-latest`, `ubuntu-20.04`, 或者 `ubuntu-22.04`，详情见[这个文档](https://github.com/actions/runner-images "GitHub Actions runner images repository")；
- `node.js 12`被弃用了，需要更新，见[这里](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-using-versioned-actions "Github Actions 工作流语法")；
- LoveIt 主题使用了 SCSS ，这个是扩展版支持的，所以我添加了一行`extended: true`;

如下：

``` yml
name: github pages

on:
  push:
    branches:
      - main  # Set a branch name to trigger deployment

jobs:
  deploy:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod
          token: ${{ secrets.PERSONAL_TOKEN }}

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.110.0'    # 修改为你的 hugo version
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./public
          cname: wisterias.one     # 使用自定域名时需要这行
```

---




### 自定义域名

### 后续更新

## 存储图片

## 报错

-->


