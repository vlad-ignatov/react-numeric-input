(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["NumericInput"] = factory(require("React"), require("prop-types"));
	else
		root["NumericInput"] = factory(root["React"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	var IS_BROWSER = typeof document != 'undefined';

	/**
	 * Just a simple helper to provide support for older IEs. This is not exactly a
	 * polyfill for classList.add but it does what we need with minimal effort.
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
	 * polyfill for classList.remove but it does what we need with minimal effort.
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

	/**
	 * The structure of the InputEvents that we use (not complete but only the used
	 * properties)
	 */

	var NumericInput = function (_Component) {
	    _inherits(NumericInput, _Component);

	    /**
	     * Set the initial state and bind this.stop to the instance.
	     */


	    /**
	     * The step timer
	     * @type {Number}
	     */


	    /**
	     * This holds the last known validation error. We need to compare that with
	     * new errors and detect validation changes...
	     * @type {[type]}
	     */


	    /**
	     * The state of the component
	     * @type {Object}
	     */


	    /**
	     * The stop method (need to declare it here to use it in the constructor)
	     * @type {Function}
	     */


	    /**
	     * When click and hold on a button - the speed of auto changing the value.
	     * This is a static property and can be modified if needed.
	     */


	    /**
	     * The default behavior is to start from 0, use step of 1 and display
	     * integers
	     */
	    function NumericInput() {
	        var _ref;

	        _classCallCheck(this, NumericInput);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_ref = NumericInput.__proto__ || Object.getPrototypeOf(NumericInput)).call.apply(_ref, [this].concat(args)));

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
	     * When click and hold on a button - the delay before auto changing the value.
	     * This is a static property and can be modified if needed.
	     */


	    /**
	     * This are the default styles that act as base for all the component
	     * instances. One can modify this object to change the default styles
	     * of all the widgets on the page.
	     */


	    _createClass(NumericInput, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            if (props.hasOwnProperty("value")) {
	                var _value = String(props.value || props.value === 0 ? props.value : '').replace(/^\s*|\s*$/, "");

	                this.setState({
	                    value: "value" in props && _value !== '' ? this._parse(_value) : null,
	                    stringValue: _value
	                });
	            }
	        }

	        /**
	         * Save the input selection right before rendering
	         */

	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {
	            this.saveSelection();
	        }

	        /**
	         * After the component has been rendered into the DOM, do whatever is
	         * needed to "reconnect" it to the outer world, i.e. restore selection,
	         * call some of the callbacks, validate etc.
	         */

	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            // Call the onChange if needed. This is placed here because there are
	            // many reasons for changing the value and this is the common place
	            // that can capture them all
	            if (prevState.value !== this.state.value && (!isNaN(this.state.value) || this.state.value === null)) {
	                this._invokeEventCallback("onChange", this.state.value, this.refs.input.value, this.refs.input);
	            }

	            // focus the input is needed (for example up/down buttons set
	            // this.state.inputFocus to true)
	            if (this.state.inputFocus) {
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

	            this.checkValidity();
	        }

	        /**
	         * This is used to clear the timer if any
	         */

	    }, {
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
	                    value: _this2._parse(value),
	                    stringValue: value
	                });
	            };

	            // This is a special case! If the component has the "autoFocus" prop
	            // and the browser did focus it we have to pass that to the onFocus
	            if (!this.state.inputFocus && IS_BROWSER && document.activeElement === this.refs.input) {
	                this.state.inputFocus = true;
	                this.refs.input.focus();
	                this._invokeEventCallback("onFocus", {
	                    target: this.refs.input,
	                    type: "focus"
	                });
	            }

	            this.checkValidity();
	        }

	        /**
	         * Saves the input selection in the state so that it can be restored after
	         * updates
	         */

	    }, {
	        key: 'saveSelection',
	        value: function saveSelection() {
	            this.state.selectionStart = this.refs.input.selectionStart;
	            this.state.selectionEnd = this.refs.input.selectionEnd;
	        }

	        /**
	         * Unless noValidate is set to true, the component will check the
	         * existing validation state (if any) and will toggle the "has-error"
	         * CSS class on the wrapper
	         */

	    }, {
	        key: 'checkValidity',
	        value: function checkValidity() {
	            var valid = void 0,
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

	                // In some browsers once a pattern is set it cannot be removed. The
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

	                // Some browsers might fail to validate maxLength
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
	        key: '_toNumber',
	        value: function _toNumber(x, loose) {
	            loose = loose === undefined ? this.state.inputFocus && !(this.state.btnDownActive || this.state.btnUpActive) : !!loose;
	            var n = parseFloat(x);
	            var q = Math.pow(10, this.props.precision);
	            if (isNaN(n) || !isFinite(n)) {
	                n = 0;
	            }

	            if (loose) {
	                return n;
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
	         * This is used internally to format a number to it's display representation.
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
	         * The internal method that actually sets the new value on the input
	         * @private
	         */

	    }, {
	        key: '_step',
	        value: function _step(n, callback) {
	            var _stepSize = n < 0 && this.props.downStep > 0 ? this.props.downStep : this.props.step;
	            var _n = this._toNumber((this.state.value || 0) + _stepSize * n, false);

	            if (this.props.snap) {
	                _n = Math.round(_n / _stepSize) * _stepSize;
	            }

	            if (_n !== this.state.value) {
	                this.setState({ value: _n, stringValue: _n }, callback);
	                return true;
	            }

	            return false;
	        }

	        /**
	         * This binds the Up/Down arrow key listeners
	         */

	    }, {
	        key: '_onKeyDown',
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
	                } else {
	                    var _value2 = this.refs.input.value,
	                        length = _value2.length;
	                    if (e.keyCode === 8) {
	                        // backspace
	                        if (this.refs.input.selectionStart == this.refs.input.selectionEnd && this.refs.input.selectionEnd > 0 && _value2.length && _value2.charAt(this.refs.input.selectionEnd - 1) === ".") {
	                            e.preventDefault();
	                            this.refs.input.selectionStart = this.refs.input.selectionEnd = this.refs.input.selectionEnd - 1;
	                        }
	                    } else if (e.keyCode === 46) {
	                        // delete
	                        if (this.refs.input.selectionStart == this.refs.input.selectionEnd && this.refs.input.selectionEnd < length + 1 && _value2.length && _value2.charAt(this.refs.input.selectionEnd) === ".") {
	                            e.preventDefault();
	                            this.refs.input.selectionStart = this.refs.input.selectionEnd = this.refs.input.selectionEnd + 1;
	                        }
	                    }
	                }
	            }
	        }

	        /**
	         * Stops the widget from auto-changing by clearing the timer (if any)
	         */

	    }, {
	        key: 'stop',
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
	        key: 'increase',
	        value: function increase() {
	            var _this3 = this;

	            var _recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            var callback = arguments[1];

	            this.stop();
	            this._step(1, callback);
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
	        value: function decrease() {
	            var _this4 = this;

	            var _recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            var callback = arguments[1];

	            this.stop();
	            this._step(-1, callback);
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
	         * Helper method to invoke event callback functions if they are provided
	         * in the props.
	         * @param {String} callbackName The name of the function prop
	         * @param {*[]} args Any additional argument are passed thru
	         */

	    }, {
	        key: '_invokeEventCallback',
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
	        key: 'render',
	        value: function render() {
	            var _this5 = this;

	            var props = this.props;
	            var state = this.state;
	            var css = {};

	            var _props = this.props,
	                step = _props.step,
	                min = _props.min,
	                max = _props.max,
	                precision = _props.precision,
	                parse = _props.parse,
	                format = _props.format,
	                mobile = _props.mobile,
	                snap = _props.snap,
	                value = _props.value,
	                type = _props.type,
	                style = _props.style,
	                defaultValue = _props.defaultValue,
	                onInvalid = _props.onInvalid,
	                onValid = _props.onValid,
	                rest = _objectWithoutProperties(_props, ['step', 'min', 'max', 'precision', 'parse', 'format', 'mobile', 'snap', 'value', 'type', 'style', 'defaultValue', 'onInvalid', 'onValid']);

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

	            if (/^[+-.]{1,2}$/.test(state.stringValue)) {
	                attrs.input.value = state.stringValue;
	            } else if (state.value || state.value === 0) {
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
	                        _this5.setState({
	                            btnUpHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this5.stop();
	                        _this5.setState({
	                            btnUpHover: false,
	                            btnUpActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this5.setState({
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
	                        _this5.setState({
	                            btnUpHover: true,
	                            btnUpActive: true,
	                            inputFocus: true
	                        }, function () {
	                            _this5._invokeEventCallback.apply(_this5, ["onFocus"].concat(args));
	                        });
	                        _this5.onMouseDown('up');
	                    }
	                });

	                _extends(attrs.btnDown, {
	                    onTouchStart: this.onTouchStart.bind(this, 'down'),
	                    onTouchEnd: this.stop,
	                    onMouseEnter: function onMouseEnter() {
	                        _this5.setState({
	                            btnDownHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this5.stop();
	                        _this5.setState({
	                            btnDownHover: false,
	                            btnDownActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this5.setState({
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
	                        _this5.setState({
	                            btnDownHover: true,
	                            btnDownActive: true,
	                            inputFocus: true
	                        }, function () {
	                            _this5._invokeEventCallback.apply(_this5, ["onFocus"].concat(args));
	                        });
	                        _this5.onMouseDown('down');
	                    }
	                });

	                _extends(attrs.input, {
	                    onChange: function onChange(e) {
	                        var original = e.target.value;
	                        var val = _this5._parse(original);
	                        if (isNaN(val)) {
	                            val = null;
	                        }
	                        _this5.setState({ value: val, stringValue: original });
	                    },
	                    onKeyDown: this._onKeyDown.bind(this),
	                    onInput: function onInput() {
	                        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	                            args[_key6] = arguments[_key6];
	                        }

	                        _this5.saveSelection();
	                        _this5._invokeEventCallback.apply(_this5, ["onInput"].concat(args));
	                    },
	                    onSelect: function onSelect() {
	                        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	                            args[_key7] = arguments[_key7];
	                        }

	                        _this5.saveSelection();
	                        _this5._invokeEventCallback.apply(_this5, ["onSelect"].concat(args));
	                    },
	                    onFocus: function onFocus() {
	                        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	                            args[_key8] = arguments[_key8];
	                        }

	                        args[0].persist();
	                        _this5.setState({ inputFocus: true }, function () {
	                            var val = _this5._parse(args[0].target.value);
	                            _this5.setState({
	                                value: val,
	                                stringValue: val
	                            }, function () {
	                                _this5._invokeEventCallback.apply(_this5, ["onFocus"].concat(args));
	                            });
	                        });
	                    },
	                    onBlur: function onBlur() {
	                        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	                            args[_key9] = arguments[_key9];
	                        }

	                        args[0].persist();
	                        _this5.setState({ inputFocus: false }, function () {
	                            var val = _this5._parse(args[0].target.value);
	                            _this5.setState({
	                                value: val
	                            }, function () {
	                                _this5._invokeEventCallback.apply(_this5, ["onBlur"].concat(args));
	                            });
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
	                    'span',
	                    attrs.wrap,
	                    _react2.default.createElement('input', attrs.input),
	                    _react2.default.createElement(
	                        'b',
	                        attrs.btnUp,
	                        _react2.default.createElement('i', { style: style === false ? null : css.minus }),
	                        _react2.default.createElement('i', { style: style === false ? null : css.plus })
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        attrs.btnDown,
	                        _react2.default.createElement('i', { style: style === false ? null : css.minus })
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
	                    _react2.default.createElement('i', { style: style === false ? null : css.arrowUp })
	                ),
	                _react2.default.createElement(
	                    'b',
	                    attrs.btnDown,
	                    _react2.default.createElement('i', { style: style === false ? null : css.arrowDown })
	                )
	            );
	        }
	    }]);

	    return NumericInput;
	}(_react.Component);

	NumericInput.propTypes = {
	    step: _propTypes2.default.number,
	    downStep: _propTypes2.default.number,
	    min: _propTypes2.default.number,
	    max: _propTypes2.default.number,
	    precision: _propTypes2.default.number,
	    maxLength: _propTypes2.default.number,
	    parse: _propTypes2.default.func,
	    format: _propTypes2.default.func,
	    className: _propTypes2.default.string,
	    disabled: _propTypes2.default.bool,
	    readOnly: _propTypes2.default.bool,
	    required: _propTypes2.default.bool,
	    snap: _propTypes2.default.bool,
	    noValidate: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
	    style: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
	    type: _propTypes2.default.string,
	    pattern: _propTypes2.default.string,
	    onFocus: _propTypes2.default.func,
	    onBlur: _propTypes2.default.func,
	    onKeyDown: _propTypes2.default.func,
	    onChange: _propTypes2.default.func,
	    onInvalid: _propTypes2.default.func,
	    onValid: _propTypes2.default.func,
	    onInput: _propTypes2.default.func,
	    onSelect: _propTypes2.default.func,
	    size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    mobile: function mobile(props, propName) {
	        var prop = props[propName];
	        if (prop !== true && prop !== false && prop !== 'auto' && typeof prop != 'function') {
	            return new Error('The "mobile" prop must be true, false, "auto" or a function');
	        }
	    }
	};
	NumericInput.defaultProps = {
	    step: 1,
	    min: Number.MIN_SAFE_INTEGER || -9007199254740991,
	    max: Number.MAX_SAFE_INTEGER || 9007199254740991,
	    precision: 0,
	    parse: null,
	    format: null,
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
	        boxShadow: '-1px -1px 3px rgba(0,0,0,.1) inset,' + '1px 1px 3px rgba(255,255,255,.7) inset'
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
	        boxShadow: '0 1px 3px rgba(0,0,0,.2) inset,' + '-1px -1px 4px rgba(255,255,255,.5) inset'
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;