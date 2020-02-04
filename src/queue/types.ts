export interface Queue<T> {
  // 队列是否为空 返回true，否则返回false
  isEmpty(): boolean;
  // 获取队列的尺寸
  getSize(): number;
  // 获取队列头部元素
  getFront(): T;
  // 向队列顶插入新元素
  enqueue(e: T): void;
  // 向队列顶取出元素
  dequeue(): T;
}
