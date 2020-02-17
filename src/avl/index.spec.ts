import AVLTree from '.';

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

describe('AVLTree', () => {
  test('AVLTree isEmpty()', () => {
    const avl = new AVLTree();
    expect(avl.isEmpty()).toBeTruthy();
    avl.add(10);
    expect(avl.isEmpty()).toBeFalsy();
  });

  test('AVLTree getSize()', () => {
    const avl = new AVLTree();
    expect(avl.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      avl.add(i);
      expect(avl.getSize()).toBe(i);
    }
    expect(avl.isEmpty()).toBeFalsy();
  });

  test('AVLTree add()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    expect(avl.getSize()).toBe(9);
    avl.add(3); // repeat element!
    expect(avl.getSize()).toBe(9);
  });

  test('AVLTree minimum()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    expect(avl.minimum()).toBe(1);
  });

  test('AVLTree maximum()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    expect(avl.maximum()).toBe(9);
  });

  test('AVLTree removeMin()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    expect(avl.removeMin()).toBe(1);
    expect(avl.minimum()).toBe(2);
    expect(avl.getSize()).toBe(8);
  });

  test('AVLTree removeMax()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    expect(avl.removeMax()).toBe(9);
    expect(avl.maximum()).toBe(8);
    expect(avl.getSize()).toBe(8);
  });

  test('AVLTree remove()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    avl.remove(7);
    expect(avl.contains(7)).toBeFalsy();
    avl.remove(9);
    expect(avl.contains(9)).toBeFalsy();
    expect(avl.maximum()).toBe(8);
    expect(avl.getSize()).toBe(7);
  });

  test('AVLTree contains()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
      expect(avl.contains(item)).toBeTruthy();
    });
  });

  test('AVLTree compareTo()', () => {
    interface Element {
      value: number;
      index: number;
    }
    const avl = new AVLTree((a: Element, b: Element) => {
      if (a.value === b.value) return 0;
      return a.value > b.value ? 1 : -1;
    });
    ADD_ARR.forEach((item, idx) => {
      avl.add({ value: item, index: idx });
    });
    expect(avl.minimum()).toEqual({ index: 7, value: 1 });
    expect(avl.maximum()).toEqual({ index: 8, value: 9 });
    expect(avl.removeMax()).toEqual({ index: 8, value: 9 });
    expect(avl.removeMin()).toEqual({ index: 7, value: 1 });
    avl.remove({ index: 6, value: 8 });
    expect(avl.maximum()).toEqual({ index: 2, value: 7 });
  });

  test('AVLTree preOrder()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    const preRes = [5, 3, 2, 1, 4, 7, 6, 8, 9];
    const arr: any[] = [];
    avl.preOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('AVLTree inOrder()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    const preRes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr: any[] = [];
    avl.inOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('AVLTree postOrder()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    const preRes = [1, 2, 4, 3, 6, 9, 8, 7, 5];
    const arr: any[] = [];
    avl.postOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  test('AVLTree levelOrder()', () => {
    const avl = new AVLTree();
    ADD_ARR.forEach(item => {
      avl.add(item);
    });
    const preRes = [5, 3, 7, 2, 4, 6, 8, 1, 9];
    const arr: any[] = [];
    avl.levelOrder(item => {
      arr.push(item);
    });
    expect(arr).toEqual(preRes);
  });

  // AVL平衡二叉树测试-添加
  test.only('AVLTree should be balance bst after add', () => {
    const avl = new AVLTree();
    for (let i = 0; i < 500; i++) {
      avl.add(parseInt('' + Math.random() * 500));
      expect(avl.isBalanced()).toBeTruthy();
    }
    expect(avl.isBST()).toBeTruthy();
  })

  // AVL平衡二叉树测试-删除
  test.only('AVLTree should be balance bst  after remove', () => {
    const avl = new AVLTree();
    for (let i = 0; i < 500; i++) {
      avl.add(parseInt('' + Math.random() * 500));
    }
    [1,2,3,4,5,6].forEach(item => {
      avl.add(item);
    });
    [6, 5, 4, 3, 2, 1].forEach(item => {
      avl.remove(item);
      expect(avl.isBalanced()).toBeTruthy();
      expect(avl.isBST()).toBeTruthy();
    });
    /**
     *      4
     *     / \
     *    2  5
     *   / \  \
     *  1  3   6
     */
  })
});
