/* eslint-disable no-param-reassign */

/**
 * 交换数组中俩个元素的位置
 * @param array 数组
 * @param a 索引
 * @param b 索引
 */
export function swap(array: any[], a: number, b: number): void {
  [array[a], array[b]] = [array[b], array[a]];
}
