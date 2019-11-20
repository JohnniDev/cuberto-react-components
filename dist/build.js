(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, , ], factory);
	else if(typeof exports === 'object')
		exports["CubertoReactComponents"] = factory(require("react"), require("classnames"), require("react-dom"));
	else
		root["CubertoReactComponents"] = factory(root["React"], root["classnames"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(6);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(8)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// Module
exports.push([module.i, ".cub-dropdown {\n    position: relative;\n}\n\n.cub-dropdown-control-wrapper {\n    display: flex;\n    align-items: center;\n}\n\n.cub-dropdown:not(.-opened) .cub-dropdown-control:not(:disabled):not(:focus) {\n    cursor: pointer;\n}\n\ninput.cub-dropdown-control:focus {\n    outline: none;\n}\n\n.cub-dropdown-menu {\n    display: none;\n    position: absolute;\n    top: 100%;\n    min-width: 100%;\n    background-color: #fff;\n}\n\n.cub-dropdown-menu.-empty {\n    white-space: nowrap;\n}\n\n.cub-dropdown-menu.-open {\n    display: block;\n}\n\n.cub-dropdown-items {\n    max-height: 300px;\n    overflow: auto;\n}\n\n.cub-dropdown-item {\n    display: block;\n    width: 100%;\n    text-align: left;\n    border: none;\n    background-color: transparent;\n    cursor: pointer;\n    user-select: none;\n}", ""]);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"React","commonjs":"react","commonjs2":"react"}
var external_root_React_commonjs_react_commonjs2_react_ = __webpack_require__(0);
var external_root_React_commonjs_react_commonjs2_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs_react_commonjs2_react_);

// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs":"react-dom","commonjs2":"react-dom"}
var external_root_ReactDOM_commonjs_react_dom_commonjs2_react_dom_ = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/shallowequal/index.js
var shallowequal = __webpack_require__(2);
var shallowequal_default = /*#__PURE__*/__webpack_require__.n(shallowequal);

// EXTERNAL MODULE: external {"root":"classnames","commonjs":"classnames","commonjs2":"classnames"}
var external_root_classnames_commonjs_classnames_commonjs2_classnames_ = __webpack_require__(1);
var external_root_classnames_commonjs_classnames_commonjs2_classnames_default = /*#__PURE__*/__webpack_require__.n(external_root_classnames_commonjs_classnames_commonjs2_classnames_);

// EXTERNAL MODULE: ./src/components/Dropdown/types.js
var types = __webpack_require__(3);

// CONCATENATED MODULE: ./src/components/Dropdown/DropdownItem.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var DropdownItem_DropdownItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem(props) {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownItem).call(this, props));
  }

  _createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          props = _objectWithoutProperties(_this$props, ["children", "className"]);

      var buttonCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()(className, 'cub-dropdown-item');
      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement("button", _extends({
        type: "button",
        className: buttonCn
      }, props), external_root_React_commonjs_react_commonjs2_react_["Children"].toArray(children));
    }
  }]);

  return DropdownItem;
}(external_root_React_commonjs_react_commonjs2_react_["Component"]);

/* harmony default export */ var Dropdown_DropdownItem = (DropdownItem_DropdownItem);
// EXTERNAL MODULE: ./src/components/Dropdown/Dropdown.css
var Dropdown_Dropdown = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/Dropdown/Dropdown.js
function Dropdown_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Dropdown_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Dropdown_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Dropdown_extends() { Dropdown_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Dropdown_extends.apply(this, arguments); }

function Dropdown_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Dropdown_typeof = function _typeof(obj) { return typeof obj; }; } else { Dropdown_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Dropdown_typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Dropdown_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dropdown_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Dropdown_createClass(Constructor, protoProps, staticProps) { if (protoProps) Dropdown_defineProperties(Constructor.prototype, protoProps); if (staticProps) Dropdown_defineProperties(Constructor, staticProps); return Constructor; }

function Dropdown_possibleConstructorReturn(self, call) { if (call && (Dropdown_typeof(call) === "object" || typeof call === "function")) { return call; } return Dropdown_assertThisInitialized(self); }

function Dropdown_getPrototypeOf(o) { Dropdown_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Dropdown_getPrototypeOf(o); }

function Dropdown_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Dropdown_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Dropdown_setPrototypeOf(subClass, superClass); }

