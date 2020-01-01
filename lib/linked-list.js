(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.LinkedList = factory());
}(this, (function () { 'use strict';

	var LinkedList = (function () {
	    function LinkedList() {
	    }
	    return LinkedList;
	}());

	return LinkedList;

})));
