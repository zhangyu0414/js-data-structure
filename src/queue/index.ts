// 队列
import { Queue } from './types';

class Node<T> {
  public element: T;

  public next: Node<T> | null;

  constructor(element: T, next: Node<T> | null) {
    this.element = element;
    this.next = next;
  }
}

export default class TheQueue<T> implements Queue<T> {
  private head: Node<T> | null;

  private tail: Node<T> | null;

  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error('队列为空!');
    }
    return this.head!.element;
  }

  enqueue(e: T) {
    if (this.tail == null) {
      this.head = new Node(e, null);
      this.tail = this.head;
    } else {
      const newNode = new Node(e, null);
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('队列为空!');
    }
    const delNode = this.head;
    this.head = this.head!.next;
    delNode!.next = null;
    if (this.head == null) {
      this.tail = null;
    }
    this.size--;
    return delNode!.element;
  }
}
