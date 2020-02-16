(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Bst = factory()));
})(this, function() {
  'use strict';

  var Node = (function() {
    function Node(element, left, right) {
      this.element = element;
      this.left = left;
      this.right = right;
    }
    return Node;
  })();
  var BST = (function() {
    function BST(compareTo) {
      this.root = null;
      this.size = 0;
      var defaultCompareTo = function(a, b) {
        if (a === b) return 0;
        return a > b ? 1 : -1;
      };
      this.compareTo = compareTo || defaultCompareTo;
    }
    BST.prototype.getSize = function() {
      return this.size;
    };
    BST.prototype.isEmpty = function() {
      return this.size === 0;
    };
    BST.prototype.add = function(e) {
      this.root = this._add(this.root, e);
    };
    BST.prototype._add = function(root, e) {
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
      return root;
    };
    BST.prototype.minimum = function() {
      if (this.size === 0) {
        throw new Error('bst is empty!');
      }
      return this._minimum(this.root).element;
    };
    BST.prototype._minimum = function(root) {
      if (root.left == null) {
        return root;
      }
      return this._minimum(root.left);
    };
    BST.prototype.maximum = function() {
      if (this.size === 0) {
        throw new Error('bst is empty!');
      }
      return this._maximum(this.root).element;
    };
    BST.prototype._maximum = function(root) {
      if (root.right == null) {
        return root;
      }
      return this._maximum(root.right);
    };
    BST.prototype.removeMin = function() {
      var ret = this.minimum();
      this.root = this._removeMin(this.root);
      return ret;
    };
    BST.prototype._removeMin = function(root) {
      if (root.left == null) {
        var rightNode = root.right;
        root.right = null;
        this.size--;
        return rightNode;
      }
      root.left = this._removeMin(root.left);
      return root;
    };
    BST.prototype.removeMax = function() {
      var ret = this.maximum();
      this.root = this._removeMax(this.root);
      return ret;
    };
    BST.prototype._removeMax = function(root) {
      if (root.right == null) {
        var leftNode = root.left;
        root.left = null;
        this.size--;
        return leftNode;
      }
      root.right = this._removeMax(root.right);
      return root;
    };
    BST.prototype.remove = function(e) {
      if (this.size === 0) {
        throw new Error('bst is empty!');
      }
      this.root = this._remove(this.root, e);
    };
    BST.prototype._remove = function(root, e) {
      if (root == null) {
        return null;
      }
      if (this.compareTo(root.element, e) > 0) {
        root.left = this._remove(root.left, e);
        return root;
      }
      if (this.compareTo(root.element, e) < 0) {
        root.right = this._remove(root.right, e);
        return root;
      }
      if (root.left == null) {
        var rightNode = root.right;
        root.right = null;
        this.size--;
        return rightNode;
      }
      if (root.right == null) {
        var leftNode = root.left;
        root.left = null;
        this.size--;
        return leftNode;
      }
      var cur = this._minimum(root.right);
      cur.right = this._removeMin(root.right);
      cur.left = root.left;
      root.left = null;
      root.right = null;
      return cur;
    };
    BST.prototype.contains = function(e) {
      return this._contains(this.root, e);
    };
    BST.prototype._contains = function(root, e) {
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
    BST.prototype.preOrder = function(callback) {
      this._preOrder(this.root, callback);
    };
    BST.prototype._preOrder = function(root, callback) {
      if (root == null) {
        return;
      }
      callback(root.element);
      this._preOrder(root.left, callback);
      this._preOrder(root.right, callback);
    };
    BST.prototype.inOrder = function(callback) {
      this._inOrder(this.root, callback);
    };
    BST.prototype._inOrder = function(root, callback) {
      if (root == null) {
        return;
      }
      this._inOrder(root.left, callback);
      callback(root.element);
      this._inOrder(root.right, callback);
    };
    BST.prototype.postOrder = function(callback) {
      this._postOrder(this.root, callback);
    };
    BST.prototype._postOrder = function(root, callback) {
      if (root == null) {
        return;
      }
      this._postOrder(root.left, callback);
      this._postOrder(root.right, callback);
      callback(root.element);
    };
    BST.prototype.levelOrder = function(callback) {
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
    return BST;
  })();

  return BST;
});
