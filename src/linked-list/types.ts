export interface LinkedList<T> {
  // 链表为空 返回true，否则返回false
  isEmpty(): boolean;
  // 获取链表的长度
  getSize(): number;
  // 链表中是否包含元素e
  contains(e: T): boolean;
  // 获取链表中第i个位置的元素
  get(i: number): T;
  // 获取链表头元素
  getFirst(): T;
  // 获取链表尾元素
  getLast(): T;
  // 设置链表第i个位置的元素
  set(i: number, e: T): void;
  // 向链表第i个位置添加元素
  add(i: number, e: T): void;
  // 向链表头插入元素
  addFirst(e: T): void;
  // 向链表尾插入元素
  addLast(e: T): void;
  // 删除链表第i个位置上的元素
  remove(i: number): T;
  // 删除链表头元素
  removeFirst(): T;
  // 删除链表尾元素
  removeLast(): T;
}
