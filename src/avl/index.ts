// AVL 平衡二叉树
/* eslint-disable no-lonely-if */

type NodeOrNull<T> = Node<T> | null;

// 节点
class Node<T> {
  public element: T;

  public left: NodeOrNull<T>;

  public right: NodeOrNull<T>;

  public height: number; // 高度

  constructor(element: T, left: NodeOrNull<T>, right: NodeOrNull<T>) {
    this.element = element;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}

export default class AVLTree<T> {
  private root: NodeOrNull<T>;

  private size: number;

  // 比较是否相等
  private compareTo: (a: T, b: T) => number;

  constructor(compareTo?: (a: T, b: T) => number) {
    this.root = null;
    this.size = 0;
    const defaultCompareTo = (a: T, b: T) => {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    };
    this.compareTo = compareTo || defaultCompareTo;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  // 获取节点的高度，空节点应返回0
  private getHeight(node: NodeOrNull<T>) {
    if (node == null) {
      return 0;
    }
    return node.height;
  }

  // 获取节点的平衡因子(左右子树的高度之差)
  private getBalanceFactor(node: NodeOrNull<T>) {
    if (node == null) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // 判断该二叉树是否是一颗二叉搜索树, 用于测试
  public isBST(): boolean {
    const arr: T[] = [];
    this.inOrder((i) => arr.push(i));
    for (let i = 1; i < arr.length; i++) {
      if (this.compareTo(arr[i], arr[i - 1]) < 0) {
        return false;
      }
    }
    return true;
  }

  // 判断该二叉树是否平衡，用于测试
  public isBalanced(): boolean {
    return this._isBalanced(this.root);
  }


  private _isBalanced(node: NodeOrNull<T>): boolean {
    if (node == null) {
      return true;
    }
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) {
      return false;
    }
    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }

  /**
   * 将当前节点为根的二叉树进行右旋转
   *         y                           x
   *       /  \                         / \
   *      x   T4                       z   y
   *     / \       ------------->    / \  / \
   *    z  T3                      T1 T2 T3 T4
   *   / \
   *  T1 T2
   */
  private rightRotate(y: Node<T>): Node<T> {
    const x = y.left!;
    const t3 = x.right;
    x.right = y;
    y.left = t3;

    // 更新height值
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    return x;
  }

  /**
   * 将当前节点为根的二叉树进行左旋转
   *         y                           x
   *       /  \                         / \
   *      T1   x                       y   z
   *          / \    ------------->   / \  / \
   *        T2  z                   T1 T2 T3 T4
   *           / \
   *          T3 T4
   */
  private leftRotate(y: Node<T>): Node<T> {
    const x = y.right!;
    const t2 = x.left;
    x.left = y;
    y.right = t2;

    // 更新height值
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    return x;
  }

  // 向二叉搜索树添加元素
  add(e: T) {
    this.root = this._add(this.root, e);
  }

  private _add(root: NodeOrNull<T>, e: T): Node<T> {
    if (root == null) {
      this.size++;
      return new Node(e, null, null);
    }
    if (this.compareTo(root.element, e) > 0) {
      root.left = this._add(root.left, e);
    }
    if (this.compareTo(root.element, e) < 0) {
      root.right = this._add(root.right, e);
    }
    // 更新height
    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    // 计算平衡因子
    const balanceFactor = this.getBalanceFactor(root);
    // LL
    if (balanceFactor > 1 && this.getBalanceFactor(root.left) >= 0) {
      return this.rightRotate(root);
    }
    // RR
    if (balanceFactor < -1 && this.getBalanceFactor(root.right) <= 0) {
      return this.leftRotate(root);
    }
    // LR
    if (balanceFactor > 1 && this.getBalanceFactor(root.left) < 0) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }
    // RL
    if (balanceFactor < -1 && this.getBalanceFactor(root.right) > 0) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }
    return root;
  }

  // 最小元素
  minimum(): T {
    if (this.size === 0) {
      throw new Error('bst is empty!');
    }
    return this._minimum(this.root!).element;
  }

  private _minimum(root: Node<T>): Node<T> {
    if (root.left == null) {
      return root;
    }
    return this._minimum(root.left);
  }

  // 最大元素
  maximum(): T {
    if (this.size === 0) {
      throw new Error('bst is empty!');
    }
    return this._maximum(this.root!).element;
  }

  private _maximum(root: Node<T>): Node<T> {
    if (root.right == null) {
      return root;
    }
    return this._maximum(root.right);
  }