function Dropdown_setPrototypeOf(o, p) { Dropdown_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Dropdown_setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // eslint-disable-next-line import/no-unresolved







var defaultMenuStyles = {
  top: '100%',
  bottom: 'auto',
  visibility: 'hidden'
};

var Dropdown_Dropdown_Dropdown =
/*#__PURE__*/
function (_Component) {
  Dropdown_inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    Dropdown_classCallCheck(this, Dropdown);

    _this = Dropdown_possibleConstructorReturn(this, Dropdown_getPrototypeOf(Dropdown).call(this, props));

    _defineProperty(Dropdown_assertThisInitialized(_this), "dropdownRef", Object(external_root_React_commonjs_react_commonjs2_react_["createRef"])());

    _defineProperty(Dropdown_assertThisInitialized(_this), "menuRef", Object(external_root_React_commonjs_react_commonjs2_react_["createRef"])());

    _defineProperty(Dropdown_assertThisInitialized(_this), "handleOutsideClick", _this.outsideClick.bind(Dropdown_assertThisInitialized(_this)));

    _this.state = {
      open: props.defaultOpen,
      menuStyles: defaultMenuStyles
    };
    return _this;
  }

  Dropdown_createClass(Dropdown, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleMenu(false);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !shallowequal_default()(nextProps, this.props) || !shallowequal_default()(nextState, this.state);
    }
  }, {
    key: "getSelectedValue",
    value: function getSelectedValue() {
      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options,
          getValue = _this$props.getValue;
      return value && options.find(function (x) {
        return getValue(x) === value;
      }) || null;
    }
  }, {
    key: "getItemsElements",
    value: function getItemsElements() {
      return this.menuRef.current && this.menuRef.current.querySelectorAll('.cub-dropdown-item') || [];
    }
  }, {
    key: "getControlElement",
    value: function getControlElement() {
      return this.dropdownRef.current && this.dropdownRef.current.querySelector('.cub-dropdown-control');
    }
  }, {
    key: "makeFocusOnControl",
    value: function makeFocusOnControl() {
      var $control = this.getControlElement();
      if ($control) $control.focus();
    }
  }, {
    key: "setMenuPositions",
    value: function setMenuPositions() {
      var $control = this.getControlElement();
      var $menu = this.menuRef.current;

      if ($control && $menu) {
        var _$menu$getBoundingCli = $menu.getBoundingClientRect(),
            top = _$menu$getBoundingCli.top,
            height = _$menu$getBoundingCli.height;

        var _window = window,
            innerHeight = _window.innerHeight;
        var menuStyles = {
          top: top + height > innerHeight ? 'auto' : '100%',
          bottom: top + height > innerHeight ? '100%' : 'auto',
          visibility: 'visible'
        };
        this.setState({
          menuStyles: menuStyles
        });
      }
    }
  }, {
    key: "handleControlClick",
    value: function handleControlClick(evt) {
      var open = this.state.open;
      var _this$props2 = this.props,
          closeOnControlClick = _this$props2.closeOnControlClick,
          customControlProps = _this$props2.customControlProps,
          openOnFocus = _this$props2.openOnFocus;
      if (!open) this.toggleMenu(true);
      if (open && closeOnControlClick && !openOnFocus) this.toggleMenu(false);
      if (customControlProps.onClick) customControlProps.onClick(evt);
    }
  }, {
    key: "handleControlFocus",
    value: function handleControlFocus(evt) {
      var _this$props3 = this.props,
          openOnFocus = _this$props3.openOnFocus,
          customControlProps = _this$props3.customControlProps;
      if (openOnFocus) this.toggleMenu(true);
      if (customControlProps.onFocus) customControlProps.onFocus(evt);
    }
  }, {
    key: "handleControlBlur",
    value: function handleControlBlur(evt) {
      var customControlProps = this.props.customControlProps;
      if (customControlProps.onBlur) customControlProps.onBlur(evt);
    }
  }, {
    key: "handleControlKeyDown",
    value: function handleControlKeyDown(evt) {
      var open = this.state.open;
      var customControlProps = this.props.customControlProps;
      var key = evt.key;
      var $items = this.getItemsElements(); // $FlowFixMe

      var $firstItem = $items[0];
      if (key === 'Tab') this.toggleMenu(false); // Close dropdown and focusing input

      if (key === 'Escape') {
        this.toggleMenu(false);
        if (open) this.makeFocusOnControl();
      } else if (!open && key !== 'Tab') {
        // Open dropdown on press any key
        this.toggleMenu(true);
      } // Close dropdown and select first item


      if (key === 'Enter' && open && $firstItem) {
        evt.preventDefault();
        var customEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true
        });
        $firstItem.dispatchEvent(customEvent);
      } // Focus first/last item


      if (['ArrowDown', 'ArrowUp'].includes(key) && open) {
        evt.preventDefault();

        var _idx = key === 'ArrowDown' ? 0 : $items.length - 1; // $FlowFixMe


        if (_idx >= 0 && $items[_idx]) $items[_idx].focus();
      }

      if (customControlProps.onKeyDown) customControlProps.onKeyDown(evt);
    }
  }, {
    key: "handleItemKeyDown",
    value: function handleItemKeyDown(evt, item, idx) {
      var _this2 = this;

      var target = evt.target,
          key = evt.key;
      var _this$props4 = this.props,
          customItemProps = _this$props4.customItemProps,
          onSelect = _this$props4.onSelect;

      var isPromise = function isPromise(obj) {
        return typeof obj.then === 'function';
      };

      if (key === 'Tab') this.toggleMenu(false); // Close dropdown and focus control

      if (key === 'Escape') {
        this.toggleMenu(false);
        if (!this.props.openOnFocus) this.makeFocusOnControl();
      } // Select item


      if (key === 'Enter' && item !== null) {
        evt.preventDefault();

        if (isPromise(onSelect)) {
          onSelect(evt, item, idx).then(function () {
            return _this2.toggleMenu(false);
          });
        } else {
          onSelect(evt, item, idx);
          this.toggleMenu(false);
        }
      } // Focus next/prev item


      if (['ArrowDown', 'ArrowUp'].includes(key)) {
        evt.preventDefault();
        var $items = Array.from(this.getItemsElements());
        var currentIdx = $items.indexOf(target);
        var $next = $items[currentIdx + 1] ? $items[currentIdx + 1] : $items[0];
        var $prev = $items[currentIdx - 1] ? $items[currentIdx - 1] : $items[$items.length - 1];
        var $item = key === 'ArrowDown' ? $next : $prev;
        if ($item) $item.focus();
      }

      if (customItemProps.onKeyDown) customItemProps.onKeyDown(evt, item, idx);
    }
  }, {
    key: "handleItemClick",
    value: function handleItemClick(evt, item, idx) {
      var _this$props5 = this.props,
          onSelect = _this$props5.onSelect,
          closeOnSelect = _this$props5.closeOnSelect,
          openOnFocus = _this$props5.openOnFocus,
          customItemProps = _this$props5.customItemProps;
      onSelect(evt, item, idx);
      if (closeOnSelect) this.toggleMenu(false);
      if (!openOnFocus) this.makeFocusOnControl();
      if (customItemProps.onClick) customItemProps.onClick(evt, item, idx);
    }
  }, {
    key: "outsideClick",
    value: function outsideClick(evt) {
      if (this.dropdownRef.current && this.dropdownRef.current.contains(evt.target)) return;
      this.toggleMenu(false);
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu(open) {
      this.setState({
        open: open
      });
      var action = open ? 'addEventListener' : 'removeEventListener'; // $FlowFixMe

      document[action]('click', this.handleOutsideClick, false);

      if (open) {
        this.props.onOpen();
        setTimeout(this.setMenuPositions.bind(this));
      } else {
        this.props.onClose();
        this.setState({
          menuStyles: defaultMenuStyles
        });
      }
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this3 = this;

      var _this$props6 = this.props,
          customControl = _this$props6.customControl,
          customControlArrow = _this$props6.customControlArrow,
          value = _this$props6.value,
          disabled = _this$props6.disabled,
          customControlProps = _this$props6.customControlProps,
          controlWrapperClassName = _this$props6.controlWrapperClassName;
      var open = this.state.open;
      var controlWrapperCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown-control-wrapper', controlWrapperClassName);
      var controlCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown-control', customControlProps.className);
      var defaultProps = {
        placeholder: 'Select'
      };

      var props = _objectSpread({}, defaultProps, {}, customControlProps, {
        className: controlCn
      });

      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", {
        className: controlWrapperCn
      }, external_root_React_commonjs_react_commonjs2_react_default.a.createElement(customControl, _objectSpread({
        value: value,
        disabled: disabled
      }, props, {
        autoComplete: 'off',
        className: controlCn,
        onClick: function onClick(e) {
          return _this3.handleControlClick(e);
        },
        onKeyDown: function onKeyDown(e) {
          return _this3.handleControlKeyDown(e);
        },
        onFocus: function onFocus(e) {
          return _this3.handleControlFocus(e);
        },
        onBlur: function onBlur(e) {
          return _this3.handleControlBlur(e);
        }
      })), customControlArrow && external_root_React_commonjs_react_commonjs2_react_default.a.createElement(customControlArrow, {
        open: open
      }));
    }
  }, {
    key: "renderOption",
    value: function renderOption(item, idx) {
      var _this4 = this;

      var _this$props7 = this.props,
          getValue = _this$props7.getValue,
          getLabel = _this$props7.getLabel,
          customItem = _this$props7.customItem,
          customItemProps = _this$props7.customItemProps;
      var itemCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown-item', customItemProps.className || '');
      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement(customItem, _objectSpread({
        item: item
      }, customItemProps, {
        key: getValue(item),
        selected: this.getSelectedValue(),
        className: itemCn,
        'data-label': getLabel(item),
        'data-value': getValue(item),
        getLabel: getLabel,
        onClick: function onClick(e) {
          return _this4.handleItemClick(e, item, idx);
        },
        onKeyDown: function onKeyDown(e) {
          return _this4.handleItemKeyDown(e, item, idx);
        }
      }));
    }
  }, {
    key: "renderElement",
    value: function renderElement(element) {
      var _this5 = this;

      if (!element) return false;
      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement(element, {
        // Close menu from header/footer
        handleClose: function handleClose() {
          _this5.toggleMenu(false);

          if (!_this5.props.openOnFocus) _this5.makeFocusOnControl();
        },
        // DropdownItem keyboard navigation
        handleItemKeyDown: function handleItemKeyDown(evt) {
          return _this5.handleItemKeyDown(evt, null, -1);
        }
      });
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$props8 = this.props,
          options = _this$props8.options,
          header = _this$props8.header,
          footer = _this$props8.footer,
          customNoResults = _this$props8.customNoResults,
          menuClassName = _this$props8.menuClassName,
          itemsWrapperClassName = _this$props8.itemsWrapperClassName;
      var _this$state = this.state,
          open = _this$state.open,
          menuStyles = _this$state.menuStyles;
      var menuCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown-menu', {
        '-open': open,
        '-empty': !options.length
      }, menuClassName);
      var itemsCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown-items', itemsWrapperClassName);
      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", {
        className: menuCn,
        ref: this.menuRef,
        style: menuStyles
      }, options.length <= 0 && customNoResults, external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", {
        className: "cub-dropdown-menu-inner"
      }, this.renderElement(header), options.length > 0 && external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", {
        className: itemsCn
      }, options.map(this.renderOption.bind(this))), this.renderElement(footer)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          style = _this$props9.style,
          className = _this$props9.className;
      var open = this.state.open;
      var dropdownCn = external_root_classnames_commonjs_classnames_commonjs2_classnames_default()('cub-dropdown', {
        '-opened': open
      }, className);
      return external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", {
        className: dropdownCn,
        ref: this.dropdownRef,
        style: style
      }, this.renderControl(), open && this.renderMenu());
    }
  }]);

  return Dropdown;
}(external_root_React_commonjs_react_commonjs2_react_["Component"]);

