export interface Stack<T> {
  // 栈是否为空 返回true，否则返回false
  isEmpty(): boolean;
  // 获取栈的尺寸
  getSize(): number;
  // 获取栈顶元素
  getTop(): T;
  // 向栈顶插入新元素
  push(e: T): void;
  // 向栈顶取出元素
  pop(): T;
}
