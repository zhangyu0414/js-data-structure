import DoubleLinkedList from '.';

let linkedList = new DoubleLinkedList();

beforeEach(() => {
  linkedList = new DoubleLinkedList();
  for (let i = 1; i <= 10; i++) {
    linkedList.addLast(i);
  }
});

describe('DoubleLinkedList', () => {
  test('LinkedList isEmpty()', () => {
    expect(linkedList.isEmpty()).toBeFalsy();
    let size = linkedList.getSize();
    for (let i = 0; i < size; i++) {
      linkedList.removeLast();
    }
    expect(linkedList.isEmpty()).toBeTruthy();
  });

  test('LinkedList getSize()', () => {
    expect(linkedList.getSize()).toBe(10);
    linkedList.removeFirst();
    expect(linkedList.getSize()).toBe(9);
  });

  test('LinkedList add()', () => {
    linkedList.addFirst(11);
    linkedList.add(2, 8);
    expect(linkedList.getSize()).toBe(12);
    expect(linkedList.get(0)).toBe(11);
    expect(linkedList.get(2)).toBe(8);
    expect(() => {
      linkedList.add(13, 13);
    }).toThrow('无效的索引');
  });

  test('LinkedList remove()', () => {
    let size = linkedList.getSize();
    for (let i = size; i > 0; i--) {
      const delElement = linkedList.removeLast();
      expect(delElement).toBe(i);
    }
  });

  test('LinkedList get()', () => {
    expect(linkedList.getFirst()).toBe(1);
    expect(linkedList.getLast()).toBe(10);
    expect(linkedList.get(3)).toBe(4);
  });

  test('LinkedList set()', () => {
    expect(linkedList.getFirst()).toBe(1);
    linkedList.set(0, 88);
    expect(linkedList.getFirst()).toBe(88);
  });

  test('LinkedList contains()', () => {
    expect(linkedList.contains(10)).toBeTruthy();
    expect(linkedList.contains(11)).toBeFalsy();
  });

  test('LinkedList areEqual', () => {
    interface element {
      value: number;
    }
    const linkedList = new DoubleLinkedList(
      (a: element, b: element) => a.value === b.value
    );
    linkedList.addFirst({ value: 1 });
    expect(linkedList.contains({ value: 1 })).toBeTruthy();
    expect(linkedList.contains({ value: 2 })).toBeFalsy();
  });
});
