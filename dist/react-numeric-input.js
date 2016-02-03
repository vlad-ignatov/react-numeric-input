(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NumericInput = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = _react2.default.PropTypes;
	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;

	var NumericInput = exports.NumericInput = function (_React$Component) {
	    _inherits(NumericInput, _React$Component);

	    /**
	     * Set the initial state and create the "_timer" property to contain the
	     * step timer. Then define all the private methods within the constructor.
	     */

	    /**
	     * When click and hold on a button - the speed of auto changin the value.
	     * This is a static property and can be modified if needed.
	     */

	    /**
	     * The deault behaviour is to start from 0, use step of 1 and display
	     * integers
	     */

	    function NumericInput(props) {
	        _classCallCheck(this, NumericInput);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumericInput).call(this, props));

	        _this._timer = null;

	        var _value = String(props.value || props.value === 0 ? props.value : '').replace(/^\s*|\s*$/, "");

	        _this.state = {
	            step: props.step,
	            min: props.min,
	            max: props.max,
	            style: {},
	            value: 'value' in props && _value !== '' ? _this._parse(_value) : null
	        };

	        for (var x in NumericInput.style) {
	            _this.state.style[x] = Object.assign({}, NumericInput.style[x], props.style[x] || {});
	        }

	        _this.stop = _this.stop.bind(_this);
	        return _this;
	    }

	    /**
	     * This is used to clear the timer if any
	     */

	    /**
	     * When click and hold on a button - the delay before auto changin the value.
	     * This is a static property and can be modified if needed.
	     */

	    /**
	     * This are the default styles that act as base for all the component
	     * instances. One can modify this object to change the default styles
	     * of all the widgets on the page.
	     */

	    _createClass(NumericInput, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.stop();
	        }

	        /**
	         * Adds getValueAsNumber and setValue methods to the input DOM element.
	         */

	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            this.refs.input.getValueAsNumber = function () {
	                return _this2.state.value || 0;
	            };

	            this.refs.input.setValue = function (value) {
	                _this2.setState({
	                    value: _this2._parse(value)
	                });
	            };
	        }

	        /**
	         * Used internally to parse the argument x to it's numeric representation.
	         * If the argument cannot be converted to finite number returns 0; If a
	         * "precision" prop is specified uses it round the number with that
	         * precision (no fixed precision here because the return value is float, not
	         * string).
	         */

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
	            var _this3 = this;

	            this.stop();
	            this._step(1);
	            if (isNaN(this.state.value) || this.state.value < this.props.max) {
	                this._timer = setTimeout(function () {
	                    _this3.increase(true);
	                }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
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
	            var _this4 = this;

	            this.stop();
	            this._step(-1);
	            if (isNaN(this.state.value) || this.state.value > this.props.min) {
	                this._timer = setTimeout(function () {
	                    _this4.decrease(true);
	                }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
	            }
	        }

	        /**
	         * Handles the mousedown event on the up/down buttons. Changes The
	         * internal value and sets up a delay for auto increment/decrement
	         * (until mouseup or mouseleave)
	         */

	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(dir, e) {
	            var _this5 = this;

	            e.preventDefault();
	            if (dir == 'down') {
	                this.decrease();
	            } else if (dir == 'up') {
	                this.increase();
	            }
	            setTimeout(function () {
	                _this5.refs.input.focus();
	            });
	        }

	        /**
	         * Handles the touchstart event on the up/down buttons. Changes The
	         * internal value and DOES NOT sets up a delay for auto increment/decrement.
	         * Note that this calls e.preventDefault() so the event is not used for
	         * creating a virtual mousedown after it
	         */

	    }, {
	        key: 'onTouchStart',
	        value: function onTouchStart(dir, e) {
	            e.preventDefault();
	            if (dir == 'down') {
	                this.decrease();
	            } else if (dir == 'up') {
	                this.increase();
	            }
	        }

	        /**
	         * Renders an input wrapped in relative span and up/down buttons
	         * @return {Component}
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            var _this6 = this;

	            var props = this.props;
	            var state = this.state;
	            var
	            // These are ignored in rendering
	            step = props.step;
	            var min = props.min;
	            var max = props.max;
	            var precision = props.precision;
	            var parse = props.parse;
	            var format = props.format;
	            var value = props.value;
	            var type = props.type;
	            var style = props.style;

	            var rest = _objectWithoutProperties(props, ['step', 'min', 'max', 'precision', 'parse', 'format', 'value', 'type', 'style']);

	            var hasFormControl = props.className && /\bform-control\b/.test(props.className);

	            var mobile = props.mobile == 'auto' ? 'ontouchstart' in document : props.mobile;
	            if (typeof mobile == "function") {
	                mobile = mobile.call(this);
	            }
	            mobile = !!mobile;

	            var attrs = {
	                wrap: {
	                    style: Object.assign({}, NumericInput.style.wrap, props.style.wrap),
	                    className: 'react-numeric-input'
	                },
	                input: _extends({
	                    ref: 'input',
	                    type: 'text',
	                    style: Object.assign({}, state.style.input, !hasFormControl ? state.style['input:not(.form-control)'] : {}, state.inputFocus ? state.style['input:focus'] : {}),
	                    value: state.value || state.value === 0 ? this._format(state.value) : ''
	                }, rest),
	                btnUp: {
	                    style: Object.assign({}, state.style.btn, state.style.btnUp, props.disabled ? state.style['btn:disabled'] : state.btnUpActive ? state.style['btn:active'] : state.btnUpHover ? state.style['btn:hover'] : {})
	                },
	                btnDown: {
	                    style: Object.assign({}, state.style.btn, state.style.btnDown, props.disabled ? state.style['btn:disabled'] : state.btnDownActive ? state.style['btn:active'] : state.btnDownHover ? state.style['btn:hover'] : {})
	                }
	            };

	            if (hasFormControl) {
	                Object.assign(attrs.wrap.style, state.style['wrap.hasFormControl']);
	            }

	            // mobile
	            if (mobile) {
	                Object.assign(attrs.input.style, state.style['input.mobile']);
	                Object.assign(attrs.btnUp.style, state.style['btnUp.mobile']);
	                Object.assign(attrs.btnDown.style, state.style['btnDown.mobile']);
	            }

	            // Attach event listeners if the widget is not disabled
	            if (!props.disabled) {
	                Object.assign(attrs.wrap, {
	                    onMouseUp: this.stop,
	                    onMouseLeave: this.stop
	                });

	                Object.assign(attrs.btnUp, {
	                    onTouchStart: this.onTouchStart.bind(this, 'up'),
	                    onTouchEnd: this.stop,
	                    onMouseEnter: function onMouseEnter() {
	                        _this6.setState({
	                            btnUpHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this6.stop();
	                        _this6.setState({
	                            btnUpHover: false,
	                            btnUpActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this6.setState({
	                            btnUpHover: true,
	                            btnUpActive: false
	                        });
	                    },
	                    onMouseDown: function onMouseDown(e) {
	                        _this6.setState({
	                            btnUpHover: true,
	                            btnUpActive: true
	                        });
	                        _this6.onMouseDown('up', e);
	                    }
	                });

	                Object.assign(attrs.btnDown, {
	                    onTouchStart: this.onTouchStart.bind(this, 'down'),
	                    onTouchEnd: this.stop,
	                    onMouseEnter: function onMouseEnter() {
	                        _this6.setState({
	                            btnDownHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this6.stop();
	                        _this6.setState({
	                            btnDownHover: false,
	                            btnDownActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this6.setState({
	                            btnDownHover: true,
	                            btnDownActive: false
	                        });
	                    },
	                    onMouseDown: function onMouseDown(e) {
	                        _this6.setState({
	                            btnDownHover: true,
	                            btnDownActive: true
	                        });
	                        _this6.onMouseDown('down', e);
	                    }
	                });

	                Object.assign(attrs.input, {
	                    onChange: this._onChange.bind(this),
	                    onKeyDown: this._onKeyDown.bind(this),
	                    onFocus: function onFocus() {
	                        _this6.setState({ inputFocus: true });
	                    },
	                    onBlur: function onBlur() {
	                        _this6.setState({ inputFocus: false });
	                    }
	                });
	            }

	            if (mobile) {
	                return _react2.default.createElement(
	                    'span',
	                    attrs.wrap,
	                    _react2.default.createElement('input', attrs.input),
	                    _react2.default.createElement(
	                        'b',
	                        attrs.btnUp,
	                        _react2.default.createElement('i', { style: state.style.minus }),
	                        _react2.default.createElement('i', { style: state.style.plus })
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        attrs.btnDown,
	                        _react2.default.createElement('i', { style: state.style.minus })
	                    )
	                );
	            }

	            return _react2.default.createElement(
	                'span',
	                attrs.wrap,
	                _react2.default.createElement('input', attrs.input),
	                _react2.default.createElement(
	                    'b',
	                    attrs.btnUp,
	                    _react2.default.createElement('i', { style: state.style.arrowUp })
	                ),
	                _react2.default.createElement(
	                    'b',
	                    attrs.btnDown,
	                    _react2.default.createElement('i', { style: state.style.arrowDown })
	                )
	            );
	        }
	    }]);

	    return NumericInput;
	}(_react2.default.Component);

	NumericInput.propTypes = {
	    step: PropTypes.number,
	    min: PropTypes.number,
	    max: PropTypes.number,
	    precision: PropTypes.number,
	    parse: PropTypes.func,
	    format: PropTypes.func,
	    className: PropTypes.string,
	    disabled: PropTypes.bool,
	    readOnly: PropTypes.bool,
	    style: PropTypes.object,
	    type: PropTypes.string,
	    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    mobile: function mobile(props, propName) {
	        var prop = props[propName];
	        if (prop !== true && prop !== false && prop !== 'auto' && typeof prop != 'function') {
	            return new Error('The "mobile" prop must be true, false, "auto" or a function');
	        }
	    }
	};
	NumericInput.defaultProps = {
	    value: '',
	    step: 1,
	    min: Number.MIN_SAFE_INTEGER || -9007199254740991,
	    max: Number.MAX_SAFE_INTEGER || 9007199254740991,
	    precision: 0,
	    parse: null,
	    format: null,
	    className: '',
	    mobile: 'auto',
	    style: {}
	};
	NumericInput.style = {

	    // The wrapper (span)
	    wrap: {
	        position: 'relative',
	        display: 'inline-block'
	    },

	    'wrap.hasFormControl': {
	        display: 'block'
	    },

	    // The increase button arrow (i)
	    arrowUp: {
	        position: 'absolute',
	        top: '50%',
	        left: '50%',
	        width: 0,
	        height: 0,
	        borderWidth: '0 0.6ex 0.6ex 0.6ex',
	        borderColor: 'transparent transparent rgba(0, 0, 0, 0.7)',
	        borderStyle: 'solid',
	        margin: '-0.3ex 0 0 -0.56ex'
	    },

	    // The decrease button arrow (i)
	    arrowDown: {
	        position: 'absolute',
	        top: '50%',
	        left: '50%',
	        width: 0,
	        height: 0,
	        borderWidth: '0.6ex 0.6ex 0 0.6ex',
	        borderColor: 'rgba(0, 0, 0, 0.7) transparent transparent',
	        borderStyle: 'solid',
	        margin: '-0.3ex 0 0 -0.56ex'
	    },

	    // The vertical segment of the plus sign (for mobile only)
	    plus: {
	        position: 'absolute',
	        top: '50%',
	        left: '50%',
	        width: 2,
	        height: 10,
	        background: 'rgba(0,0,0,.7)',
	        margin: '-5px 0 0 -1px'
	    },

	    // The horizontal segment of the plus/minus signs (for mobile only)
	    minus: {
	        position: 'absolute',
	        top: '50%',
	        left: '50%',
	        width: 10,
	        height: 2,
	        background: 'rgba(0,0,0,.7)',
	        margin: '-1px 0 0 -5px'
	    },

	    // Common styles for the up/down buttons (b)
	    btn: {
	        position: 'absolute',
	        right: 2,
	        width: '2.26ex',
	        borderColor: 'rgba(0,0,0,.1)',
	        borderStyle: 'solid',
	        textAlign: 'center',
	        cursor: 'default',
	        transition: 'all 0.1s',
	        background: 'rgba(0,0,0,.1)',
	        boxShadow: '-1px -1px 3px rgba(0,0,0,.1) inset, 1px 1px 3px rgba(255,255,255,.7) inset'
	    },

	    btnUp: {
	        top: 2,
	        bottom: '50%',
	        borderRadius: '2px 2px 0 0',
	        borderWidth: '1px 1px 0 1px'
	    },

	    'btnUp.mobile': {
	        width: '3.3ex',
	        bottom: 2,
	        boxShadow: 'none',
	        borderRadius: 2,
	        borderWidth: 1
	    },

	    btnDown: {
	        top: '50%',
	        bottom: 2,
	        borderRadius: '0 0 2px 2px',
	        borderWidth: '0 1px 1px 1px'
	    },

	    'btnDown.mobile': {
	        width: '3.3ex',
	        bottom: 2,
	        left: 2,
	        top: 2,
	        right: 'auto',
	        boxShadow: 'none',
	        borderRadius: 2,
	        borderWidth: 1
	    },

	    'btn:hover': {
	        background: 'rgba(0,0,0,.2)'
	    },

	    'btn:active': {
	        background: 'rgba(0,0,0,.3)',
	        boxShadow: '0 1px 3px rgba(0,0,0,.2) inset, -1px -1px 4px rgba(255,255,255,.5) inset'
	    },

	    'btn:disabled': {
	        opacity: 0.5,
	        boxShadow: 'none',
	        cursor: 'not-allowed'
	    },

	    // The input (input[type="text"])
	    input: {
	        paddingRight: '3ex',
	        boxSizing: 'border-box'
	    },

	    // The input with bootstrap class
	    'input:not(.form-control)': {
	        border: '1px solid #ccc',
	        borderRadius: 2,
	        paddingLeft: 4,
	        display: 'block',
	        WebkitAppearance: 'none',
	        lineHeight: 'normal'
	    },

	    'input.mobile': {
	        paddingLeft: ' 3.4ex',
	        paddingRight: '3.4ex',
	        textAlign: 'center'
	    },

	    'input:focus': {}
	};
	NumericInput.SPEED = 50;
	NumericInput.DELAY = 500;
	exports.default = NumericInput;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;