_defineProperty(Dropdown_Dropdown_Dropdown, "defaultProps", {
  options: [],
  value: '',
  defaultOpen: false,
  disabled: false,
  className: '',
  style: {},
  // Control
  customControl: function customControl(_ref) {
    var props = Dropdown_extends({}, _ref);

    return external_root_React_commonjs_react_commonjs2_react_default.a.createElement("input", Dropdown_extends({
      type: "text"
    }, props));
  },
  controlWrapperClassName: '',
  customControlProps: {},
  // Menu / Item
  customItem: function customItem(_ref2) {
    var item = _ref2.item,
        getLabel = _ref2.getLabel,
        props = Dropdown_objectWithoutProperties(_ref2, ["item", "getLabel"]);

    return external_root_React_commonjs_react_commonjs2_react_default.a.createElement(Dropdown_DropdownItem, Dropdown_extends({
      item: item
    }, props), getLabel(item));
  },
  menuClassName: '',
  itemsWrapperClassName: '',
  customItemProps: {},
  onSelect: function onSelect() {},
  onClose: function onClose() {},
  onOpen: function onOpen() {},
  // Other
  closeOnSelect: true,
  openOnFocus: false,
  closeOnControlClick: true,
  customNoResults: external_root_React_commonjs_react_commonjs2_react_default.a.createElement("div", null, "Nothing found"),
  getLabel: function getLabel(x) {
    return x && x.name;
  },
  getValue: function getValue(x) {
    return x && x._id;
  }
});

