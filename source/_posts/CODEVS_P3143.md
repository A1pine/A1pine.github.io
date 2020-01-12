---
title: 模板-CODEVS3143 二叉树的序遍历
date: 2019-04-28 23:10:29
tags: [数据结构,模板,二叉树,递归]
categories: 算法与数据结构
---

水题...不过建树的方法值得参考的编号，

值得注意的是...x的值是一颗**完全二叉树， `tree[x]`的值才是数据中二叉树节点的编号（没有节点的地方都为零）...这也就是为什么我刚开始能过样例但是最后只过了$$\frac{2}{5}$$组

<!-- more -->
## 题目描述 Description

求一棵二叉树的前序遍历，中序遍历和后序遍历

## 输入描述 Input Description

第一行一个整数n，表示这棵树的节点个数。

接下来n行每行2个整数L和R。第i行的两个整数Li和Ri代表编号为i的节点的左儿子编号和右儿子编号。

## 输出描述 Output Description

输出一共三行，分别为前序遍历，中序遍历和后序遍历。编号之间用空格隔开。

## 样例输入 Sample Input

>  5
> 2 3
> 4 5
> 0 0
> 0 0
> 0 0

## 样例输出 Sample Output

> 1 2 4 5 3
> 4 2 5 1 3
> 4 5 2 3 1

## 数据范围及提示 Data Size & Hint

> n <= 16

```CPP
#include <iostream>
#include <stack>
#include <cstdio>
using namespace std;
int n;
int tree[20];
int k;
void preorder(int x)
{
    if (tree[x] == 0)
        return;
    cout << tree[x] << " ";
    preorder(tree[x] * 2);
    preorder(tree[x] * 2 + 1);
}
void inorder(int x)
{
    if (tree[x] == 0)
        return;
    inorder(tree[x] * 2);
    cout << tree[x] << " ";
    inorder(tree[x] * 2 + 1);
}
void postorder(int x)
{
    if (tree[x] == 0)
        return;
    postorder(tree[x] * 2);
    postorder(tree[x] * 2 + 1);
    cout << tree[x] << " ";
}
int main()
{
    cin >> n;
    tree[1] = 1;
    for (int i = 1; i <= n; i++) {
        cin >> tree[i * 2] >> tree[i * 2 + 1];
    }
    preorder(1);
    printf("\n");
    inorder(1);
    printf("\n");
    postorder(1);
    return 0;
}

```

