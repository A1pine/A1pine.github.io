---
title: 刷机包是怎样炼成的！（一）
date: 2018-07-01 20:16:53
tags: [Android开发,Android,安卓,刷机,玩机指南]
categories: AndroidRom开发
---
————刷机包文件目录浅谈

都说刷机的最高境界就是会做包。作为一个爱刷机的人，有时候看着别的机型有各种各样的Rom，就会心生羡慕，MIUI，Flyme，Smartisan OS，魔趣，Linegeaos，Color OS，Funtouch OS，360 OS，甚至把时间线拉的再早些，IUNI OS，乐蛙，Fiui，想必每一个刷机佬都至少刷过其中的一种，也相信学会移植第三方Rom是每个刷机佬久久挥之不去的梦想。其实，第三方Rom的来源也是多样的，但是，由于Android系统构的特殊性，刷机包的结构大多相似，所以，谨以本系列，给各位酷友简单讲讲Android的刷机包文件目录，如有错误或者不够严谨的地方，欢迎指正。本文使用Markdown书写，请自行粘贴至支持Markdown的阅读器内以获取最佳阅读效果 
**本文首发于酷安 转载请注明来源**

# 根目录粗谈

![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.1.jpg)

作为本系列的第一篇文章，我决定讲一讲Android刷机包的根目录，就是我们直接用压缩文件打开一个刷机包看到的目录，这个目录可能会由于机型的不同、系统版本的不同、开发者习惯的不同而千差万别，但是，从原理上讲，都是大同小异的。我会将这个部分分成两个部分

第一部分是通用部分，这一部分讲到的文件，在几乎所有的刷机包的根目录下均能看到。
## 相同部分

首先要讲的就是boot.img

boot.img内包含的是与系统启动需要加载的一些文件，这一部分也是一个移植的第三方Rom能否启动的决定性因素，这里就必须要讲到Android系统的启动流程。

从你按下Power键的那一刻起，首先工作起来的是Boot Loader，Boot Loader对于刷过机的朋友们来说并不陌生，它是在Android内核运行前加载的一部分小程序，它的作用也和它所在的位置有关，通过Boot Loader 我们可以加载内核到内存，使得我们手机的硬件得到初始化，这些和Linux的特性保持一致，由于本文只是一篇简述性的文章，所以在此不做过多的赘述，在这里贴出两篇较好的文章，方便有兴趣的读者们查阅

一篇是Android系统启动顺序(按下power键后所做的的工作) 来自CSDN [ http://dwz.cn/87kAeX ]( http://dwz.cn/87kAeX )

另一篇是Boot Loader 来自极客学院 [ http://wiki.jikexueyuan.com/project/learn-linux-step-by-step/boot-loader.html ]( http://wiki.jikexueyuan.com/project/learn-linux-step-by-step/boot-loader.html )

boot.img主要包含三部分文件头信息boot header、内核kernel 和 文件系统数据ramdisk。
<!-- more --> 
这些都是和启动相关的文件，简单的来讲，如果你在启动的时候只按了开机键，即系统认为这次启动是正常开机，手机就会加载boot.img内的文件使得正常进入到系统启动环节。

关于boot.img的具体结构，我后期会再写一篇文章做更详细的讲解，在此之前，如果你有逆向相关的知识，可以访问android boot.img 结构 来自CSDN [ http://dwz.cn/87l2fh ]( http://dwz.cn/87l2fh )

然后是最常见的META-INF

![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.2.jpg)

在META-INF 有三个文件CERT.RSA，CERT.SF，MANIFEST.MF，这三个文件储存的是Rom的签名信息，这一部分牵涉到RSA加密的知识，和我们的讨论无关，大家如果有兴趣可以自行搜索了解。

META-INF还包含了一个文件夹com，将com展开有android和google两层，在android下一般会有metadata和otacert. Metadata的学术名称叫做“元数据”，它储存了描述设备信息及环境变量的数据。比如一些编译选项，签名公钥，时间戳以及设备型号。Otacert和设备的OTA升级有关。

![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.3.jpg)

这些和我们要说的都没有太大的关系，我们要关注的主要内容在google/android下 这下面有两个文件update-binary和updater-script。做移植时主要要考虑的就是updater-script中的内容，它们决定了刷机包中的每个文件最终会到达哪个位置。而update-binary则不用修改，因为它像是一个二进制的脚本解释器，对updater-script中各类操作（函数）做了解释说明。

![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.4.jpg)

## 不同的地方…

剩下来的又主要分为两个部分

## 1. system部分

有的Rom直接就有System文件夹，这个直接对System进行修改便可，还有的只能看见system.new.dat、system.patch.dat、system.transfer.list三个文件，这种情况在安卓5.0以后较为常见，而且如果是原厂提供的包，一定是这种格式，因为Android 5.0开始支持dm-verity，所以必须按照block更新分区 要对它进行修改，必须解析system.transfer.list文件然后将system.new.dat解包为ext4格式system.img，才通过挂载system.img的方式将system文件提取出来，（相关软件会在文末给出）而打包成这个格式需要用到file_context文件，这个可以从boot.img中获取，值得注意的是，在升级到安卓7.0以后，file_context变成了file_context.bin需要用相关软件转化（[工具]( http://dwz.cn/87kA17 ）才能被读取。

## 2. 底包
这里直接引用龙猪@马丁龙猪的话

> 什么是底包？
我们平时刷第三方 ROM，实际上只是刷了 boot 和 system 两个分区（俗称内核和系统）。对于大多数手机来说，除了这两个分区，还包括了大家俗称的基带、Modem、TrustZone 等必不可少的分区。
这些分区的版本是需要和系统或内核里相关的驱动版本一致才可以正常工作。比方说，假如系统里的驱动更新了，而 TrustZone 没有更新，那么指纹传感器可能会不正常；Modem 版本不对，可能会没有网络。
来自[MoKee Open Source Community]( https://bbs.mokeedev.com/t/topic/281/) 

![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.5.jpg)
![](/images/the_way_to_an_android_rom_1/the_way_to_an_android_rom_1.6.jpg)

### 常用工具
1. [SuperR's Kitchen]( http://dwz.cn/87kAge 

2.[解包+打包System.new.dat]( http://dwz.cn/87kAlX 

3.[file_contexts.bin和file_contexts转换工具]( http://dwz.cn/87kA17 

参考文献

1. [ROM包详解]( http://dwz.cn/87kAky 

2. [Android中签名原理和安全性分析之META-INF文件讲解]( https://blog.csdn.net/lostinai/article/details/54694564) 

3. [ Android系统启动顺序(按下power键后所做的的工作)]( http://dwz.cn/87kAeX )

4. [Android启动流程]( https://www.jianshu.com/p/4dc32cd64470) 

5. [android boot.img 结构]( http://dwz.cn/87l2fh )

6. [理解boot.img与静态分析Android/linux内核]( http://dwz.cn/87kAh4 

感谢所有以上工具和文章的作者和@LTDSA 这些天的帮助

#安卓日常# #玩机技巧# #刷机#

To Be Continued...
