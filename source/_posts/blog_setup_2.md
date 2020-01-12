title: 博客建站记录(二)
author: A1pine
categories: 博客相关
date: 2018-12-15 20:25:19
tags:
  - 建站
  - 前端
  - 博客
  - 优化
---
昨天测试了一下网页的打开速度，感觉还是稍慢了一点，于是今天就想把博客优化一下。
最简单的优化方式当然是用`gulp`把静态资源压缩了，可是`gulp`在4.0的时候更新了一些新的特性，导致网上的教程都失效了，我找了很长时间才发现。这里把新版的教程贴出来
# gulp简介
`Gulp.js`([官网](https://www.gulpjs.com.cn/))是一种基于流的，代码优于配置的新一代构建工具。
# 环境配置
## 安装所需依赖
首先到根目录下执行
```cmd
npm install gulp-minify-css gulp-babel gulp-uglify gulp-htmlmin gulp-htmlclean --save-dev
```
## 安装gulp
```cmd
npm install gulp -g
```
<!-- more --> 
# 建立gulpfile.js
在根目录下新建一个`gulpfile.js`文件
一般来说直接安装`gulp`会安装最新版的，也就是4.0以上的，`gulp 4`最大的变化就是你不能像以前那样传递一个依赖任务列表，而必须制定是`gulp.series`(顺序执行
)还是`gulp.paralle`(并行计算)所以网上那些针对4.0以前的`gulpfile.js`都过时了，取而代之的是以下内容

```JavaScript
var gulp = require('gulp');
var babel = require('gulp-babel');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
// 压缩 public 目录 css
gulp.task('minify-css', gulp.series(function () {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
}));
// 压缩 public 目录 html
gulp.task('minify-html', gulp.series(function () {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
}));
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./public'));
});
// 压缩图片
gulp.task('images', gulp.series(function () {
  return gulp.src('./public/**/*.{png,jpg,gif,ico,svg}')
    .pipe(imageMin({
      progressive: true
    }))
    .pipe(gulp.dest('./public'))
}))
// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.parallel(
  'minify-html', 'minify-css', 'minify-js', 'images'
));
```

当然最后是`gulp.parallel`还是`gulp.series`可以根据实际情况进行更改

# 压缩方法
在进行`hexo g`和`hexo s`/`hexo d`中间加一行命令`gulp`
执行结果如图
![](/images/blog_setup2/blog_setup_2.1.PNG)
压缩之后的访问速度接近原来的两倍

# 偷个小懒
我们可以创建一个`publish`命令代替我们进行几次输入
打开根目录下的`package.json`然后在`scripts`下增加一个`publish`命令
```json
{
  "scripts": {
    "publish": "hexo cl && hexo g && gulp && hexo d",
    "test": "hexo cl && hexo g && gulp && hexo s",
  }
}
```
然后部署和测试的时候只需要一行命令就可以搞定
测试:
```cmd
npm run test
```
部署:
```cmd
npm run publish
```