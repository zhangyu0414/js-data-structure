import { Stack } from './types';

export default class TheStack<T> implements Stack<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  getSize() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  getTop() {
    if (this.isEmpty()) {
      throw new Error('当前栈中没有元素!');
    }
    return this.data[this.data.length - 1];
  }

  push(e: T) {
    this.data.push(e);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('当前栈中没有元素!');
    }
    return this.data.pop()!;
  }
}
