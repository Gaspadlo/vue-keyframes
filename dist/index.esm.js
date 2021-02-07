"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = install;

var _d3Interpolate = require("d3-interpolate");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  directive: 'keyframes',
  keyframesAttrName: 'data-keyframes',
  pxOffset: 0,
  screenOffset: 0,
  ratioOffset: 0,
  updateEveryMS: 48,
  transitionTimingFunction: 'ease-out',
  transitionProperty: 'all',
  transitionDuration: '250ms',
  scrollContext: global || window
};

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Vue.directive(_objectSpread(_objectSpread({}, defaultOptions), options).directive, {
    inserted: function inserted(el, binding, vnode) {
      updateInstance(el, binding, vnode);
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.componentOptions) {
        vnode.componentOptions.scrollContext.removeEventListener('scroll', vnode.updateElementStyles);
      }

      updateInstance(el, binding, vnode);
    },
    unbind: function unbind(el, binding, vnode) {
      vnode.componentOptions.scrollContext.removeEventListener('scroll', vnode.updateElementStyles);
    }
  });

  function updateInstance(el, binding, vnode) {
    vnode.componentOptions = _objectSpread(_objectSpread({}, defaultOptions), binding.value);
    var opt = vnode.componentOptions;
    updateElementsList(opt, vnode, el.querySelectorAll("[".concat(opt.keyframesAttrName, "]")));

    vnode.updateElementStyles = function () {
      return updateStyles(opt, vnode, el, vnode._keyFramesElements);
    };

    vnode.componentOptions.scrollContext.addEventListener('scroll', vnode.updateElementStyles);
    Vue.nextTick(vnode.updateElementStyles);
  }

  function updateElementsList(opt, vnode, nodeList) {
    if (vnode._keyFramesElements && vnode._keyFramesElements.length) {
      for (var i in vnode._keyFramesElements) {
        if (vnode._keyFramesElements.hasOwnProperty(i) && document.contains(vnode._keyFramesElements[i])) {
          vnode._keyFramesElements.splice(i, 1);
        }
      }
    } else {
      vnode._keyFramesElements = [];
    }

    Vue.nextTick(function () {
      if (nodeList instanceof NodeList) {
        var _iterator = _createForOfIteratorHelper(nodeList),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;

            if (node.hasAttribute(opt.keyframesAttrName)) {
              try {
                node._keyFrames = _objectSpread({}, JSON.parse(node.getAttribute(opt.keyframesAttrName)));
                node.style.transitionTimingFunction = opt.transitionTimingFunction;
                node.style.transitionProperty = opt.transitionProperty;
                node.style.transitionDuration = opt.transitionDuration;

                vnode._keyFramesElements.push(node);
              } catch (e) {
                console.warn(node, 'Invalid JSON keyframes!', e);
              }

              node.removeAttribute(opt.keyframesAttrName);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    });
  }
}

function updateStyles(opt, vnode, wrapper, nodes) {
  var thisTime = Date.now();

  if (!vnode._keyFramesUpdater) {
    vnode._keyFramesUpdater = {};
  }

  if (nodes.length && thisTime - vnode._keyFramesUpdater.lastTime < opt.updateEveryMS) {
    if (vnode._keyFramesUpdater.timeout) {
      clearTimeout(vnode._keyFramesUpdater.timeout);
    }

    vnode._keyFramesUpdater.timeout = setTimeout(function () {
      return updateStyles(opt, vnode, wrapper, nodes);
    }, opt.updateEveryMS);
    return;
  }

  window.requestAnimationFrame(function () {
    vnode._keyFramesUpdater.lastTime = thisTime;
    var wrapperRect = wrapper.getBoundingClientRect();
    var offset = opt.pxOffset + wrapperRect.height * opt.ratioOffset + document.documentElement.clientHeight * (opt.screenOffset / 100);
    var crossedRatio = ratioMinMax(1 - (wrapperRect.height + wrapperRect.y + offset) / wrapperRect.height);
    var keyframe = crossedRatio * 100;

    var _iterator2 = _createForOfIteratorHelper(nodes),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var node = _step2.value;
        var neighbours = [];

        for (var _i = 0, _Object$keys = Object.keys(node._keyFrames); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          var doBreak = false;

          if (Number(key) < keyframe) {
            neighbours.push(key);
          } else {
            neighbours.push(key);
            doBreak = true;
          }

          if (neighbours.length > 2) {
            neighbours.shift();
          }

          if (doBreak) {
            break;
          }
        }

        var ratio = ratioMinMax((keyframe - Number(neighbours[0])) / (Number(neighbours[1]) - Number(neighbours[0])));
        var resultStyle = {};
        var secondRun = false;

        for (var _i2 = 0, _neighbours = neighbours; _i2 < _neighbours.length; _i2++) {
          var frame = _neighbours[_i2];

          for (var _i3 = 0, _Object$entries = Object.entries(node._keyFrames[frame]); _i3 < _Object$entries.length; _i3++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
                _key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (secondRun) {
              resultStyle[_key] = (0, _d3Interpolate.interpolate)(resultStyle[_key], value)(ratio);
            } else {
              resultStyle[_key] = value;
            }
          }

          secondRun = true;
        }

        for (var style in resultStyle) {
          node.style[style] = resultStyle[style];
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
}

function ratioMinMax(value) {
  return Math.min(1, Math.max(0, value));
}