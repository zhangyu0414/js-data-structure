// 单链表
import { LinkedList } from '../types';

class Node<T> {
  public element: T;

  public next: Node<T> | null;

  constructor(element: T, next: Node<T> | null) {
    this.element = element;
    this.next = next;
  }
}

export default class SingleLinkedList<T> implements LinkedList<T> {
  // 虚拟头头结点(头指针，用于添加dv、删除统一操作)
  private dummyHead: Node<T>;

  // 链表中元素的数量
  private size: number;

  // 比较是否相等
  private areEqual: (a: T, b: T) => boolean;

  constructor(areEqual?: (a: T, b: T) => boolean) {
    this.dummyHead = new Node(null!, null);
    this.size = 0;
    const defaultAreEqual = (a: T, b: T) => a === b;
    this.areEqual = areEqual || defaultAreEqual;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  public contains(e: T): boolean {
    let cur: Node<T> | null = this.dummyHead.next;
    while (cur !== null) {
      if (this.areEqual(cur.element, e)) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  public get(index: number): T {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    return cur!.element;
  }

  public getFirst(): T {
    return this.get(0);
  }

  public getLast(): T {
    return this.get(this.size - 1);
  }

  public set(index: number, e: T): void {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    cur!.element = e;
  }

  public add(index: number, e: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('无效的索引');
    }
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    prev.next = new Node(e, prev.next);
    this.size += 1;
  }

  public addFirst(e: T): void {
    this.add(0, e);
  }

  public addLast(e: T): void {
    this.add(this.size, e);
  }

  public remove(index: number): T {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const delNode = prev.next!;
    prev.next = delNode.next;
    delNode.next = null;
    this.size -= 1;
    return delNode.element;
  }

  public removeFirst(): T {
    return this.remove(0);
  }

  public removeLast(): T {
    return this.remove(this.size - 1);
  }
}
