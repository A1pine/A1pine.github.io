---
title: 模板-归并排序
date: 2019-04-28 13:28:42
tags: [数据结构,算法,排序,模板,递归]
categories: 算法与数据结构
---

人老了之后真是做什么都事倍功半... 一个归并排序调试了我将近一个小时..
<!-- more -->
先贴代码...

```CPP
#include <iostream>

using namespace std;
int a[101], temp[101];
int n;
void Merge(int l, int r, int mid) {
    int k = 1, i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        a[i] < a[j] ? temp[k++] = a[i++] : temp[k++] = a[j++];
    }
    while (i <= mid) temp[k++] = a[i++];
    while (j <= r) temp[k++] = a[j++];
    for (int i = 1; i <= k - 1; i++) {
        a[l + i - 1] = temp[i];
    }
}
void merge_sort(int l, int r) {

    if (l < r) {
        int center = (l + r) / 2;
        merge_sort(l, center);
        merge_sort(center + 1, r);
        Merge(l, r, center);
    }

}
int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    merge_sort(1, n);
    for (int i = 1; i <= n; i++) {
        cout << a[i] << " ";
    }

}
```
遇到的问题

* 左边界和右边界写反（我也不知道我在干什么...）
* 比较的时候实际上是左半边和右半边对应比较，然后较小的那一边的数字填入临时数组，指针往后移动一位
* 在递归过程里，数组的元素是固定不变的，变的是通过一个临时数组存放后返回的下标，也即是 顺摆放序。
* 递归边界（左右相等）

 
