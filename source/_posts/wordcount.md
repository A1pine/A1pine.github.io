---
title: 词频统计
date: 2018-12-28 19:32:25
tags: [Python]
categories: 有意思的小东西
---
昨天在知乎上看到了一个统计书的词频的代码，但是原作用的分词是Python自带的split，很明显不支持中文
然后我就想统计一下《三体》中的词频，但是中文分词不好办
最后我找到了结巴分词，比较准确，速度也还不错。下面贴代码
注意要把file名根据实际情况改一下，然后停用词我用的是Github上的词库
<!-- more -->
```Python
import collections
import pandas as pd
import matplotlib.pyplot as plt
import jieba
# 读入文件并指定编码
file = open("1.txt" , encoding = "utf8")
book = file.read()

#停用词 
stopwords = [line.strip() for line in open('stopwords.txt', 'r', encoding='utf-8').readlines()]


wordcount = {}

wordlist = jieba.lcut(book.lower() , cut_all = False);

for everyword in wordlist:
   everyword = everyword.replace(".","")
   everyword = everyword.replace(",","")
   everyword = everyword.replace(":","")
   everyword = everyword.replace("\"","")
   everyword = everyword.replace("!","")
   everyword = everyword.replace("a€?","")
   everyword = everyword.replace("a€?","")
   everyword = everyword.replace("*","")
   everyword = everyword.replace("）","")
   everyword = everyword.replace("（","")
   everyword = everyword.replace("《","")
   everyword = everyword.replace("》","")
   everyword = everyword.replace("？","")
   everyword = everyword.replace(" :","")
   everyword = everyword.replace("，","")
   everyword = everyword.replace("。","")
   everyword = everyword.replace("…","")
   everyword = everyword.replace("！","")
   everyword = everyword.replace("“","")
   everyword = everyword.replace("”","")
   everyword = everyword.replace("：","")
   everyword = everyword.replace("、","")
   everyword = everyword.replace("—","")
   everyword = everyword.replace("；","")
   everyword = everyword.replace("\n","")
   everyword = everyword.replace("\n\n","")
   everyword = everyword.replace("\b","")
   everyword = everyword.replace("\t","")
   everyword = everyword.replace("\t\b","")
   everyword = everyword.replace("\u3000","")
   everyword = everyword.replace("[","")
   everyword = everyword.replace("]","")
   everyword = everyword.replace("?","")
   everyword = everyword.replace("-","")
   if everyword not in stopwords:
       if everyword not in wordcount:
           wordcount[everyword] = 1
       else:
           wordcount[everyword] += 1
   


# 打印最常见词汇
n_print = int(input("您想要前多少个高频词: "))
print("\n这是前 {} 个高频词\n".format(n_print))
word_counter = collections.Counter(wordcount)
for word, count in word_counter.most_common(n_print):
   print(word, ": ", count)

# 关闭文件
file.close()
```

下面是《地球往事三部曲的结果》
```CMD
python C:\Users\MrTXN\Desktop\词频统计.py
Building prefix dict from the default dictionary ...
Loading model from cache C:\Users\MrTXN\AppData\Local\Temp\jieba.cache
Loading model cost 2.163 seconds.
Prefix dict has been built succesfully.
您想要前多少个高频词: 20

这是前 20 个高频词

中 :  3688
一个 :  3066
说 :  2748
没有 :  2136
程心 :  1324
已经 :  1278
现在 :  1278
世界 :  1245
罗辑 :  1200
可能 :  1188
看到 :  1112
知道 :  1098
号 :  976
地球 :  955
时 :  949
人类 :  933
太空 :  933
三体 :  895
宇宙 :  884
太阳 :  772
```
