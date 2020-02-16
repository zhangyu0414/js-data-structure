import BST from '.';

const ADD_ARR = [5, 3, 7, 2, 4, 6, 8, 1, 9];
/**
 *          5
 *        /  \
 *       3    7
 *     /  \  / \
 *    2   4 6   8
 *   /           \
 *  1            9
 */

describe('BST', () => {
  test('BST isEmpty()', () => {
    const bst = new BST();
    expect(bst.isEmpty()).toBeTruthy();
    bst.add(10);
    expect(bst.isEmpty()).toBeFalsy();
  });

  test('BST getSize()', () => {
    const bst = new BST();
    expect(bst.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      bst.add(i);
      expect(bst.getSize()).toBe(i);
    }
    expect(bst.isEmpty()).toBeFalsy();
  });

  test('BST add()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    expect(bst.getSize()).toBe(9);
    bst.add(3); // repeat element!
    expect(bst.getSize()).toBe(9);
  });

  test('BST minimum()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    expect(bst.minimum()).toBe(1);
  });

  test('BST maximum()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    expect(bst.maximum()).toBe(9);
  });

  test('BST removeMin()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    expect(bst.removeMin()).toBe(1);
    expect(bst.minimum()).toBe(2);
    expect(bst.getSize()).toBe(8);
  });

  test('BST removeMax()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    expect(bst.removeMax()).toBe(9);
    expect(bst.maximum()).toBe(8);
    expect(bst.getSize()).toBe(8);
  });

  test('BST remove()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    bst.remove(7);
    expect(bst.contains(7)).toBeFalsy();
    bst.remove(9);
    expect(bst.contains(9)).toBeFalsy();
    expect(bst.maximum()).toBe(8);
    expect(bst.getSize()).toBe(7);
  });

  test('BST contains()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
      expect(bst.contains(item)).toBeTruthy();
    });
  });

  test('BST compareTo()', () => {
    interface Element {
      value: number;
      index: number;
    }
    const bst = new BST((a: Element, b: Element) => {
      if (a.value === b.value) return 0;
      return a.value > b.value ? 1 : -1;
    });
    ADD_ARR.forEach((item, idx) => {
      bst.add({ value: item, index: idx });
    });
    expect(bst.minimum()).toEqual({ index: 7, value: 1 });
    expect(bst.maximum()).toEqual({ index: 8, value: 9 });
    expect(bst.removeMax()).toEqual({ index: 8, value: 9 });
    expect(bst.removeMin()).toEqual({ index: 7, value: 1 });
    bst.remove({ index: 6, value: 8 });
    expect(bst.maximum()).toEqual({ index: 2, value: 7 });
  });

  test('BST preOrder()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    const preRes = [5, 3, 2, 1, 4, 7, 6, 8, 9];
    const arr: any[] = [];
    bst.preOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('BST inOrder()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    const preRes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr: any[] = [];
    bst.inOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('BST postOrder()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    const preRes = [1, 2, 4, 3, 6, 9, 8, 7, 5];
    const arr: any[] = [];
    bst.postOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('BST levelOrder()', () => {
    const bst = new BST();
    ADD_ARR.forEach(item => {
      bst.add(item);
    });
    const preRes = [5, 3, 7, 2, 4, 6, 8, 1, 9];
    const arr: any[] = [];
    bst.levelOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });
});
