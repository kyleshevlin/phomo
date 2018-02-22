(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.phomo = {})));
}(this, (function (exports) { 'use strict';

const h = tag => (props = {}) => (...children) => ({
  tag,
  props,
  children
});

const nodeToDOM = ({ tag, props, children }) => {
  const el = document.createElement(tag);

  for (let key in props) {
    el.setAttribute(key, props[key]);
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(nodeToDOM(child));
    }
  });

  return el
};

const render = tree => entry => {
  entry.appendChild(nodeToDOM(tree));
};

exports.h = h;
exports.render = render;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=phomo.js.map
