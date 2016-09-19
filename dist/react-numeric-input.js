(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["NumericInput"] = factory(require("React"));
	else
		root["NumericInput"] = factory(root["React"]);
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

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
	var IS_BROWSER = typeof document != 'undefined';

	/**
	 * Just a simple helper to provide support for older IEs. This is not exactly a
	 * polyfill for classList.add but it does what we need with minimal efford.
	 * Works with single className only!
	 */
	function addClass(element, className) {
	    if (element.classList) {
	        return element.classList.add(className);
	    }
	    if (!element.className.search(new RegExp("\\b" + className + "\\b"))) {
	        element.className = " " + className;
	    }
	}

	/**
	 * Just a simple helper to provide support for older IEs. This is not exactly a
	 * polyfill for classList.remove but it does what we need with minimal efford.
	 * Works with single className only!
	 */
	function removeClass(element, className) {
	    if (element.className) {
	        if (element.classList) {
	            return element.classList.remove(className);
	        }

	        element.className = element.className.replace(new RegExp("\\b" + className + "\\b", "g"), "");
	    }
	}

	var NumericInput = function (_React$Component) {
	    _inherits(NumericInput, _React$Component);

	    /**
	     * Set the initial state and create the "_timer" property to contain the
	     * step timer. Then define all the private methods within the constructor.
	     */

	    /**
	     * The state of the component
	     * @type {Object}
	     */

	    /**
	     * The step timer
	     * @type {Number}
	     */

	    /**
	     * When click and hold on a button - the speed of auto changin the value.
	     * This is a static property and can be modified if needed.
	     */

	    /**
	     * The deault behaviour is to start from 0, use step of 1 and display
	     * integers
	     */

	    function NumericInput() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, NumericInput);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(NumericInput)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        _this.state = {
	            selectionStart: null,
	            selectionEnd: null,
	            value: "value" in _this.props ? _this.props.value : _this.props.defaultValue,
	            btnDownHover: false,
	            btnDownActive: false,
	            btnUpHover: false,
	            btnUpActive: false,
	            inputFocus: false
	        };

	        _this.stop = _this.stop.bind(_this);
	        return _this;
	    }

	    /**
	     * Special care is taken for the "value" prop:
	     * - If not provided - set it to null
	     * - If the prop is a number - use it as is
	     * - Otherwise:
	     *     1. Convert it to string (falsy values become "")
	     *     2. Then trim it.
	     *     3. Then parse it to number (delegating to this.props.parse if any)
	     */

	    /**
	     * The stop method (need to declare it here to use it in the constructor)
	     * @type {Function}
	     */

	    /**
	     * This holds the last known validation error. We need to compare that with
	     * new errors and detect validation changes...
	     * @type {[type]}
	     */

	    /**
	     * When click and hold on a button - the delay before auto changin the value.
	     * This is a static property and can be modified if needed.
	     */
	    //,
	    // noValidate: false

	    /**
	     * This are the default styles that act as base for all the component
	     * instances. One can modify this object to change the default styles
	     * of all the widgets on the page.
	     */

	    _createClass(NumericInput, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(props) {
	            var _value = String(props.value || props.value === 0 ? props.value : '').replace(/^\s*|\s*$/, "");

	            this.setState({
	                value: "value" in props && _value !== '' ? this._parse(_value) : null
	            });
	        }

	        /**
	         * After the component has been rendered into the DOM, do whatever is
	         * needed to "reconnect" it to the outer world, i.e. restore selection,
	         * call some of the callbacks, validate etc.
	         */

	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {

	            // Call the onChange if needed. This is placed here because there are
	            // many reasons for changing the value and this is the common place
	            // that can capture them all
	            if (prevState.value != this.state.value) {
	                this._invokeEventCallback("onChange", this.state.value, this.refs.input.value);
	            }

	            // Notify about the focus
	            if (this.state.inputFocus && !prevState.inputFocus) {
	                this.refs.input.focus();

	                // Restore selectionStart (if any)
	                if (this.state.selectionStart || this.state.selectionStart === 0) {
	                    this.refs.input.selectionStart = this.state.selectionStart;
	                }

	                // Restore selectionEnd (if any)
	                if (this.state.selectionEnd || this.state.selectionEnd === 0) {
	                    this.refs.input.selectionEnd = this.state.selectionEnd;
	                }
	            }

	            // This is a special case! If the component has the "autoFocus" prop
	            // and the browser did focus it we have pass that to the onFocus
	            if (!this.state.inputFocus && IS_BROWSER && document.activeElement === this.refs.input) {
	                this.state.inputFocus = true;
	            }

	            this.checkValidity();
	        }

	        /**
	         * This is used to clear the timer if any
	         */

	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            this.stop();
	        }

	        /**
	         * Adds getValueAsNumber and setValue methods to the input DOM element.
	         */

	    }, {
	        key: "componentDidMount",
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

	            this.checkValidity();
	        }

	        /**
	         * Unless noValidate is set to true, the component will check the
	         * existing validation state (if any) and will toggle the "has-error"
	         * CSS class on the wrapper
	         */

	    }, {
	        key: "checkValidity",
	        value: function checkValidity() {
	            var valid = undefined,
	                validationError = "";

	            var supportsValidation = !!this.refs.input.checkValidity;

	            // noValidate
	            var noValidate = !!(this.props.noValidate && this.props.noValidate != "false");

	            this.refs.input.noValidate = noValidate;

	            // If "noValidate" is set or "checkValidity" is not supported then
	            // consider the element valid. Otherwise consider it invalid and
	            // make some additional checks below
	            valid = noValidate || !supportsValidation;

	            if (valid) {
	                validationError = "";
	            } else {

	                // In some browsers once a pattern is set it connot be removed. The
	                // browser sets it to "" instead which results in validation
	                // failures...
	                if (this.refs.input.pattern === "") {
	                    this.refs.input.pattern = this.props.required ? ".+" : ".*";
	                }

	                // Now check validity
	                if (supportsValidation) {
	                    this.refs.input.checkValidity();
	                    valid = this.refs.input.validity.valid;

	                    if (!valid) {
	                        validationError = this.refs.input.validationMessage;
	                    }
	                }

	                // Some brousers might fail to validate maxLength
	                if (valid && supportsValidation && this.props.maxLength) {
	                    if (this.refs.input.value.length > this.props.maxLength) {
	                        validationError = "This value is too long";
	                    }
	                }
	            }

	            validationError = validationError || (valid ? "" : this.refs.input.validationMessage || "Unknown Error");

	            var validStateChanged = this._valid !== validationError;
	            this._valid = validationError;
	            if (validationError) {
	                addClass(this.refs.wrapper, "has-error");
	                if (validStateChanged) {
	                    this._invokeEventCallback("onInvalid", validationError, this.state.value, this.refs.input.value);
	                }
	            } else {
	                removeClass(this.refs.wrapper, "has-error");
	                if (validStateChanged) {
	                    this._invokeEventCallback("onValid", this.state.value, this.refs.input.value);
	                }
	            }
	        }

	        /**
	         * Used internally to parse the argument x to it's numeric representation.
	         * If the argument cannot be converted to finite number returns 0; If a
	         * "precision" prop is specified uses it round the number with that
	         * precision (no fixed precision here because the return value is float, not
	         * string).
	         */

	    }, {
	        key: "_toNumber",
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
	        key: "_parse",
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
	        key: "_format",
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
	        key: "_step",
	        value: function _step(n, callback) {
	            var _n = this._toNumber((this.state.value || 0) + this.props.step * n);

	            if (_n !== this.state.value) {
	                this.setState({ value: _n }, callback);
	                return true;
	            }

	            return false;
	        }

	        /**
	         * This gets called whenever the user edits the input value. The value will
	         * be recreated using the current parse/format methods so the input will
	         * appear as readonly if the user tries to type something invalid.
	         */

	    }, {
	        key: "_onChange",
	        value: function _onChange(e) {
	            this.setState({
	                value: this._parse(e.target.value)
	            });
	        }

	        /**
	         * This binds the Up/Down arrow key listeners
	         */

	    }, {
	        key: "_onKeyDown",
	        value: function _onKeyDown() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }

	            args[0].persist();
	            this._invokeEventCallback.apply(this, ["onKeyDown"].concat(args));
	            var e = args[0];
	            if (!e.isDefaultPrevented()) {
	                if (e.keyCode === KEYCODE_UP) {
	                    e.preventDefault();
	                    this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
	                } else if (e.keyCode === KEYCODE_DOWN) {
	                    e.preventDefault();
	                    this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
	                }
	            }
	        }
	    }, {
	        key: "_onSelectionChange",
	        value: function _onSelectionChange(e) {
	            var _this3 = this;

	            e.persist();
	            this.setState({
	                selectionStart: this.refs.input.selectionStart,
	                selectionEnd: this.refs.input.selectionEnd
	            }, function () {
	                switch (e.type) {
	                    case "input":
	                        if (_this3.props.onInput) {
	                            _this3.props.onInput.call(_this3.refs.input, e);
	                        }
	                        break;
	                    case "select":
	                        if (_this3.props.onSelect) {
	                            _this3.props.onSelect.call(_this3.refs.input, e);
	                        }
	                        break;
	                    case "selectstart":
	                        if (_this3.props.onSelectStart) {
	                            _this3.props.onSelectStart.call(_this3.refs.input, e);
	                        }
	                        break;
	                }
	            });
	        }

	        /**
	         * Stops the widget from auto-changing by clearing the timer (if any)
	         */

	    }, {
	        key: "stop",
	        value: function stop() {
	            if (this._timer) {
	                clearTimeout(this._timer);
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
	        key: "increase",
	        value: function increase() {
	            var _this4 = this;

	            var _recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            var callback = arguments[1];

	            this.stop();
	            this._step(1, callback);
	            if (isNaN(this.state.value) || this.state.value < this.props.max) {
	                this._timer = setTimeout(function () {
	                    _this4.increase(true);
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
	        key: "decrease",
	        value: function decrease() {
	            var _this5 = this;

	            var _recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            var callback = arguments[1];

	            this.stop();
	            this._step(-1, callback);
	            if (isNaN(this.state.value) || this.state.value > this.props.min) {
	                this._timer = setTimeout(function () {
	                    _this5.decrease(true);
	                }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
	            }
	        }

	        /**
	         * Handles the mousedown event on the up/down buttons. Changes The
	         * internal value and sets up a delay for auto increment/decrement
	         * (until mouseup or mouseleave)
	         */

	    }, {
	        key: "onMouseDown",
	        value: function onMouseDown(dir, callback) {
	            if (dir == 'down') {
	                this.decrease(false, callback);
	            } else if (dir == 'up') {
	                this.increase(false, callback);
	            }
	        }

	        /**
	         * Handles the touchstart event on the up/down buttons. Changes The
	         * internal value and DOES NOT sets up a delay for auto increment/decrement.
	         * Note that this calls e.preventDefault() so the event is not used for
	         * creating a virtual mousedown after it
	         */

	    }, {
	        key: "onTouchStart",
	        value: function onTouchStart(dir, e) {
	            e.preventDefault();
	            if (dir == 'down') {
	                this.decrease();
	            } else if (dir == 'up') {
	                this.increase();
	            }
	        }
	    }, {
	        key: "_invokeEventCallback",
	        value: function _invokeEventCallback(callbackName) {
	            if (typeof this.props[callbackName] == "function") {
	                var _props$callbackName;

	                for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                    args[_key3 - 1] = arguments[_key3];
	                }

	                (_props$callbackName = this.props[callbackName]).call.apply(_props$callbackName, [null].concat(args));
	            }
	        }

	        /**
	         * Renders an input wrapped in relative span and up/down buttons
	         * @return {Component}
	         */

	    }, {
	        key: "render",
	        value: function render() {
	            var _this6 = this;

	            var props = this.props;
	            var state = this.state;
	            var css = {};

	            var _props = this.props;
	            var
	            // These are ignored in rendering
	            step = _props.step;
	            var min = _props.min;
	            var max = _props.max;
	            var precision = _props.precision;
	            var parse = _props.parse;
	            var format = _props.format;
	            var mobile = _props.mobile;
	            var value = _props.value;
	            var type = _props.type;
	            var style = _props.style;
	            var defaultValue = _props.defaultValue;
	            var onInvalid = _props.onInvalid;
	            var onValid = _props.onValid;

	            var rest = _objectWithoutProperties(_props, ["step", "min", "max", "precision", "parse", "format", "mobile", "value", "type", "style", "defaultValue", "onInvalid", "onValid"]);

	            // Build the styles

	            for (var x in NumericInput.style) {
	                css[x] = _extends({}, NumericInput.style[x], style ? style[x] || {} : {});
	            }

	            var hasFormControl = props.className && /\bform-control\b/.test(props.className);

	            if (mobile == 'auto') {
	                mobile = IS_BROWSER && 'ontouchstart' in document;
	            }

	            if (typeof mobile == "function") {
	                mobile = mobile.call(this);
	            }
	            mobile = !!mobile;

	            var attrs = {
	                wrap: {
	                    style: style === false ? null : css.wrap,
	                    className: 'react-numeric-input',
	                    ref: 'wrapper',
	                    onMouseUp: undefined,
	                    onMouseLeave: undefined
	                },
	                input: _extends({
	                    ref: 'input',
	                    type: 'text',
	                    style: style === false ? null : _extends({}, css.input, !hasFormControl ? css['input:not(.form-control)'] : {}, state.inputFocus ? css['input:focus'] : {})
	                }, rest),
	                btnUp: {
	                    onMouseEnter: undefined,
	                    onMouseDown: undefined,
	                    onMouseUp: undefined,
	                    onMouseLeave: undefined,
	                    onTouchStart: undefined,
	                    onTouchEnd: undefined,
	                    style: style === false ? null : _extends({}, css.btn, css.btnUp, props.disabled ? css['btn:disabled'] : state.btnUpActive ? css['btn:active'] : state.btnUpHover ? css['btn:hover'] : {})
	                },
	                btnDown: {
	                    onMouseEnter: undefined,
	                    onMouseDown: undefined,
	                    onMouseUp: undefined,
	                    onMouseLeave: undefined,
	                    onTouchStart: undefined,
	                    onTouchEnd: undefined,
	                    style: style === false ? null : _extends({}, css.btn, css.btnDown, props.disabled ? css['btn:disabled'] : state.btnDownActive ? css['btn:active'] : state.btnDownHover ? css['btn:hover'] : {})
	                }
	            };

	            if (state.value || state.value === 0) {
	                attrs.input.value = this._format(state.value);
	            } else {
	                attrs.input.value = "";
	            }

	            if (hasFormControl && style !== false) {
	                _extends(attrs.wrap.style, css['wrap.hasFormControl']);
	            }

	            // mobile
	            if (mobile && style !== false) {
	                _extends(attrs.input.style, css['input.mobile']);
	                _extends(attrs.btnUp.style, css['btnUp.mobile']);
	                _extends(attrs.btnDown.style, css['btnDown.mobile']);
	            }

	            // Attach event listeners if the widget is not disabled
	            if (!props.disabled) {
	                _extends(attrs.wrap, {
	                    onMouseUp: this.stop,
	                    onMouseLeave: this.stop
	                });

	                _extends(attrs.btnUp, {
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
	                    onMouseDown: function onMouseDown() {
	                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                            args[_key4] = arguments[_key4];
	                        }

	                        args[0].preventDefault();
	                        args[0].persist();
	                        _this6.setState({
	                            btnUpHover: true,
	                            btnUpActive: true,
	                            inputFocus: true
	                        }, function () {
	                            _this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
	                        });
	                        _this6.onMouseDown('up');
	                    }
	                });

	                _extends(attrs.btnDown, {
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
	                    onMouseDown: function onMouseDown() {
	                        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                            args[_key5] = arguments[_key5];
	                        }

	                        args[0].preventDefault();
	                        args[0].persist();
	                        _this6.setState({
	                            btnDownHover: true,
	                            btnDownActive: true,
	                            inputFocus: true
	                        }, function () {
	                            _this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
	                        });
	                        _this6.onMouseDown('down');
	                    }
	                });

	                _extends(attrs.input, {
	                    onChange: this._onChange.bind(this),
	                    onKeyDown: this._onKeyDown.bind(this),
	                    onInput: this._onSelectionChange.bind(this),
	                    onSelect: this._onSelectionChange.bind(this),
	                    onSelectStart: this._onSelectionChange.bind(this),
	                    onFocus: function onFocus() {
	                        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	                            args[_key6] = arguments[_key6];
	                        }

	                        args[0].persist();
	                        _this6.setState({ inputFocus: true }, function () {
	                            _this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
	                        });
	                    },
	                    onBlur: function onBlur() {
	                        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	                            args[_key7] = arguments[_key7];
	                        }

	                        args[0].persist();
	                        _this6.setState({ inputFocus: false }, function () {
	                            _this6._invokeEventCallback.apply(_this6, ["onBlur"].concat(args));
	                        });
	                    }
	                });
	            } else {
	                if (style !== false) {
	                    _extends(attrs.input.style, css['input:disabled']);
	                }
	            }

	            if (mobile) {
	                return _react2.default.createElement(
	                    "span",
	                    attrs.wrap,
	                    _react2.default.createElement("input", attrs.input),
	                    _react2.default.createElement(
	                        "b",
	                        attrs.btnUp,
	                        _react2.default.createElement("i", { style: style === false ? null : css.minus }),
	                        _react2.default.createElement("i", { style: style === false ? null : css.plus })
	                    ),
	                    _react2.default.createElement(
	                        "b",
	                        attrs.btnDown,
	                        _react2.default.createElement("i", { style: style === false ? null : css.minus })
	                    )
	                );
	            }

	            return _react2.default.createElement(
	                "span",
	                attrs.wrap,
	                _react2.default.createElement("input", attrs.input),
	                _react2.default.createElement(
	                    "b",
	                    attrs.btnUp,
	                    _react2.default.createElement("i", { style: style === false ? null : css.arrowUp })
	                ),
	                _react2.default.createElement(
	                    "b",
	                    attrs.btnDown,
	                    _react2.default.createElement("i", { style: style === false ? null : css.arrowDown })
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
	    maxLength: PropTypes.number,
	    parse: PropTypes.func,
	    format: PropTypes.func,
	    className: PropTypes.string,
	    disabled: PropTypes.bool,
	    readOnly: PropTypes.bool,
	    required: PropTypes.bool,
	    noValidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	    style: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	    type: PropTypes.string,
	    pattern: PropTypes.string,
	    onFocus: PropTypes.func,
	    onBlur: PropTypes.func,
	    onKeyDown: PropTypes.func,
	    onChange: PropTypes.func,
	    onInvalid: PropTypes.func,
	    onValid: PropTypes.func,
	    onInput: PropTypes.func,
	    onSelect: PropTypes.func,
	    onSelectStart: PropTypes.func,
	    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    mobile: function mobile(props, propName) {
	        var prop = props[propName];
	        if (prop !== true && prop !== false && prop !== 'auto' && typeof prop != 'function') {
	            return new Error('The "mobile" prop must be true, false, "auto" or a function');
	        }
	    }
	};
	NumericInput.defaultProps = {
	    // value     : '',
	    step: 1,
	    min: Number.MIN_SAFE_INTEGER || -9007199254740991,
	    max: Number.MAX_SAFE_INTEGER || 9007199254740991,
	    precision: 0,
	    parse: null,
	    format: null,
	    // className : '',
	    mobile: 'auto',
	    style: {} };
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
	        boxShadow: "-1px -1px 3px rgba(0,0,0,.1) inset,\n                1px 1px 3px rgba(255,255,255,.7) inset"
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
	        boxShadow: "0 1px 3px rgba(0,0,0,.2) inset,\n                -1px -1px 4px rgba(255,255,255,.5) inset"
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

	    'input:focus': {},

	    'input:disabled': {
	        color: 'rgba(0, 0, 0, 0.3)',
	        textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)'
	    }
	};
	NumericInput.SPEED = 50;
	NumericInput.DELAY = 500;

	module.exports = NumericInput;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;