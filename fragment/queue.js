var Queue = (function () {
  'use strict';

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

}());
