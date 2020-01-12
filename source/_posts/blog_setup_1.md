title: 博客建站记录（一）
categories: 博客相关
tags:
  - 建站
  - 前端
  - 博客
date: 2018-12-14 22:37:22
---
前几天心血来潮把博客迁移到GitHub Pages上来了，踩了很多很多坑，特开一文作为记录
# 1.主题
主题当然是用的 最常见的NexT.Pisces 版本是截止目前最新的v6.6.0，其实中途我也用过Material，无奈最后一次更新已是三个月前，而且稳定版都无法正常运行，在网上找到的解决方案，虽然能正常运行却也会报很多错，Next的更新很及时，也是最受到好评的模板之一。
# 2.球型标签云
这个还算比较好实现，有了在Material上实现的经历，我把它移植到Next上只用了不到十分钟
用到的是一个叫做tagcanvas的js插件 [tagcanvas官方介绍页面](http://www.goat1000.com/tagcanvas.php)
我用的是独立版的tagcanvas.js ,下载下来以后扔到themes/next/js下
修改themes/next/layout/_partial/page-tags.ejs如下
<!-- more --> 
```EJS
<hr>
<br>
<%- list_categories() %>
<script src="/js/tagcanvas.js" type="text/javascript"></script>
<div class="tags" id="myTags">
 <canvas width="350" height="350" id="my3DTags">
    <p>Anything in here will be replaced on browsers that support the canvas element</p>
</canvas>
</div>
<div class="tags" id="tags">
 <ul>
  <%- tagcloud({
      min_font: 16,
      max_font: 35,
      amount: 999,
      color: true,
      start_color: 'blue',
      end_color: 'red',
  }) %>
 </ul>
</div>
<style type="text/css">
    .category-list li, .tags li{
        display: inline;
        font-size: 1.2em;
        margin-right: 1em;
        line-height: 60px;
        border: 1px solid lightgray;
        padding: 6px;
    }
    .category-list a {
        color: gray;
    }
    .category-list:hover a {
        color: gray;
        text-decoration: none;
        font-weight: bold;
    }
    .category-list-count {
        margin-left: 2px;
        font-size: .9em;
    }
    .article-entry ul li:before{
        display: none;
    }
    .article-inner  {
        text-align: center;
    }
    .article-meta {
        display: none;
    }
    .article-header {
        padding-right: 35px;
    }
    #container .article .article-title {
        padding-right: 0;
    }
    .tags {
        max-width: 40em;
        margin: 2em auto;
        margin-top: 0em;
    }
    .tags a {
        margin-right: 1em;
        line-height: 65px;
        border-bottom: 1px solid gray;
    }
    .tags a:hover {
        font-weight: bold;
        text-decoration: none;
    }
    .category-list-child {
        display: none;
    }
</style>
<script type="text/javascript">
    window.onload = function() {
        try {
          TagCanvas.Start('my3DTags','tags',{
            textFont: 'Georgia,Optima',
            textColour: null,
            outlineColour: '#ff00ff',
            weight: true,
            reverse: true,
            depth: 0.8,
            maxSpeed: 0.05,
            bgRadius: 1,
            freezeDecel: true
          });
        } catch(e) {
          // something went wrong, hide the canvas container
          document.getElementById('myTags').style.display = 'none';
        }
      };
</script>
```
配置参数在TagCanvas.Start();参数表中，[这里](http://www.goat1000.com/tagcanvas-options.php)有具体配置选项

接着打开\themes\next\layout\_macro\sidebar.swig 在
```
{% if site.tags.length > 0 %}
            <script type="text/javascript" charset="utf-8" src="/js/tagcloud.js"></script>
            <script type="text/javascript" charset="utf-8" src="/js/tagcanvas.js"></script>
            <div class="widget-wrap">
            <h3 class="widget-title"></h3>
            <div id="myCanvasContainer" class="widget tagcloud">
                <canvas width="225" height="225" id="resCanvas" style="width=100%">
                    {{ list_tags() }}
                </canvas>
            </div>
        </div>
```
下方加入
```
{% if site.tags.length > 0 %}
    <script type="text/javascript" charset="utf-8" src="/js/tagcloud.js"></script>
     <script type="text/javascript" charset="utf-8" src="/js/tagcanvas.js"></script>
        <div class="widget-wrap">
            <h3 class="widget-title"></h3>
            <div id="myCanvasContainer" class="widget tagcloud">
      <canvas width="225" height="225" id="resCanvas"style="width=100%">
                    {{ list_tags() }}
                </canvas>
            </div>
        </div>
{% endif %}
```
参考 [Netcan_Space](http://www.netcan666.com/2015/12/15/Hexo%E4%B8%AA%E6%80%A7%E5%8C%96%E7%90%83%E5%BD%A2%E6%A0%87%E7%AD%BE%E4%BA%91/#%E6%95%88%E6%9E%9C%E5%9B%BE)
# 3.旋转头像
修改themes/next/source/css/_common/components/sidebar/sidebar-author.styl
```stylus
.site-author-image {
  display: block;
  margin: 0 auto;
  padding: $site-author-image-padding;
  max-width: $site-author-image-width;
  height: $site-author-image-height;
  border: $site-author-image-border-width solid $site-author-image-border-color;
  /* 头像圆形 */
  border-radius: 80px;
  -webkit-border-radius: 80px;
  -moz-border-radius: 80px;
  box-shadow: inset 0 -1px 0 #333sf;
  /* 设置循环动画 [animation: (play)动画名称 (2s)动画播放时长单位秒或微秒 (ase-out)动画播放的速度曲线为以低速结束 
    (1s)等待1秒然后开始动画 (1)动画播放次数(infinite为循环播放) ]*/
  -webkit-animation: play 2s ease-out 1s 1;
  -moz-animation: play 2s ease-out 1s 1;
  animation: play 2s ease-out 1s 1; 
  /* 鼠标经过头像旋转360度 */
  -webkit-transition: -webkit-transform 1.5s ease-out;
  -moz-transition: -moz-transform 1.5s ease-out;
  transition: transform 1.5s ease-out;
}
img:hover {
  /* 鼠标经过停止头像旋转 
  -webkit-animation-play-state:paused;
  animation-play-state:paused;*/
  /* 鼠标经过头像旋转360度 */
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}
/* Z 轴旋转动画 */
@-webkit-keyframes play {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-360deg);
  }
}
@-moz-keyframes play {
  0% {
    -moz-transform: rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateZ(-360deg);
  }
}
@keyframes play {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
.site-author-name {
  margin: $site-author-name-margin;
  text-align: $site-author-name-align;
  color: $site-author-name-color;
  font-weight: $site-author-name-weight;
}
.site-description {
  margin-top: $site-description-margin-top;
  text-align: $site-description-align;
  font-size: $site-description-font-size;
  color: $site-description-color;
}
```

# 4.点击即送社会主义核心价值观
新建themes/next/source/js/src/click-effect.js
内容如下
```js
(function(window,document,undefined){
var hearts = [];
var source = ["富强","民主","文明","和谐","自由","平等","公正","法治","敬业","诚信","友善"];
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback){
            setTimeout(callback,1000/60);
        }
})();
init();
function init(){
    attachEvent();
    gameloop();
}
function getRandomKeyword() {
    return source[Math.floor(Math.random() * source.length)];
}
function gameloop(){
    for(var i=0;i<hearts.length;i++){
        if(hearts[i].alpha <=0){
            document.body.removeChild(hearts[i].el);
            hearts.splice(i,1);
            continue;
        }
        hearts[i].y--;
        hearts[i].scale += 0.004;
        hearts[i].alpha -= 0.013;
        css({
            left: hearts[i].x + 'px',
            top: hearts[i].y + 'px',
            opacity: hearts[i].alpha,
            transform: "scale(" + hearts[i].scale + ") translate(-50%, 0)"
        }, hearts[i].el);
    }
    requestAnimationFrame(gameloop);
}
function attachEvent(){
    var old = typeof window.onclick==="function" && window.onclick;
    document.onclick=function(event){
        old && old();
        createWord(event);
    }
}
function createWord(event){
    var d = document.createElement("div");
    hearts.push({
        el : d,
        x : event.clientX - 5,
        y : event.clientY - 5,
        scale : 1,
        alpha : 1,
        color : randomColor()
    });
    css({
        display: 'inline-block',
        transform: 'translate(-50%, 0)',
        position: 'fixed',
        zIndex: '99999999',
        color: randomColor(),
        fontSize: '14px'
    }, d);
    d.innerHTML = getRandomKeyword();
    document.body.appendChild(d);
    d.onselectstart = function() { return false; }
}
function css(css, node){
    for (var index in css) {
        if (css.hasOwnProperty(index)) {
            node.style[index] = css[index];
        }
    }
}
function randomColor(){
    return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
}
})(window,document);
```
...
To Be Continued...