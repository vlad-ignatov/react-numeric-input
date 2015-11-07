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

	// require('../src/style/NumericInput.less');// webpack magic

	$(function () {
	    $('script.jsx').each(function (i, s) {
	        var div = $('<div/>'),
	            props = Function('return (' + $(s).text() + ')')();

	        $(s).replaceWith(div);
	        ReactDOM.render(React.createElement(_srcNumericInputJsx2['default'], props), div[0]);

	        // Touch
	        // div.append('<br/><br/>Touch:<br/>');
	        // div = $('<div class="mobile"/>').appendTo(div);
	        // ReactDOM.render(<NumericInput {...props}/>, div[0]);
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	var SPEED = 50;
	exports.SPEED = SPEED;
	var DELAY = 500;

	exports.DELAY = DELAY;

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
	            disabled: _react.PropTypes.bool,
	            readOnly: _react.PropTypes.bool,
	            style: _react.PropTypes.object,
	            type: _react.PropTypes.string,
	            size: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
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
	            format: null,
	            className: '',
	            style: {}
	        },

	        /**
	         * This are the default styles that act as base for all the component
	         * instances. One can modify this object to change the default styles
	         * of all the widgets on the page.
	         */
	        enumerable: true
	    }, {
	        key: 'style',
	        value: {

	            // The wrapper (span)
	            wrap: {
	                position: 'relative',
	                display: 'inline-block'
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

	            btnDown: {
	                top: '50%',
	                bottom: 2,
	                borderRadius: '0 0 2px 2px',
	                borderWidth: '0 1px 1px 1px'
	            },

	            'btn:hover': {
	                background: 'rgba(0,0,0,.2)'
	            },

	            'btn:active': {
	                background: 'rgba(0,0,0,.3)',
	                boxShadow: '0 1px 3px rgba(0,0,0,.2) inset, -1px -1px 4px rgba(255,255,255,.5) inset'
	            },

	            'btn:disabled': {
	                opacity: .5,
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

	            'input:focus': {}
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
	            style: {},
	            value: 'value' in props ? this._parse(String(props.value || '')) : null
	        };

	        for (var x in NumericInput.style) {
	            this.state.style[x] = Object.assign({}, NumericInput.style[x], props.style[x] || {});
	        }

	        this.stop = this.stop.bind(this);
	    }

	    /**
	     * This is used to clear the timer if any
	     */

	    _createClass(NumericInput, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.stop();
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
	         * Handles the mousedown event on the up/down buttons. Changes The
	         * internal value and sets up a delay for auto increment/decrement
	         * (until mouseup or mouseleave)
	         */
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(dir, e) {
	            var _this3 = this;

	            e.preventDefault();
	            if (dir == 'down') {
	                this.decrease();
	            } else if (dir == 'up') {
	                this.increase();
	            }
	            setTimeout(function () {
	                _this3.refs.input.focus();
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
	            var _this4 = this;

	            var _props = this.props;
	            var
	            // These are ignored in rendering
	            step = _props.step;
	            var min = _props.min;
	            var max = _props.max;
	            var precision = _props.precision;
	            var parse = _props.parse;
	            var format = _props.format;
	            var value = _props.value;
	            var type = _props.type;
	            var style = _props.style;
	            var rest = _objectWithoutProperties(_props, ['step', 'min', 'max', 'precision', 'parse', 'format', 'value', 'type', 'style']);

	            var attrs = {
	                wrap: {
	                    style: Object.assign({}, NumericInput.style.wrap, this.props.style.wrap),
	                    className: 'react-numeric-input'
	                },
	                input: _extends({
	                    ref: 'input',
	                    type: 'text',
	                    style: Object.assign({}, this.state.style.input, this.props.className && !/\bform-control\b/.test(this.props.className) ? this.state.style['input:not(.form-control)'] : {}, this.state.inputFocus ? this.state.style['input:focus'] : {}),
	                    value: this.state.value || this.state.value === 0 ? this._format(this.state.value) : ''
	                }, rest),
	                btnUp: {
	                    style: Object.assign({}, this.state.style.btn, this.state.style.btnUp, this.props.disabled ? this.state.style['btn:disabled'] : this.state.btnUpActive ? this.state.style['btn:active'] : this.state.btnUpHover ? this.state.style['btn:hover'] : {})
	                },
	                btnDown: {
	                    style: Object.assign({}, this.state.style.btn, this.state.style.btnDown, this.props.disabled ? this.state.style['btn:disabled'] : this.state.btnDownActive ? this.state.style['btn:active'] : this.state.btnDownHover ? this.state.style['btn:hover'] : {})
	                }
	            };

	            // Attach event listeners if the widget is not disabled
	            if (!this.props.disabled) {
	                Object.assign(attrs.wrap, {
	                    onMouseUp: this.stop,
	                    onMouseLeave: this.stop
	                });

	                Object.assign(attrs.btnUp, {
	                    onTouchStart: this.onTouchStart.bind(this, 'up'),
	                    onTouchEnd: this.stop,
	                    onMouseEnter: function onMouseEnter() {
	                        _this4.setState({
	                            btnUpHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this4.stop();
	                        _this4.setState({
	                            btnUpHover: false,
	                            btnUpActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this4.setState({
	                            btnUpHover: true,
	                            btnUpActive: false
	                        });
	                    },
	                    onMouseDown: function onMouseDown(e) {
	                        _this4.setState({
	                            btnUpHover: true,
	                            btnUpActive: true
	                        });
	                        _this4.onMouseDown('up', e);
	                    }
	                });

	                Object.assign(attrs.btnDown, {
	                    onTouchStart: this.onTouchStart.bind(this, 'down'),
	                    onTouchEnd: this.stop,
	                    onMouseEnter: function onMouseEnter() {
	                        _this4.setState({
	                            btnDownHover: true
	                        });
	                    },
	                    onMouseLeave: function onMouseLeave() {
	                        _this4.stop();
	                        _this4.setState({
	                            btnDownHover: false,
	                            btnDownActive: false
	                        });
	                    },
	                    onMouseUp: function onMouseUp() {
	                        _this4.setState({
	                            btnDownHover: true,
	                            btnDownActive: false
	                        });
	                    },
	                    onMouseDown: function onMouseDown(e) {
	                        _this4.setState({
	                            btnDownHover: true,
	                            btnDownActive: true
	                        });
	                        _this4.onMouseDown('down', e);
	                    }
	                });

	                Object.assign(attrs.input, {
	                    onChange: this._onChange.bind(this),
	                    onKeyDown: this._onKeyDown.bind(this),
	                    onFocus: function onFocus() {
	                        _this4.setState({ inputFocus: true });
	                    },
	                    onBlur: function onBlur() {
	                        _this4.setState({ inputFocus: false });
	                    }
	                });
	            }

	            return React.createElement(
	                'span',
	                attrs.wrap,
	                React.createElement('input', attrs.input),
	                React.createElement(
	                    'b',
	                    attrs.btnUp,
	                    React.createElement('i', { style: this.state.style.arrowUp })
	                ),
	                React.createElement(
	                    'b',
	                    attrs.btnDown,
	                    React.createElement('i', { style: this.state.style.arrowDown })
	                )
	            );
	        }
	    }]);

	    return NumericInput;
	})(_react.Component);

	exports['default'] = NumericInput;

	// The rest are passed to the input

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);