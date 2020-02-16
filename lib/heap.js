(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Heap = factory());
}(this, (function () { 'use strict';

  function swap(array, a, b) {
      var _a;
      _a = [array[b], array[a]], array[a] = _a[0], array[b] = _a[1];
  }

  var MaxHeap = (function () {
      function MaxHeap(arr, compareTo) {
          this.data = arr || [];
          var defaultCompareTo = function (a, b) {
              if (a === b)
                  return 0;
              return a > b ? 1 : -1;
          };
          this.compareTo = compareTo || defaultCompareTo;
          this.heapify();
      }
      MaxHeap.prototype.heapify = function () {
          for (var i = this.parent(this.data.length - 1); i >= 0; i--) {
              this.shiftDown(i);
          }
      };
      MaxHeap.prototype.getSize = function () {
          return this.data.length;
      };
      MaxHeap.prototype.isEmpty = function () {
          return this.data.length === 0;
      };
      MaxHeap.prototype.parent = function (index) {
          if (index === 0) {
              throw new Error('index-0 don\'t have parent');
          }
          return Math.floor((index - 1) / 2);
      };
      MaxHeap.prototype.leftChild = function (index) {
          return index * 2 + 1;
      };
      MaxHeap.prototype.rightChild = function (index) {
          return index * 2 + 2;
      };
      MaxHeap.prototype.add = function (e) {
          this.data.push(e);
          this.shiftUp(this.getSize() - 1);
      };
      MaxHeap.prototype.shiftUp = function (k) {
          while (k > 0
              && this.compareTo(this.data[this.parent(k)], this.data[k]) < 0) {
              swap(this.data, this.parent(k), k);
              k = this.parent(k);
          }
      };
      MaxHeap.prototype.findMax = function () {
          if (this.isEmpty()) {
              throw new Error('max heap is empty!');
          }
          return this.data[0];
      };
      MaxHeap.prototype.extractMax = function () {
          var ret = this.findMax();
          swap(this.data, 0, this.getSize() - 1);
          this.data.pop();
          this.shiftDown(0);
          return ret;
      };
      MaxHeap.prototype.shiftDown = function (k) {
          while (this.leftChild(k) < this.getSize()) {
              var j = this.leftChild(k);
              if (j + 1 < this.getSize()
                  && this.compareTo(this.data[j + 1], this.data[j]) > 0) {
                  j = this.rightChild(k);
              }
              if (this.compareTo(this.data[k], this.data[j]) > 0) {
                  break;
              }
              swap(this.data, k, j);
              k = j;
          }
      };
      MaxHeap.prototype.replace = function (e) {
          var ret = this.findMax();
          this.data[0] = e;
          this.shiftDown(0);
          return ret;
      };
      return MaxHeap;
  }());

  return MaxHeap;

})));
