import Queue from '.';

describe('Queue', () => {
  test('Queue isEmpty()', () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBeTruthy();
    queue.enqueue(10);
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('Queue getSize()', () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      queue.enqueue(i);
      expect(queue.getSize()).toBe(i);
    }
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('Queue getFront()', () => {
    const queue = new Queue();
    expect(() => {
      queue.getFront();
    }).toThrow('队列为空!');
    queue.enqueue(99);
    expect(queue.getFront()).toBe(99);
    queue.enqueue(100);
    expect(queue.getFront()).toBe(99);
  });

  test('Queue enqueue()', () => {
    const queue = new Queue();
    for (let i = 1; i <= 10; i++) {
      queue.enqueue(i);
      expect(queue.getFront()).toBe(1);
    }
  });

  test('Queue dequeue()', () => {
    const queue = new Queue();
    for (let i = 1; i <= 10; i++) {
      queue.enqueue(i);
      expect(queue.dequeue()).toBe(i);
    }
    expect(() => {
      queue.dequeue();
    }).toThrow('队列为空!');
  });
});
