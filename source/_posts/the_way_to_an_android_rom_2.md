---
title: 刷机包是怎样炼成的！（二）
date: 2018-07-21 20:16:53
tags: [Android开发,Android,安卓,刷机,玩机指南]
categories: AndroidRom开发
---
刷机包是怎样炼成的！（二）
1.本文使用Markdown编写 请复制到支持Markdown的文本浏览器内以获取最佳阅读效果
2.本文所有代码使用Java格式高亮 然而所有代码并不是Java 而是Edify语言
3.获取最新更新内容请关注新浪微博@A1pine
欢迎来到刷机玩家终极进阶教程的第二篇。

上一篇，我们讲到了刷机包的基本结构。作为系列的第一篇，作用当然是让大家对整体结构有一定的了解。上一篇所讲的知识，虽然繁多但多不深入。上一篇发表后，可谓是酷安引起了轰动。在发布后的1个小时，我收到了150余条回复和几百条几百条收藏，看到那篇文章能够如此受欢迎，我怀着惊喜和满足回复完了所有150余条回复，然而，我没想到的是，在短短的一夜过后，阅读，收藏，评论量翻了几番，我很想一一解答你们的问题，然而因为正处于考试周，并没有太多的时间来一一回复，在这里，先给有疑问却没收到我的答复的酷友们道一句抱歉。在这里，我也号召那些对刷机颇有研究的酷友，和我一起为其他酷友答疑解惑，谢谢。

第二件事，是关于本系列的安排，我计划将本系列分为六个章节，第一章讲了刷机包的大体结构，这一章是第二章，所要提到的内容是updater-script，即刷机脚本的常见命令。下一次，主要讲的是boot.img的主要结构，第四章讲system的主要结构，第五章会提到底包中中各个文件的作用。第六章，也就是全系列的最后一章，我会以一次移植为例子，讲解制作刷机包时，我们都干了些什么，这些操作的目的是什么。更新周期大概在1-2周。重点（敲黑板）主要是三四五三章。

好了，话不多说，让我们进入到今天的学习当中吧

首先我们打开updater-script（以一加5 氢OS7.1.1 稳定版为例）

![](/images/the_way_to_an_android_rom_2/the_way_to_an_android_rom_2.1.jpg)

看到第一句，
```edify
getprop("ro.display.series") == "OnePlus 5" || abort("E3004: This package is for \"OnePlus 5\" devices; this is a \"" + getprop("ro.display.series") + "\".")
```

第一句是机型验证，作用是防止刷机包被不兼容的机型刷入

这句话翻译成中文是

如果ro.display.series的值不是"OnePlus 5"，就报错

```edify
E3004: This package is for \"OnePlus 5\" devices; this is a \"" + ro.display.series 中的中的值") + "\"."
```
<!-- more --> 
相信只要你会任何一门程序语言，读懂这句话都不在话下，可以瞥见，ro.display.series 中的值就是机型的代号，如果该代号和刷机包期待的代号不相符，就会报错不进入刷机过程。

第二行是 
```edify
show_progress(0.750000, 0);
```
这个能在updater-script中多处见到，它的作用主要是显示刷机的进度，让刷机者在过程中能看到进度条的更新而不是误以为手机死机。

它的用法是showprogress（进度向前移动x（完成度等于1为完成）, 可能需要消耗的时间（单位s）) 比如图中这句话

```edify
show_progress(0.750000, 0);
```

意思是，该操作可能需要0秒完成，完成后总进度向前进百分之75。

然后第三句

```edify
ui_print("Patching system image unconditionally...");
```

ui_print(“”)的作用是将引号内的话打印到屏幕上。

```edify
ui_print("此乃教程第二篇");
```

然后从第四句开始，重头戏来了

```edify
block_image_update("/dev/block/bootdevice/by-name/system", package_extract_file("system.transfer.list"), "system.new.dat", "system.patch.dat") ||

abort("E1001: Failed to update system image.");
```

首先我们看这个语句分为三个函数

```edify
block_image_update(x,y,z,w)

package_extract_file("system.transfer.list")

```

和

abort("E1001: Failed to update system image.");

之前有提到过从Android 5.0开始支持dm-verity，所以必须按照block更新分区，block_image_update的意思，就是按block更新分区，函数内部有四个参数,

```edify
"/dev/block/bootdevice/by-name/system"

package_extract_file("system.transfer.list")

"system.new.dat",

"system.patch.dat"

system.transfer.list
```

/dev/block/bootdevice/by-name/system指的是system分区

package_extract_file("system.transfer.list")将system.transfer.list提取出来传给了block_image_update

system.transfer.list中的内容跟block有关

system.transfer.list中的内容解释如下

第一行为版本号

第二行是需要写入的block总数（）

另外system.transfer.list还支持三种操作

erase 将目标分区的range清除；

zero 将目标分区的range使用0填充；

new: 将目标分区的range使用new_data文件填充；

system.patch.dat和system.patch.dat相信大家大家都不陌生

就是刷机包中的另外两个文件 我们的镜像主要就在system.patch.dat内。

```edify
||abort("E1001: Failed to update system image.");
```
||abort("E1001: Failed to update system image.");的意思当然就是 如果解包失败，就警告后面的内容

```edify
package_extract_file("boot.img", "/dev/block/bootdevice/by-name/boot");
```

和上面一样 将boot.img 解包到boot分区

在其他的升级脚本中，常见的还有

```edify
mount("ext4", "EMMC", "/dev/block/bootdevice/by-name/userdata", "/data");
```

和Linux 一样 这是挂载了data 分区

```edify
format("ext4", "EMMC", "/dev/block/bootdevice/by-name/system", "0", "/system");
```

将system格式化

symlink <目标> <目录>

相当于linux中的ln命令 创建了一个软链接，在第二个参数下下创建第一个参数代表的文件的软链接

```edify
set_metadata("/system/xbin/shelld", "uid", 0, "gid", 1000, "mode", 0754, "capabilities", 0x0, "selabel", "u:object_r:system_file:s0");
```

修改了目标目录的权限和组

```edify
unmount("/system");
```

解除system分区的挂载

好了 第二期就到这了，还是欢迎大家留言、转载、批评指正

另外 新浪微博**@A1pine** 求一波关注 以后更新在微博上也会发哦

#安卓日常# #玩机技巧# #刷机#

参考文献

1. [ Android 刷机脚本updater-script 详解. ]( http://zhebk.cn/Android/updater-script.html )

2. [ 如何导出android系统中的某一分区 ]( https://blog.csdn.net/lewif/article/details/49124709 )

3. [ aosp源码分析 5.0 BlockImageUpdateFn ]( https://blog.csdn.net/ly890700/article/details/58696379 )
4. [自用 updater-script 备忘]( https://zhuanlan.zhihu.com/p/23632918 )
