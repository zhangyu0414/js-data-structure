(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Queue = factory()));
})(this, function() {
  'use strict';

  var Node = (function() {
    function Node(element, next) {
      this.element = element;
      this.next = next;
    }
    return Node;
  })();
  var TheQueue = (function() {
    function TheQueue() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
    TheQueue.prototype.isEmpty = function() {
      return this.size === 0;
    };
    TheQueue.prototype.getSize = function() {
      return this.size;
    };
    TheQueue.prototype.getFront = function() {
      if (this.isEmpty()) {
        throw new Error('队列为空!');
      }
      return this.head.element;
    };
    TheQueue.prototype.enqueue = function(e) {
      if (this.tail == null) {
        this.head = new Node(e, null);
        this.tail = this.head;
      } else {
        var newNode = new Node(e, null);
        this.tail.next = newNode;
        this.tail = this.tail.next;
      }
      this.size++;
    };
    TheQueue.prototype.dequeue = function() {
      if (this.isEmpty()) {
        throw new Error('队列为空!');
      }
      var delNode = this.head;
      this.head = this.head.next;
      delNode.next = null;
      if (this.head == null) {
        this.tail = null;
      }
      this.size--;
      return delNode.element;
    };
    return TheQueue;
  })();

  return TheQueue;
});