  // 删除最小值
  removeMin(): T {
    const ret = this.minimum();
    this.root = this._removeMin(this.root!);
    return ret;
  }

  private _removeMin(root: Node<T>): NodeOrNull<T> {
    if (root.left == null) {
      const rightNode = root.right;
      root.right = null;
      this.size--;
      return rightNode;
    }
    root.left = this._removeMin(root.left);
    return root;
  }

  // 删除最大值
  removeMax(): T {
    const ret = this.maximum();
    this.root = this._removeMax(this.root!);
    return ret;
  }

  private _removeMax(root: Node<T>): NodeOrNull<T> {
    if (root.right == null) {
      const leftNode = root.left;
      root.left = null;
      this.size--;
      return leftNode;
    }
    root.right = this._removeMax(root.right);
    return root;
  }

  // 删除指定值
  remove(e: T) {
    if (this.size === 0) {
      throw new Error('bst is empty!');
    }
    this.root = this._remove(this.root, e);
  }

  private _remove(root: NodeOrNull<T>, e: T): NodeOrNull<T> {
    if (root == null) {
      return null;
    }
    let retNode = null;
    // 小于当前节点
    if (this.compareTo(root.element, e) > 0) {
      root.left = this._remove(root.left, e);
      retNode = root;
    } else if (this.compareTo(root.element, e) < 0) {
      // 大于当前节点
      root.right = this._remove(root.right, e);
      retNode = root;
    } else {
      // 相等时
      // 1. 只有右节点
      if (root.left == null) {
        const rightNode = root.right;
        root.right = null;
        this.size--;
        retNode = rightNode;
      } else if (root.right == null) {
        // 2. 只有左节点
        const leftNode = root.left;
        root.left = null;
        this.size--;
        retNode = leftNode;
      } else {
        // 3. 左右都存在子树
        const cur = this._minimum(root.right);
        cur.right = this._remove(root.right, cur.element);
        cur.left = root.left;
        root.left = null;
        root.right = null;
        retNode = cur;
      }
    }
    if (retNode == null) {
      return null;
    }
    // 更新height
    retNode.height = 1 + Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));
    // 计算平衡因子
    const balanceFactor = this.getBalanceFactor(retNode);
    // LL
    if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
      return this.rightRotate(retNode);
    }
    // RR
    if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
      return this.leftRotate(retNode);
    }
    // LR
    if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
      retNode.left = this.leftRotate(retNode.left!);
      return this.rightRotate(retNode);
    }
    // RL
    if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
      retNode.right = this.rightRotate(retNode.right!);
      return this.leftRotate(retNode);
    }
    return retNode;
  }

  // 是否包含元素
  contains(e: T): boolean {
    return this._contains(this.root, e);
  }

  private _contains(root: NodeOrNull<T>, e: T): boolean {
    if (root == null) {
      return false;
    }
    // 等于
    if (this.compareTo(root.element, e) === 0) {
      return true;
    }
    // e 小于 当前节点
    if (this.compareTo(root.element, e) > 0) {
      return this._contains(root.left, e);
    }
    // e 大于 当前节点
    return this._contains(root.right, e);
  }

  // 前序遍历
  preOrder(callback: (e: T) => void) {
    this._preOrder(this.root, callback);
  }

  private _preOrder(root: NodeOrNull<T>, callback: (e: T) => void) {
    if (root == null) {
      return;
    }
    callback(root.element);
    this._preOrder(root.left, callback);
    this._preOrder(root.right, callback);
  }

  // 中序遍历
  inOrder(callback: (e: T) => void) {
    this._inOrder(this.root, callback);
  }

  private _inOrder(root: NodeOrNull<T>, callback: (e: T) => void) {
    if (root == null) {
      return;
    }
    this._inOrder(root.left, callback);
    callback(root.element);
    this._inOrder(root.right, callback);
  }

  // 后序遍历
  postOrder(callback: (e: T) => void) {
    this._postOrder(this.root, callback);
  }

  private _postOrder(root: NodeOrNull<T>, callback: (e: T) => void) {
    if (root == null) {
      return;
    }
    this._postOrder(root.left, callback);
    this._postOrder(root.right, callback);
    callback(root.element);
  }

  // 层序遍历
  levelOrder(callback: (e: T) => void) {
    if (this.root == null) {
      return;
    }
    const queue = [this.root];
    while (queue.length) {
      const node: Node<T> = queue.shift()!;
      callback(node.element);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}
