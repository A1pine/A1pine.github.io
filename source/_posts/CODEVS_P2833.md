---
title: CODEVSP2833 奇怪的梦境
date: 2018-12-20 19:21:12
tags: [数据结构,算法,拓扑排序]
categories: 算法与数据结构
---
裸的拓扑排序，肯定还可以再优化，不过暴力出奇迹...
过段时间再填坑
# 题目背景 Description
> Aiden陷入了一个奇怪的梦境：他被困在一个小房子中，墙上有很多按钮，还有一个屏幕，上面显示了一些信息。屏幕上说，要将所有按钮都按下才能出去，而又给出了一些信息，说明了某个按钮只能在另一个按钮按下之后才能按下，而没有被提及的按钮则可以在任何时候按下。可是Aiden发现屏幕上所给信息似乎有矛盾，请你来帮忙判断。

# 输入描述 Input Description
> 第一行，两个数N，M，表示有编号为1...N这N个按钮，屏幕上有M条信息。
> 接下来的M行，每行两个数ai，bi，表示bi按钮要在ai之后按下。所给信息可能有重复，保证ai≠bi。

# 输出描述 Output Description
> 若按钮能全部按下，则输出“o(∩_∩)o”。
> 若不能，第一行输出“T_T”，第二行输出因信息有矛盾而无法确认按下顺序的按钮的个数。输出不包括引号。

# 样例输入 Sample Input
> 3 3
> 1 2
> 2 3
> 3 2


# 样例输出 Sample Output
> T_T
> 2

# 数据范围及提示 Data Size & Hint
> 对于30%的数据，保证0＜N≤100。
> 对于50%的数据，保证0＜N≤2000。
> 对于70%的数据，保证0＜N≤5000。
> 对于100%的数据，保证0＜N≤10000，0<M≤2.5N。
<!-- more -->
```CPP
#include <iostream>
#include <cmath>
#include <cstring>
#include <cstdio>
#include <stack>
#define MAXN 300000
using namespace std;
struct node {
  int from;
  int to;
  int next;
} edge[MAXN];
int s, t, edgecount = 1, pre[MAXN], innode[MAXN], circlecount;
bool deleted[MAXN];
void addedge(int u, int v) {
  edge[edgecount].from = u;
  edge[edgecount].to = v;
  edge[edgecount].next = pre[u];
  pre[u] = edgecount++;
}
int main() {
  int n, m;
  memset(pre, -1, sizeof(pre));
  memset(innode, 0, sizeof(innode));
  cin >> n >> m;
  for (int i = 1; i <= m; i++) {
    cin >> s >> t;
    addedge(s, t);
    innode[t]++;
  }
  for (int k = 1; k <= n; k++)
    for (int i = 1; i <= n; i++) {
      if (innode[i] == 0 && !deleted[i]) {
        for (int j = pre[i]; j != -1; j = edge[j].next) {
          innode[edge[j].to]--;
        }
        deleted[i] = 1;
      }
    }
  for (int i = 1; i <= n; i++)
    if (innode[i] != 0) circlecount++;

  if (circlecount == 0)
    cout << "o(n_n)o";
  else
    cout << "T_T" << endl << circlecount;
  return 0;
}

```