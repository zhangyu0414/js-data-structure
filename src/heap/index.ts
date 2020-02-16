// 最大堆
import { swap } from '../_util';

export default class MaxHeap<T> {
  private data: T[];

  // 比较是否相等
  private compareTo: (a: T, b: T) => number;

  constructor(arr?: T[], compareTo?: (a: T, b: T) => number) {
    this.data = arr || [];
    const defaultCompareTo = (a: T, b: T) => {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    };
    this.compareTo = compareTo || defaultCompareTo;
    this.heapify();
  }

  private heapify() {
    for (let i = this.parent(this.data.length - 1); i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  // 返回堆中元素个数
  getSize() {
    return this.data.length;
  }

  // 返回布尔值，表示堆是否为空
  isEmpty() {
    return this.data.length === 0;
  }

  // 返回当前索引元素的父亲节点的索引
  private parent(index: number): number {
    if (index === 0) {
      throw new Error('index-0 don\'t have parent');
    }
    return Math.floor((index - 1) / 2);
  }

  // 返回当前索引元素的左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 返回当前索引元素的右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 向堆中添加元素
  add(e: T) {
    this.data.push(e);
    this.shiftUp(this.getSize() - 1);
  }

  // 上浮
  private shiftUp(k: number) {
    // 父亲节点小于当前节点，需要进行上浮
    while (
      k > 0
      && this.compareTo(this.data[this.parent(k)], this.data[k]) < 0
    ) {
      swap(this.data, this.parent(k), k);
      k = this.parent(k);
    }
  }

  // 看堆中最大元素
  findMax(): T {
    if (this.isEmpty()) {
      throw new Error('max heap is empty!');
    }
    return this.data[0];
  }

  // 从堆中取出最大元素
  extractMax(): T {
    const ret = this.findMax();
    swap(this.data, 0, this.getSize() - 1);
    this.data.pop();
    this.shiftDown(0);
    return ret;
  }

  // 下沉
  private shiftDown(k: number) {
    while (this.leftChild(k) < this.getSize()) {
      let j = this.leftChild(k);
      // 存在右孩子，并且对应的元素大于左孩子
      if (
        j + 1 < this.getSize()
        && this.compareTo(this.data[j + 1], this.data[j]) > 0
      ) {
        j = this.rightChild(k);
      }
      if (this.compareTo(this.data[k], this.data[j]) > 0) {
        break;
      }
      swap(this.data, k, j);
      k = j;
    }
  }

  // 取出最大元素，替换成元素e
  replace(e: T): T {
    const ret = this.findMax();
    this.data[0] = e;
    this.shiftDown(0);
    return ret;
  }
}
