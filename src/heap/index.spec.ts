import MaxHeap from '.'


describe('MaxHeap', () => {
  test('BST isEmpty()', () => {
    const heap = new MaxHeap();
    expect(heap.isEmpty()).toBeTruthy();
    heap.add(10);
    expect(heap.isEmpty()).toBeFalsy();
  });

  test('BST getSize()', () => {
    const heap = new MaxHeap();
    expect(heap.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      heap.add(i);
      expect(heap.getSize()).toBe(i);
    }
    expect(heap.isEmpty()).toBeFalsy();
  });

  test('BST getSize()', () => {
    const heap = new MaxHeap();
    expect(heap.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      heap.add(i);
      expect(heap.getSize()).toBe(i);
    }
    expect(heap.isEmpty()).toBeFalsy();
  });

  test('BST findMax()', () => {
    const heap = new MaxHeap();
    expect(heap.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      heap.add(i);
      expect(heap.findMax()).toBe(i);
    }
  });

  test('BST extractMax()', () => {
    const heap = new MaxHeap();
    for (let i = 0; i < 500; i++) {
      heap.add(parseInt('' + Math.random() * 500));
    }
    const arr = [];
    while(!heap.isEmpty()) {
      arr.push(heap.extractMax());
    }
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i]).toBeLessThanOrEqual(arr[i - 1] as number);
    }
  });

  test('BST replace()', () => {
    const heap = new MaxHeap();
    for (let i = 1; i <= 10; i++) {
      heap.add(i);
    }
    expect(heap.findMax()).toBe(10);
    heap.replace(70)
    expect(heap.findMax()).toBe(70);
  });

  test('BST heapify()', () => {
    const heap = new MaxHeap([1,2,3,4,5,6,7]);
    const arr = [];
    while (!heap.isEmpty()) {
      arr.push(heap.extractMax());
    }
    expect(arr).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });

})
