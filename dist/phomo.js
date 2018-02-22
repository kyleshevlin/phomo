(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.phomo = factory());
}(this, (function () { 'use strict';

const phomo = () => { console.log('Future home of Phomo'); };

return phomo;

})));
//# sourceMappingURL=phomo.js.map
