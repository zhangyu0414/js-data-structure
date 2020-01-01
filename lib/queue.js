(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Queue = factory());
}(this, (function () { 'use strict';

  function swap(array, a, b) {
      var _a;
      _a = [array[b], array[a]], array[a] = _a[0], array[b] = _a[1];
  }

  var Queue = (function () {
      function Queue() {
          swap([], 0, 1);
      }
      return Queue;
  }());

  return Queue;

})));
