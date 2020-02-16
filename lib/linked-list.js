(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.LinkedList = {}));
}(this, (function (exports) { 'use strict';

  var Node = (function () {
      function Node(element, prev, next) {
          this.element = element;
          this.prev = prev;
          this.next = next;
      }
      return Node;
  }());
  var DoubleLinkedList = (function () {
      function DoubleLinkedList(areEqual) {
          this.dummyHead = new Node(null, null, null);
          this.dummyTail = new Node(null, null, null);
          this.dummyHead.next = this.dummyTail;
          this.dummyTail.prev = this.dummyHead;
          this.size = 0;
          var defaultAreEqual = function (a, b) { return a === b; };
          this.areEqual = areEqual || defaultAreEqual;
      }
      DoubleLinkedList.prototype.isEmpty = function () {
          return this.size === 0;
      };
      DoubleLinkedList.prototype.getSize = function () {
          return this.size;
      };
      DoubleLinkedList.prototype.contains = function (e) {
          var cur = this.dummyHead.next;
          while (cur !== null && cur !== this.dummyTail) {
              if (this.areEqual(cur.element, e)) {
                  return true;
              }
              cur = cur.next;
          }
          return false;
      };
      DoubleLinkedList.prototype.get = function (index) {
          if (index < 0 || index > this.size - 1) {
              throw new Error('无效的索引');
          }
          var cur = this.dummyHead.next;
          for (var i = 0; i < index; i++) {
              cur = cur.next;
          }
          return cur.element;
      };
      DoubleLinkedList.prototype.getFirst = function () {
          return this.get(0);
      };
      DoubleLinkedList.prototype.getLast = function () {
          return this.get(this.size - 1);
      };
      DoubleLinkedList.prototype.set = function (index, e) {
          if (index < 0 || index > this.size - 1) {
              throw new Error('无效的索引');
          }
          var cur = this.dummyHead.next;
          for (var i = 0; i < index; i++) {
              cur = cur.next;
          }
          cur.element = e;
      };
      DoubleLinkedList.prototype.add = function (index, e) {
          if (index < 0 || index > this.size) {
              throw new Error('无效的索引');
          }
          var prevNode = this.dummyHead;
          for (var i = 0; i < index; i++) {
              prevNode = prevNode.next;
          }
          var newNode = new Node(e, prevNode, prevNode.next);
          prevNode.next.prev = newNode;
          prevNode.next = newNode;
          this.size += 1;
      };
      DoubleLinkedList.prototype.addFirst = function (e) {
          this.add(0, e);
      };
      DoubleLinkedList.prototype.addLast = function (e) {
          this.add(this.size, e);
      };
      DoubleLinkedList.prototype.remove = function (index) {
          if (index < 0 || index > this.size - 1) {
              throw new Error('无效的索引');
          }
          var cur = this.dummyHead.next;
          for (var i = 0; i < index; i++) {
              cur = cur.next;
          }
          cur.prev.next = cur.next;
          cur.next.prev = cur.prev;
          cur.prev = null;
          cur.next = null;
          this.size -= 1;
          return cur.element;
      };
      DoubleLinkedList.prototype.removeFirst = function () {
          return this.remove(0);
      };
      DoubleLinkedList.prototype.removeLast = function () {
          return this.remove(this.size - 1);
      };
      return DoubleLinkedList;
  }());

  var Node$1 = (function () {
      function Node(element, next) {
          this.element = element;
          this.next = next;
      }
      return Node;
  }());
  var SingleLinkedList = (function () {
      function SingleLinkedList(areEqual) {
          this.dummyHead = new Node$1(null, null);
          this.size = 0;
          var defaultAreEqual = function (a, b) { return a === b; };
          this.areEqual = areEqual || defaultAreEqual;
      }
      SingleLinkedList.prototype.isEmpty = function () {
          return this.size === 0;
      };
      SingleLinkedList.prototype.getSize = function () {
          return this.size;
      };
      SingleLinkedList.prototype.contains = function (e) {
          var cur = this.dummyHead.next;
          while (cur !== null) {
              if (this.areEqual(cur.element, e)) {
                  return true;
              }
              cur = cur.next;
          }
          return false;
      };
      SingleLinkedList.prototype.get = function (index) {
          if (index < 0 || index > this.size - 1) {
              throw new Error('无效的索引');
          }
          var cur = this.dummyHead.next;
          for (var i = 0; i < index; i++) {
              cur = cur.next;
          }
          return cur.element;
      };
      SingleLinkedList.prototype.getFirst = function () {
          return this.get(0);
      };
      SingleLinkedList.prototype.getLast = function () {
          return this.get(this.size - 1);
      };
      SingleLinkedList.prototype.set = function (index, e) {
          if (index < 0 || index > this.size - 1) {
              throw new Error('无效的索引');
          }
          var cur = this.dummyHead.next;
          for (var i = 0; i < index; i++) {
              cur = cur.next;
          }
          cur.element = e;
      };
      SingleLinkedList.prototype.add = function (index, e) {
          if (index < 0 || index > this.size) {
              throw new Error('无效的索引');
          }
          var prev = this.dummyHead;
          for (var i = 0; i < index; i++) {
              prev = prev.next;
          }
          prev.next = new Node$1(e, prev.next);
          this.size += 1;
      };
      SingleLinkedList.prototype.addFirst = function (e) {
          this.add(0, e);
      };
      SingleLinkedList.prototype.addLast = function (e) {
          this.add(this.size, e);
      };
      SingleLinkedList.prototype.remove = function (index) {
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
      SingleLinkedList.prototype.removeFirst = function () {
          return this.remove(0);
      };
      SingleLinkedList.prototype.removeLast = function () {
          return this.remove(this.size - 1);
      };
      return SingleLinkedList;
  }());

  exports.DoubleLinkedList = DoubleLinkedList;
  exports.SingleLinkedList = SingleLinkedList;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
