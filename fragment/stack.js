var Stack = (function() {
  'use strict';

  var TheStack = (function() {
    function TheStack() {
      this.data = [];
    }
    TheStack.prototype.getSize = function() {
      return this.data.length;
    };
    TheStack.prototype.isEmpty = function() {
      return this.data.length === 0;
    };
    TheStack.prototype.getTop = function() {
      if (this.isEmpty()) {
        throw new Error('当前栈中没有元素!');
      }
      return this.data[this.data.length - 1];
    };
    TheStack.prototype.push = function(e) {
      this.data.push(e);
    };
    TheStack.prototype.pop = function() {
      if (this.isEmpty()) {
        throw new Error('当前栈中没有元素!');
      }
      return this.data.pop();
    };
    return TheStack;
  })();

  return TheStack;
})();
