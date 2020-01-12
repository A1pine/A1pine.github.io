---
title: 洛谷P1111 修复公路
date: 2018-12-18 14:54:06
tags: [数据结构,算法,并查集,克鲁斯卡尔,Kruskal,最小生成树,图论]
categories: 算法与数据结构
---

Kruskal模板题，应该还可以优化，过段时间再填坑...

# 题目背景
A地区在地震过后，连接所有村庄的公路都造成了损坏而无法通车。政府派人修复这些公路。

# 题目描述
给出A地区的村庄数N，和公路数M，公路是双向的。并告诉你每条公路的连着哪两个村庄，并告诉你什么时候能修完这条公路。问最早什么时候任意两个村庄能够通车，即最早什么时候任意两条村庄都存在至少一条修复完成的道路（可以由多条公路连成一条道路）

# 输入输出格式
## 输入格式：
第1行两个正整数N,MN,M
下面M行，每行3个正整数x, y, t，告诉你这条公路连着x,y两个村庄，在时间t时能修复完成这条公路。

## 输出格式：
如果全部公路修复完毕仍然存在两个村庄无法通车，则输出-1，否则输出最早什么时候任意两个村庄能够通车。
<!-- more --> 
# 输入输出样例
## 输入样例： 
> 4 4
> 1 2 6
> 1 3 4
> 1 4 5
> 4 2 3
## 输出样例1： 
> 5

# 说明
> N ≤ 1000,M ≤ 100000 N ≤ 1000,M ≤ 100000
> x ≤ N,y <= N,t <= 100000 x ≤ N,y ≤ N,t ≤ 100000

# 代码
```CPP
#include < iostream >
#include < algorithm >
using namespace std;
struct edge {
    int from;
    int to;
    int cost;
}
road[100000];
int roadnum, n, m, totalcost;
int father[100000];
bool cmp(edge x, edge y) {
    return x.cost < y.cost;
}
void setfather() {//初始化函数
    for (int i = 1; i <= m; i++)
        father[i] = i;
}
int getfather(int x) {//找爸爸
    if (father[x] != x) //如果x的父节点不是x 那么x不是跟节点，所以继续找x的父节点的父节点
        return getfather(father[x]);
    return father[x];
}
void unite(int x, int y) { //合并
    x = getfather(x);
    y = getfather(y);
    if (x != y) { // x ，y 不属于同一个集合就合并
        father[y] = x; //x 成为 y 的父节点
        roadnum++; //道路总数加一
    }
}
int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; i++)
        cin >> road[i].from >> road[i].to >> road[i].cost;
    sort(road + 1, road + m + 1, cmp); //Kruskal 按边权升序排序
    setfather(); //初始化 令所有节点的父节点为本身（将点集加入新图）
    for (int i = 1; i <= m; i++) {
        unite(road[i].from, road[i].to); 
        if (roadnum == n - 1) { //如果道路数等于村庄数减一，说明最小生成树已形成
            totalcost = road[i].cost; //总的时间消耗等于 消耗时间最长的那条路的时间消耗
            break;
        }

    }
    if (roadnum != n - 1) cout << -1; 
    else
        cout << totalcost;
    return 0;
}
```