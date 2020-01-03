export interface List<T> {
  // 链表为空 返回true，否则返回false
  isEmpty(): boolean;
  // 获取链表的长度
  getSize(): number;
  // 清空链表
  clear(): void;
  // 链表中是否包含元素e
  contains(e: T): boolean;
  // 获取链表中第i个位置的元素
  get(i: number): T;
  // 向链表第i个位置添加元素
  add(i: number, e: T): void;
  // 删除链表第i个位置上的元素
  delete(i: number): T;
}
