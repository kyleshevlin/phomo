'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.h = h;
exports.render = render;
//# sourceMappingURL=phomo.js.map
