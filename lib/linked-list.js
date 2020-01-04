(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.LinkedList = {})));
})(this, function(exports) {
  'use strict';

  var CircularLinkedList = (function() {
    function CircularLinkedList() {}
    return CircularLinkedList;
  })();

  var DoubleLinkedList = (function() {
    function DoubleLinkedList() {}
    return DoubleLinkedList;
  })();

  var Node = (function() {
    function Node(element, next) {
      this.element = element;
      this.next = next;
    }
    return Node;
  })();
  var SingleLinkedList = (function() {
    function SingleLinkedList() {
      this.dummyHead = new Node(null, null);
      this.size = 0;
    }
    SingleLinkedList.prototype.isEmpty = function() {
      return this.size === 0;
    };
    SingleLinkedList.prototype.getSize = function() {
      return this.size;
    };
    SingleLinkedList.prototype.contains = function(e) {
      var cur = this.dummyHead;
      while (cur !== null) {
        if (cur.element === e) {
          return true;
        }
        cur = cur.next;
      }
      return false;
    };
    SingleLinkedList.prototype.get = function(index) {
      if (index < 0 || index > this.size - 1) {
        throw new Error('无效的索引');
      }
      var cur = this.dummyHead.next;
      for (var i = 0; i < this.size; i++) {
        cur = cur.next;
      }
      return cur.element;
    };
    SingleLinkedList.prototype.getFirst = function() {
      return this.get(0);
    };
    SingleLinkedList.prototype.getLast = function() {
      return this.get(this.size - 1);
    };
    SingleLinkedList.prototype.set = function(index, e) {
      if (index < 0 || index > this.size - 1) {
        throw new Error('无效的索引');
      }
      var cur = this.dummyHead.next;
      for (var i = 0; i < index; i++) {
        cur = cur.next;
      }
      cur.element = e;
    };
    SingleLinkedList.prototype.add = function(index, e) {
      if (index < 0 || index > this.size) {
        throw new Error('无效的索引');
      }
      var prev = this.dummyHead;
      for (var i = 0; i < index; i++) {
        prev = prev.next;
      }
      prev.next = new Node(e, prev.next);
      this.size += 1;
    };
    SingleLinkedList.prototype.addFirst = function(e) {
      this.add(0, e);
    };
    SingleLinkedList.prototype.addLast = function(e) {
      this.add(this.size, e);
    };
    SingleLinkedList.prototype.remove = function(index) {
      if (index < 0 || index > this.size - 1) {
        throw new Error('无效的索引');
      }
      var prev = this.dummyHead;
      for (var i = 0; i < index; i++) {
        prev = prev.next;
      }
      var delNode = prev.next;
      prev.next = delNode.next;
      delNode.next = null;
      this.size -= 1;
      return delNode.element;
    };
    SingleLinkedList.prototype.removeFirst = function() {
      return this.remove(0);
    };
    SingleLinkedList.prototype.removeLast = function() {
      return this.remove(this.size - 1);
    };
    return SingleLinkedList;
  })();

  exports.CircularLinkedList = CircularLinkedList;
  exports.DoubleLinkedList = DoubleLinkedList;
  exports.SingleLinkedList = SingleLinkedList;

  Object.defineProperty(exports, '__esModule', { value: true });
});
