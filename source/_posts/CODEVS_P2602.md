---
title: CODEVSP2602 最短路径问题
date: 2018-12-19 17:00:34
tags: [数据结构,算法,邻接表,最短路,SPFA,图论]
categories: 算法与数据结构
---
本来是想刷板子的，结果发现有个点怎么都过不了...
才发现是SPFA理解上出现了偏差，和`bfs`产生了混淆，问题就在于`bfs`中一个点出了队列就不可能重新进入队列，但是`SPFA`是有可能的。
那么当初考NOIP的时候有道题不会做能拿`SPFA`混20分完全就是运气好了... 顿时有一些小小的忧伤。

# 题目背景 Description
平面上有n个点（n<=100），每个点的坐标均在-10000~10000之间。其中的一些点之间有连线。若有连线，则表示可从一个点到达另一个点，即两点间有通路，通路的距离为两点间的直线距离。现在的任务是找出从一点到另一点之间的最短路径。

# 输入描述 Input Description
> 第一行为整数n。
> 第2行到第n+1行（共n行），每行两个整数x和y，描述了一个点的坐标。
> 第n+2行为一个整数m，表示图中连线的个数。
> 此后的m行，每行描述一条连线，由两个整数i和j组成，表示第i个点和第j个点之间有连线。
> 最后一行：两个整数s和t，分别表示源点和目标点。
# 输出描述 Output Description
> 仅一行，一个实数（保留两位小数），表示从s到t的最短路径长度。

# 样例输入 Sample Input
> 5
> 0 0
> 2 0
> 2 2
> 0 2
> 3 1
> 5
> 1 2
> 1 3
> 1 4
> 2 5
> 3 5
> 1 5

# 样例输出 Sample Output
> 3.41

<!-- more -->


# 代码
## SPFA
```CPP
#include <iostream>
#include <algorithm>
#include <queue>
#include <cmath>
#include <cstring>
#include <cstdio>
using namespace std;
bool visited[10010];
struct node {
    int from;
    int to;
    double weight;
    int next;
} edge[10010];
double dis[10010];
int x[10010] , y[10010] , pre[10010] , edgecount;
double getdistance(int x1 , int x2 , int y1 , int y2)
{
    return sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}
void addnode(int u , int v , double w)
{
    edge[++edgecount].to = v;
    edge[edgecount].from = u;
    edge[edgecount].next = pre[u];
    edge[edgecount].weight = w;
    pre[u] = edgecount;
}
void spfa(int s , int t)
{
    queue <int> q;
    q.push(s);
    visited[s] = 1;
    while(!q.empty())
    {
        int temp = q.front();
        q.pop();
        visited[temp] = 0;
        for(int i = pre[temp] ; i != -1 ; i = edge[i].next)
        {
            int v = edge[i].to;
            if(dis[v] > dis[temp] + edge[i].weight)
            {
                dis[v] = dis[temp] + edge[i].weight;
                if(!visited[v])
                {
                    q.push(v);
                    visited[v] = 1;
                }
            }

        }
    }
}
int main()
{
    int s , t , n , m , p1 , p2;
    double distance;
    cin >> n;
    for(int i = 1 ; i <= n ; i++)
    {
        cin >> x[i] >> y[i];
    }
    cin >> m;
    memset(pre , -1 , sizeof(pre));
    for(int i = 1 ; i <= n ; i++)
        dis[i] = 0x7ffff;
    for(int i = 1 ; i <= m ; i++)
    {
        cin >> p1 >> p2;
        distance = getdistance(x[p1] , x[p2] , y[p1] , y[p2]);
        addnode(p1 , p2 , distance);
        addnode(p2 , p1 , distance);
    }
    cin >> s >> t;
    dis[s] = 0;
    spfa(s,t);
    printf("%.2lf" , dis[t]);
    return 0;
}
```

## Dijkstra
```CPP
#include <iostream>
#include <cmath>
#include <cstring>
#include <cstdio>
#define MAXN 2020
using namespace std;
struct node {
    int from;
    int to;
    int next;
    double weight;
} edge[MAXN];
int edgecount = 1 , x[MAXN] , y[MAXN] , pre[MAXN] , n , m , p1 , p2 , s , t ;
bool visited[MAXN];
double dis[MAXN];
double getdistance(int point1 , int point2) {
    double weight = sqrt((x[point1] - x[point2])*(x[point1] - x[point2]) + (y[point1] - y[point2])*(y[point1] - y[point2]));
    return weight;

}
void addnode(int u , int v ,double w) {
    edge[edgecount].from = u;
    edge[edgecount].to = v;
    edge[edgecount].weight = w;
    edge[edgecount].next = pre[u];
    pre[u] = edgecount++;
}
double dijkstra(int s , int t) {
    int mini;
    int mini_num;
    dis[s] = 0;
    visited[s] = 1;
    for(int i = pre[s] ; i != -1 ; i = edge[i].next)
    {
        dis[edge[i].to] = edge[i].weight;
    }
    for(int j = 1 ; j <= n-1 ; j++)
    {
        mini = 0x7fffffff;
        for(int i = 1 ; i <= n ; i++)
        {
            if(mini > dis[i] && !visited[i])
            {
                mini = dis[i];
                mini_num = i;

            }
        }
        visited[mini_num] = 1;
        for(int i = pre[mini_num] ; i != -1 ; i = edge[i].next)
        {
            if(dis[edge[i].to] > dis[mini_num] + edge[i].weight)
                dis[edge[i].to] = dis[mini_num] + edge[i].weight;
        }
    }
    return dis[t];
}
int main() {
    memset(pre , -1 , sizeof(pre));
    scanf("%d" , &n);
    for(int i = 1 ; i <= n ; i++)
        dis[i] = 0x7fffffff;

    for(int i = 1 ; i <= n ; i++)
        scanf("%d%d" , &x[i] , &y[i]);
    scanf("%d" , &m);
    for(int i = 1 ; i <= m ; i++)
    {
        cin >> p1 >> p2;
        addnode(p1 , p2 , getdistance(p1 , p2));
        addnode(p2 , p1 , getdistance(p1 , p2));
    }
    scanf("%d%d" , &s , &t);
    printf("%.2lf" , dijkstra(s , t));
    return 0;
}
```