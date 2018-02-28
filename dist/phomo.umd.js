(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.phomo = {})));
}(this, (function (exports) { 'use strict';

var h = function h(tag) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      return {
        tag: tag,
        props: props,
        children: children,
        key: props.key
      };
    };
  };
};

var nodeToDOM = function nodeToDOM(_ref) {
  var tag = _ref.tag,
      props = _ref.props,
      children = _ref.children;

  var el = document.createElement(tag);

  for (var key in props) {
    var value = props[key];

    if (typeof value === 'function') {
      el[key] = value;
    } else {
      el.setAttribute(key, value);
    }
  }

  children.forEach(function (child) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(nodeToDOM(child));
    }
  });

  return el;
};

var render = function render(entry) {
  return function (view) {
    entry.innerHTML = '';
    entry.appendChild(nodeToDOM(view));
  };
};

var app = function app(entry, view, actions, state) {
  var appState = state;
  var renderEntry = render(entry);
  var viewWithActions = view(bindActions(actions));

  renderEntry(viewWithActions(appState));

  function bindActions(actions) {
    return Object.keys(actions).reduce(function (boundActions, key) {
      boundActions[key] = function (value) {
        appState = Object.assign({}, appState, actions[key](value)(appState));
        renderEntry(viewWithActions(appState));
      };

      return boundActions;
    }, {});
  }
};

exports.h = h;
exports.app = app;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=phomo.umd.js.map
