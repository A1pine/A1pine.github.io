---
title: CODEVSP2602 信与信封问题
date: 2018-12-23 19:28:42
tags: [数据结构,算法,图论,二分图,匈牙利算法]
categories: 算法与数据结构
---
本来看题干以为是裸的二分图最大匹配问题，发现输入描述才说要输出确定的结果。所以最后还要再扫一遍
步骤是：
1.找出最大匹配，
2.枚举删除每条匹配边看匹配有没有改变匹配数，如果不能就说明这条边是关键边不能删除，直接输出即可。
# 题目背景 Description
> John先生晚上写了n封信，并相应地写了n个信封将信装好，准备寄出。但是，第二天John的儿子Small John将这n封信都拿出了信封。不幸的是，Small John无法将拿出的信正确地装回信封中了。

 

将Small John所提供的n封信依次编号为1，2，…，n；且n个信封也依次编号为1，2，…，n。假定Small John能提供一组信息：第i封信肯定不是装在信封j中。请编程帮助Small John，尽可能多地将信正确地装回信封

# 输入描述 Input Description
> 文件的第一行是一个整数n（n≤100）。信和信封依次编号为1，2，…，n。
> 接下来的各行中每行有2个数i和j，表示第i封信肯定不是装在第j个信封中。文件最后一行是2个0，表示结束。

# 输出描述 Output Description
> 输出文件的各行中每行有2个数i和j，表示第i封信肯定是装在第j个信封中。请按信的编号i从小到大顺序输出。若不能确定正确装入信封的任何信件，则输出“none”。

# 样例输入 Sample Input
> 3 3
> 1 2
> 1 3
> 2 1
> 0 0


# 样例输出 Sample Output
> 1 1


# 数据范围及提示 Data Size & Hint

<!-- more -->

# 代码
```CPP
#include <iostream>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <cstdio>
#include <stack>
#define MAXN 2000
using namespace std;
int check[MAXN], matching[MAXN];
int n, x, y, ans = 0;
bool edge[MAXN][MAXN];
bool dfs(int u) {
  for (int i = n + 1; i <= 2 * n; i++) {
    if (edge[u][i] != 0) {
      int v = i;
      if (!check[v]) {
        check[v] = 1;
        if (matching[v] == -1 || dfs(matching[v])) {
          matching[v] = u;
          matching[u] = v;
          return true;
        }
      }
    }
  }
  return false;
}
int main() {
  cin >> n;
  memset(edge, 1, sizeof(edge));
  while (cin >> x >> y && x != 0 && y != 0) {
    edge[x][n + y] = 0;
    edge[n + y][x] = 0;
  }
  memset(matching, -1, sizeof(matching));
  for (int i = 1; i <= n; i++) {
    if (matching[i] == -1) {
      memset(check, 0, sizeof(check));
      if (dfs(i)) ans++;
    }
  }
  int tot;
  int flag = 0;
  for (int i = 1; i <= n; i++) {
    memset(check, 0, sizeof(check));
    int v = matching[i];
    edge[i][v] = 0;
    edge[v][i] = 0;
    matching[v] = -1;
    matching[i] = -1;
    if (!dfs(i)) {
      cout << i << " " << v - n << endl;
      matching[i] = v;
      matching[v] = i;
      flag = 1;
    }
    edge[i][v] = 1;
    edge[v][i] = 1;
  }
  if (!flag) cout << "none";
  return 0;
}
```