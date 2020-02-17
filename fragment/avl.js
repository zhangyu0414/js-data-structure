var Avl = (function () {
  'use strict';

  var Node = (function () {
      function Node(element, left, right) {
          this.element = element;
          this.left = left;
          this.right = right;
          this.height = 1;
      }
      return Node;
  }());
  var AVLTree = (function () {
      function AVLTree(compareTo) {
          this.root = null;
          this.size = 0;
          var defaultCompareTo = function (a, b) {
              if (a === b)
                  return 0;
              return a > b ? 1 : -1;
          };
          this.compareTo = compareTo || defaultCompareTo;
      }
      AVLTree.prototype.getSize = function () {
          return this.size;
      };
      AVLTree.prototype.isEmpty = function () {
          return this.size === 0;
      };
      AVLTree.prototype.getHeight = function (node) {
          if (node == null) {
              return 0;
          }
          return node.height;
      };
      AVLTree.prototype.getBalanceFactor = function (node) {
          if (node == null) {
              return 0;
          }
          return this.getHeight(node.left) - this.getHeight(node.right);
      };
      AVLTree.prototype.isBST = function () {
          var arr = [];
          this.inOrder(function (i) { return arr.push(i); });
          for (var i = 1; i < arr.length; i++) {
              if (this.compareTo(arr[i], arr[i - 1]) < 0) {
                  return false;
              }
          }
          return true;
      };
      AVLTree.prototype.isBalanced = function () {
          return this._isBalanced(this.root);
      };
      AVLTree.prototype._isBalanced = function (node) {
          if (node == null) {
              return true;
          }
          var balanceFactor = this.getBalanceFactor(node);
          if (Math.abs(balanceFactor) > 1) {
              return false;
          }
          return this._isBalanced(node.left) && this._isBalanced(node.right);
      };
      AVLTree.prototype.rightRotate = function (y) {
          var x = y.left;
          var t3 = x.right;
          x.right = y;
          y.left = t3;
          y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
          x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
          return x;
      };
      AVLTree.prototype.leftRotate = function (y) {
          var x = y.right;
          var t2 = x.left;
          x.left = y;
          y.right = t2;
          y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
          x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
          return x;
      };
      AVLTree.prototype.add = function (e) {
          this.root = this._add(this.root, e);
      };
      AVLTree.prototype._add = function (root, e) {
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
          root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
          var balanceFactor = this.getBalanceFactor(root);
          if (balanceFactor > 1 && this.getBalanceFactor(root.left) >= 0) {
              return this.rightRotate(root);
          }
          if (balanceFactor < -1 && this.getBalanceFactor(root.right) <= 0) {
              return this.leftRotate(root);
          }
          if (balanceFactor > 1 && this.getBalanceFactor(root.left) < 0) {
              root.left = this.leftRotate(root.left);
              return this.rightRotate(root);
          }
          if (balanceFactor < -1 && this.getBalanceFactor(root.right) > 0) {
              root.right = this.rightRotate(root.right);
              return this.leftRotate(root);
          }
          return root;
      };
      AVLTree.prototype.minimum = function () {
          if (this.size === 0) {
              throw new Error('bst is empty!');
          }
          return this._minimum(this.root).element;
      };
      AVLTree.prototype._minimum = function (root) {
          if (root.left == null) {
              return root;
          }
          return this._minimum(root.left);
      };
      AVLTree.prototype.maximum = function () {
          if (this.size === 0) {
              throw new Error('bst is empty!');
          }
          return this._maximum(this.root).element;
      };
      AVLTree.prototype._maximum = function (root) {
          if (root.right == null) {
              return root;
          }
          return this._maximum(root.right);
      };
      AVLTree.prototype.removeMin = function () {
          var ret = this.minimum();
          this.root = this._removeMin(this.root);
          return ret;
      };
      AVLTree.prototype._removeMin = function (root) {
          if (root.left == null) {
              var rightNode = root.right;
              root.right = null;
              this.size--;
              return rightNode;
          }
          root.left = this._removeMin(root.left);
          return root;
      };
      AVLTree.prototype.removeMax = function () {
          var ret = this.maximum();
          this.root = this._removeMax(this.root);
          return ret;
      };
      AVLTree.prototype._removeMax = function (root) {
          if (root.right == null) {
              var leftNode = root.left;
              root.left = null;
              this.size--;
              return leftNode;
          }
          root.right = this._removeMax(root.right);
          return root;
      };
      AVLTree.prototype.remove = function (e) {
          if (this.size === 0) {
              throw new Error('bst is empty!');
          }
          this.root = this._remove(this.root, e);
      };
      AVLTree.prototype._remove = function (root, e) {
          if (root == null) {
              return null;
          }
          var retNode = null;
          if (this.compareTo(root.element, e) > 0) {
              root.left = this._remove(root.left, e);
              retNode = root;
          }
          else if (this.compareTo(root.element, e) < 0) {
              root.right = this._remove(root.right, e);
              retNode = root;
          }
          else {
              if (root.left == null) {
                  var rightNode = root.right;
                  root.right = null;
                  this.size--;
                  retNode = rightNode;
              }
              else if (root.right == null) {
                  var leftNode = root.left;
                  root.left = null;
                  this.size--;
                  retNode = leftNode;
              }
              else {
                  var cur = this._minimum(root.right);
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
          retNode.height = 1 + Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));
          var balanceFactor = this.getBalanceFactor(retNode);
          if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
              return this.rightRotate(retNode);
          }
          if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
              return this.leftRotate(retNode);
          }
          if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
              retNode.left = this.leftRotate(retNode.left);
              return this.rightRotate(retNode);
          }
          if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
              retNode.right = this.rightRotate(retNode.right);
              return this.leftRotate(retNode);
          }
          return retNode;
      };
      AVLTree.prototype.contains = function (e) {
          return this._contains(this.root, e);
      };
      AVLTree.prototype._contains = function (root, e) {
          if (root == null) {
              return false;
          }
          if (this.compareTo(root.element, e) === 0) {
              return true;
          }
          if (this.compareTo(root.element, e) > 0) {
              return this._contains(root.left, e);
          }
          return this._contains(root.right, e);
      };
      AVLTree.prototype.preOrder = function (callback) {
          this._preOrder(this.root, callback);
      };
      AVLTree.prototype._preOrder = function (root, callback) {
          if (root == null) {
              return;
          }
          callback(root.element);
          this._preOrder(root.left, callback);
          this._preOrder(root.right, callback);
      };
      AVLTree.prototype.inOrder = function (callback) {
          this._inOrder(this.root, callback);
      };
      AVLTree.prototype._inOrder = function (root, callback) {
          if (root == null) {
              return;
          }
          this._inOrder(root.left, callback);
          callback(root.element);
          this._inOrder(root.right, callback);
      };
      AVLTree.prototype.postOrder = function (callback) {
          this._postOrder(this.root, callback);
      };
      AVLTree.prototype._postOrder = function (root, callback) {
          if (root == null) {
              return;
          }
          this._postOrder(root.left, callback);
          this._postOrder(root.right, callback);
          callback(root.element);
      };
      AVLTree.prototype.levelOrder = function (callback) {
          if (this.root == null) {
              return;
          }
          var queue = [this.root];
          while (queue.length) {
              var node = queue.shift();
              callback(node.element);
              if (node.left) {
                  queue.push(node.left);
              }
              if (node.right) {
                  queue.push(node.right);
              }
          }
      };
      return AVLTree;
  }());

  return AVLTree;

}());
