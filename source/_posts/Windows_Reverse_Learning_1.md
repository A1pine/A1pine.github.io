---
title: Windows逆向学习笔记(一)
date: 2019-01-23 19:33:31
tags: [Windows逆向,脱壳,UnPackMe]
categories: Windows逆向
---
好久没更新了，最近在学Windows端的逆向，看的是吾爱破解上ximo的教程，上来记个笔记,笔记的内容是关于手脱`UPX壳`和`ASPACK壳`
现在还处于特别萌新的状态，暂时还没遇到什么特别大的问题。
# 工具
`OD`和`PEiD`
![](/images/Windows_Reverse_Learning_1/OD-min.jpg)
<!-- more --> 
![](/images/Windows_Reverse_Learning_1/PeiD-min.jpg)
# OD常用快捷键
> F4：运行到当前位置
> F8：单步运行
> F7: 进入函数（防止跑飞）
> alt +M：查看内存 
<!-- more --> 
# 查找OEP（Original Entry Point 程序入口）
## 对于`UPX壳`和`ASPACK壳`
### 1. 单步跟踪法
从程序开始向下单步运行，向上的跳转使之实现，向下的跳转不让它实现（直接点击下一句然后运行到当前位置）

### 2. ESP定律法
运行到关键句的下一句发现ESP对应的地址变红 (ESP第一次改变时)
右键->在数据窗口跟随 或者`dd XXXXX`或者 `hr XXXXX`（对ESP的地址设置硬件字访问断点）
然后运行再单步跟踪

### 3. 2次内存镜像法
按ALT+M,打开内存镜象，找到程序的第一个.rsrc.按F2下断点，然后按SHIFT+F9运 行到断点，接着再按ALT+M,打开内存镜象，找到程序的第一个.rsrc.上面的代码段.text（或者CODE）（也就是00401000处），按F2下断点。然后按SHIFT+F9（或者是在没异常情况下按F9）， 直接到达程序OEP
### 4. 一步直达法
看关键句pushad 直接右键查找popad （不要勾选 整个段）

对于 `ASPACK壳`
### 5. 模拟跟踪法（慢）
 `alt + M` 然后输入`tc eip<00430000`（`.aspack`对应地址）
 ### 6. SFX
 选项->调试设置->SFX ->块方式跟踪真正入口（不一定准确）
 
 
# 脱壳
## 1. 直接脱
在OEP处右键->用OD脱壳调试进程->脱壳
## 2.LordPE
找到进程->右键修正镜像大小->右键完整转存
![](/images/Windows_Reverse_Learning_1/3-min.jpg)
PS.如果脱壳后无法打开
importREC输入表重建
找到进程->输入OEP地址->自动查找IAT->获取输入表->显示无效函数->修复转存文件
