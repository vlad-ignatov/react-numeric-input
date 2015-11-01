/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global ReactDOM, $, hljs */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _srcNumericInputJsx = __webpack_require__(1);

	var _srcNumericInputJsx2 = _interopRequireDefault(_srcNumericInputJsx);

	__webpack_require__(3); // webpack magic

	$(function () {
	    $('script.jsx').each(function (i, s) {
	        var div = $('<div/>'),
	            props = Function('return (' + $(s).text() + ')')();

	        $(s).replaceWith(div);
	        ReactDOM.render(React.createElement(_srcNumericInputJsx2['default'], props), div[0]);
	    });

	    hljs.configure({ useBR: false });

	    $('.code').each(function (i, block) {
	        hljs.highlightBlock(block);
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	var SPEED = 50;
	var DELAY = 500;

	var NumericInput = (function (_Component) {
	    _inherits(NumericInput, _Component);

	    _createClass(NumericInput, null, [{
	        key: 'propTypes',
	        value: {
	            step: _react.PropTypes.number,
	            min: _react.PropTypes.number,
	            max: _react.PropTypes.number,
	            precision: _react.PropTypes.number,
	            parse: _react.PropTypes.func,
	            format: _react.PropTypes.func,
	            className: _react.PropTypes.string,
	            value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
	        },

	        /**
	         * The deault behaviour is to start from 0, use step of 1 and display
	         * integers
	         */
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            value: 0,
	            step: 1,
	            min: Number.MIN_SAFE_INTEGER || -9007199254740991,
	            max: Number.MAX_SAFE_INTEGER || 9007199254740991,
	            precision: 0,
	            parse: null,
	            format: null
	        },

	        /**
	         * Set the initial state and create the "_timer" property to contain the
	         * step timer. Then define all the private methods within the constructor.
	         */
	        enumerable: true
	    }]);

	    function NumericInput(props) {
	        _classCallCheck(this, NumericInput);

	        _get(Object.getPrototypeOf(NumericInput.prototype), 'constructor', this).call(this, props);

	        this._timer = null;

	        this.state = {
	            step: props.step,
	            min: props.min,
	            max: props.max,
	            value: 'value' in props ? this._parse(String(props.value || '')) : null
	        };
	    }

	    /**
	     * This is used to clear the timer if any
	     */

	    _createClass(NumericInput, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.stop();
	        }
	    }, {
	        key: '_toNumber',
	        value: function _toNumber(x) {
	            var n = parseFloat(x);
	            var q = Math.pow(10, this.props.precision);
	            if (isNaN(n) || !isFinite(n)) {
	                n = 0;
	            }

	            n = Math.min(Math.max(n, this.props.min), this.props.max);
	            n = Math.round(n * q) / q;

	            return n;
	        }

	        /**
	         * This is used internally to parse any string into a number. It will
	         * delegate to this.props.parse function if one is provided. Otherwise it
	         * will just use parseFloat.
	         * @private
	         */
	    }, {
	        key: '_parse',
	        value: function _parse(x) {
	            if (typeof this.props.parse == 'function') {
	                return parseFloat(this.props.parse(x));
	            }
	            return parseFloat(x);
	        }

	        /**
	         * This is used internally to format a number to it's dislay representation.
	         * It will invoke the this.props.format function if one is provided.
	         * @private
	         */
	    }, {
	        key: '_format',
	        value: function _format(n) {
	            var _n = this._toNumber(n).toFixed(this.props.precision);

	            if (this.props.format) {
	                return this.props.format(_n);
	            }

	            return _n;
	        }

	        /**
	         * The internal method that actualy sets the new value on the input
	         * @private
	         */
	    }, {
	        key: '_step',
	        value: function _step(n) {
	            var _n = this._toNumber((this.state.value || 0) + this.state.step * n);

	            if (_n !== this.state.value) {
	                this.setState({ value: _n });
	            }
	        }

	        /**
	         * This gets called whenever the user edits the input value. The value will
	         * be recreated using the current parse/format methods so the input will
	         * appear as readonly if the user tries to type something invalid.
	         */
	    }, {
	        key: '_onChange',
	        value: function _onChange(e) {
	            this.setState({
	                value: this._parse(e.target.value)
	            });
	        }

	        /**
	         * This binds the Up/Down arrow keys
	         */
	    }, {
	        key: '_onKeyDown',
	        value: function _onKeyDown(e) {
	            if (e.keyCode === KEYCODE_UP) {
	                e.preventDefault();
	                this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
	            } else if (e.keyCode === KEYCODE_DOWN) {
	                e.preventDefault();
	                this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
	            }
	        }

	        /**
	         * Stops the widget from auto-changing by clearing the timer (if any)
	         */
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (this._timer) {
	                window.clearTimeout(this._timer);
	            }
	        }

	        /**
	         * Increments the value with one step and the enters a recursive calls
	         * after DELAY. This is bound to the mousedown event on the "up" button
	         * and will be stopped on mouseout/mouseup.
	         * @param {Boolean} _recursive The method is passing this to itself while
	         *  it is in recursive mode.
	         * @return void
	         */
	    }, {
	        key: 'increase',
	        value: function increase(_recursive) {
	            var _this = this;

	            this.stop();
	            this._step(1);
	            if (isNaN(this.state.value) || this.state.value < this.props.max) {
	                this._timer = setTimeout(function () {
	                    _this.increase(true);
	                }, _recursive ? SPEED : DELAY);
	            }
	        }

	        /**
	         * Decrements the value with one step and the enters a recursive calls
	         * after DELAY. This is bound to the mousedown event on the "down" button
	         * and will be stopped on mouseout/mouseup.
	         * @param {Boolean} _recursive The method is passing this to itself while
	         *  it is in recursive mode.
	         * @return void
	         */
	    }, {
	        key: 'decrease',
	        value: function decrease(_recursive) {
	            var _this2 = this;

	            this.stop();
	            this._step(-1);
	            if (isNaN(this.state.value) || this.state.value > this.props.min) {
	                this._timer = setTimeout(function () {
	                    _this2.decrease(true);
	                }, _recursive ? SPEED : DELAY);
	            }
	        }

	        /**
	         * Renders an input wrapped in relative span and up/down buttons
	         * @return {Component}
	         */
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputProps = {};
	            var widgetProps = ['step', 'min', 'max', 'precision', 'parse', 'format', 'value'];
	            for (var key in this.props) {
	                if (widgetProps.indexOf(key) == -1) {
	                    inputProps[key] = this.props[key];
	                }
	            }
	            inputProps.type = 'text';
	            inputProps.value = this.state.value || this.state.value === 0 ? this._format(this.state.value) : '';
	            inputProps.onChange = this._onChange.bind(this);
	            inputProps.onKeyDown = this._onKeyDown.bind(this);
	            inputProps.className = [];

	            if (this.props.className) {
	                inputProps.className.push(this.props.className);
	            }

	            var attrs = {
	                wrap: {
	                    onMouseUp: this.stop.bind(this),
	                    onMouseOut: this.stop.bind(this),
	                    className: []
	                },
	                input: inputProps,
	                btnUp: {
	                    onMouseDown: this.increase.bind(this, false)
	                },
	                btnDown: {
	                    onMouseDown: this.decrease.bind(this, false)
	                }
	            };

	            attrs.wrap.className.push('numeric-input-wrap');
	            attrs.input.className.push('numeric-input-input');
	            attrs.btnUp.className = 'numeric-input-up';
	            attrs.btnDown.className = 'numeric-input-down';

	            if (attrs.input.readOnly) {
	                attrs.wrap.className.push('readonly');
	            }

	            if (attrs.input.disabled) {
	                attrs.wrap.className.push('disabled');
	            }

	            attrs.input.className = attrs.input.className.join(' ');
	            attrs.wrap.className = attrs.wrap.className.join(' ');

	            return React.createElement(
	                'span',
	                attrs.wrap,
	                React.createElement('input', attrs.input),
	                React.createElement('a', attrs.btnUp),
	                React.createElement('a', attrs.btnDown)
	            );
	        }
	    }]);

	    return NumericInput;
	})(_react.Component);

	exports['default'] = NumericInput;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./NumericInput.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./NumericInput.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".numeric-input-wrap {\n  position: relative;\n  display: inline-block;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.numeric-input-wrap .numeric-input-input {\n  padding-right: 30px;\n  box-sizing: border-box;\n}\n.numeric-input-wrap .numeric-input-up,\n.numeric-input-wrap .numeric-input-down {\n  position: absolute;\n  right: 3px;\n  width: 2.2ex;\n  background: rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  cursor: default;\n  opacity: 0.75;\n  transition: all 0.2s;\n}\n.numeric-input-wrap .numeric-input-up:before,\n.numeric-input-wrap .numeric-input-down:before {\n  content: '';\n  width: 0;\n  height: 0;\n  border-style: solid;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: -0.3ex 0 0 -0.6ex;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.numeric-input-wrap .numeric-input-up {\n  top: 3px;\n  bottom: 50%;\n  border-radius: 2px 2px 0 0;\n  margin-bottom: 1px;\n}\n.numeric-input-wrap .numeric-input-up:after {\n  content: '';\n  position: absolute;\n  top: -3px;\n  right: -3px;\n  bottom: -1px;\n  left: -2px;\n}\n.numeric-input-wrap .numeric-input-up:before {\n  border-width: 0 0.6ex 0.6ex 0.6ex;\n  border-color: transparent transparent #999;\n  border-color: transparent transparent rgba(0, 0, 0, 0.7);\n}\n.numeric-input-wrap .numeric-input-down {\n  bottom: 3px;\n  top: 50%;\n  border-radius: 0 0 2px 2px;\n  margin-top: 1px;\n}\n.numeric-input-wrap .numeric-input-down:after {\n  content: '';\n  position: absolute;\n  top: -1px;\n  right: -3px;\n  bottom: -3px;\n  left: -2px;\n}\n.numeric-input-wrap .numeric-input-down:before {\n  border-width: 0.6ex 0.6ex 0 0.6ex;\n  border-color: #999 transparent transparent;\n  border-color: rgba(0, 0, 0, 0.7) transparent transparent;\n}\n.numeric-input-wrap:hover .numeric-input-up,\n.numeric-input-wrap:hover .numeric-input-down {\n  background: rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2);\n  opacity: 1;\n}\n.numeric-input-wrap .numeric-input-up:hover,\n.numeric-input-wrap .numeric-input-down:hover {\n  background: rgba(0, 0, 0, 0.2);\n  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.3);\n}\n.numeric-input-wrap .numeric-input-up:active,\n.numeric-input-wrap .numeric-input-down:active {\n  background: rgba(0, 0, 0, 0.3);\n  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.4);\n}\n.numeric-input-wrap.disabled {\n  pointer-events: none;\n}\n.disabled .numeric-input-wrap {\n  pointer-events: none;\n}\n.disabled .numeric-input-up,\n.disabled .numeric-input-down {\n  opacity: 0.3;\n  pointer-events: none;\n  box-shadow: none;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);