/* harmony default export */ var components_Dropdown_Dropdown = (Dropdown_Dropdown_Dropdown);
// CONCATENATED MODULE: ./src/components/Dropdown/index.js

/* harmony default export */ var components_Dropdown = (components_Dropdown_Dropdown);
// CONCATENATED MODULE: ./src/components/Dropdown/useDropdown.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var useDropdown_useDropdown = function useDropdown(initialOptions, initialValue, initialSelected) {
  var _useState = Object(external_root_React_commonjs_react_commonjs2_react_["useState"])(initialOptions),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      _setOptions = _useState2[1];

  var _useState3 = Object(external_root_React_commonjs_react_commonjs2_react_["useState"])(initialValue),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      _setValue = _useState4[1];

  var _useState5 = Object(external_root_React_commonjs_react_commonjs2_react_["useState"])(initialSelected),
      _useState6 = _slicedToArray(_useState5, 2),
      selected = _useState6[0],
      _setSelected = _useState6[1];

  return {
    options: options,
    value: value,
    selected: selected,
    setOptions: function setOptions(items) {
      return _setOptions(items);
    },
    setValue: function setValue(val) {
      return _setValue(val);
    },
    setSelected: function setSelected(sel) {
      return _setSelected(sel);
    }
  };
};

/* harmony default export */ var Dropdown_useDropdown = (useDropdown_useDropdown);
// CONCATENATED MODULE: ./src/components/index.js
/* eslint-disable import/prefer-default-export */



// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport Dropdown */__webpack_require__.d(__webpack_exports__, "Dropdown", function() { return components_Dropdown; });
/* concated harmony reexport DropdownItem */__webpack_require__.d(__webpack_exports__, "DropdownItem", function() { return Dropdown_DropdownItem; });
/* concated harmony reexport useDropdown */__webpack_require__.d(__webpack_exports__, "useDropdown", function() { return Dropdown_useDropdown; });
// Export all the explicitly exported components, this file will contain our
// components when built by webpack and sent off to the world.


/***/ })
/******/ ]);
});