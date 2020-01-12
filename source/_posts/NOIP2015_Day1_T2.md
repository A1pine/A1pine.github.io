---
title: Noip2015 Day1 T2 信息传递
date: 2018-12-20 15:26:52
tags: [数据结构,算法,Tarjan,强连通分量,DFS,有向图,图论]
categories: 算法与数据结构
---
梦开始结束的地方...
打了三个小时幻方的地方
# 题目背景 Description
有个同学（编号为 1 到）正在玩一个信息传递的游戏。在游戏里每人都有一个固定的信息传递对象，其中，编号为的同学的信息传递对象是编号为的同学。游戏开始时，每人都只知道自己的生日。之后每一轮中，所有人会同时将自己当前所知的生日信息告诉各自的信息传递对象（注意：可能有人可以从若干人那里获取信息，但是每人只会把信息告诉一个人，即自己的信息传递对象）。当有人从别人口中得知自己的生日时，游戏结束。请问该游戏一共可以进行几轮？

# 输入描述 Input Description
> 输入共 2行。
> 第 1行包含1个正整数n，表示n个人
> 第 2 行包含n 个用空格隔开的正整数T1 ,T 2 ,……,Tn ， 其中第i个整数Ti表示编号为i的同学的信息传递对象是编号为 T i 的同学，Ti≤n 且 Ti≠i。
> 数据保证游戏一定会结束。

# 输出描述 Output Description
> 输出共 1行，包含  1个整数，表示游戏一共可以进行多少轮。

# 样例输入 Sample Input
> 5
> 2 4 2 3 1

# 样例输出 Sample Output
> 3
<!-- more --> 
# 代码

```CPP
#include <iostream>
#include <cmath>
#include <cstring>
#include <cstdio>
#include <stack>
#define MAXN 200001
using namespace std;
struct node {
  int from;
  int to;
  int next;
} edge[MAXN];
stack<int> s;
int pre[MAXN];
int DFN[MAXN], LOW[MAXN], timecount;
int edgecount = 1, mingame = 0x7fffffff, tot, sfront;
bool instack[MAXN];
void addnode(int u, int v) {
  edge[edgecount].from = u;
  edge[edgecount].to = v;
  edge[edgecount].next = pre[u];
  pre[u] = edgecount++;
}
void tarjan(int u) {
  LOW[u] = DFN[u] = ++timecount;
  s.push(u);
  instack[u] = 1;
  for (int i = pre[u]; i != -1; i = edge[i].next) {
    if (DFN[edge[i].to] == 0) {
      tarjan(edge[i].to);
      LOW[u] = min(LOW[u], LOW[edge[i].to]);
    } else if (DFN[edge[i].to] != 0 && instack[edge[i].to] == 1) {
      LOW[u] = min(LOW[u], LOW[edge[i].to]);
    }
  }

  if (LOW[u] == DFN[u]) {
    tot = 0;
    do {
      sfront = s.top();
      instack[sfront] = 0;
      s.pop();
      tot++;
    } while (LOW[sfront] != DFN[sfront]);
  }
  if (tot < mingame && tot > 1) mingame = tot;
}
int main() {
  int n, t;
  memset(pre, -1, sizeof(pre));
  cin >> n;
  for (int i = 1; i <= n; i++) {
    cin >> t;
    addnode(i, t);
  }
  for (int i = 1; i <= n; i++)
    if (DFN[i] == 0) tarjan(i);
  cout << mingame;
  return 0;
}
```
