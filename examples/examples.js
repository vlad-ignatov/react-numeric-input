(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("ReactDOM")) : factory(root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Demo = __webpack_require__(3);

	var _Demo2 = _interopRequireDefault(_Demo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import NumericInput from '../index.js';

	$(function () {
	    $('script.jsx').each(function (i, s) {
	        var div = $('<div/>'),
	            props = Function('return (' + $(s).text() + ')')();
	        $(s).replaceWith(div);
	        var widget = _reactDom2.default.render(_react2.default.createElement(NumericInput, props), div[0]);
	        div.data("widget", widget);
	    });

	    _reactDom2.default.render(_react2.default.createElement(_Demo2.default, null), $('.demo')[0]);

	    hljs.configure({ useBR: false });

	    $('.code').each(function (i, block) {
	        hljs.highlightBlock(block);
	    });
	}); /* global $, hljs, NumericInput */

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Demo = function (_React$Component) {
	    _inherits(Demo, _React$Component);

	    function Demo() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, Demo);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Demo)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        _this.state = {
	            inputProps: {
	                className: { value: "form-control", on: true },
	                value: { value: 50, on: true },
	                min: { value: 0, on: true },
	                max: { value: 100, on: true },
	                precision: { value: 0, on: true },
	                size: { value: 5, on: true },
	                disabled: { value: true, on: false },
	                readOnly: { value: true, on: false },
	                mobile: { value: true, on: false }
	            }
	        };
	        return _this;
	    }

	    _createClass(Demo, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            hljs.highlightBlock(this.refs.code);
	        }
	    }, {
	        key: 'toggleProp',
	        value: function toggleProp(propName) {
	            this.state.inputProps[propName].on = !this.state.inputProps[propName].on;
	            this.setState(this.state);
	        }
	    }, {
	        key: 'setProp',
	        value: function setProp(propName, event) {
	            var val = event.target ? event.target.value : event;
	            this.state.inputProps[propName].value = val;
	            this.setState(this.state);
	        }
	    }, {
	        key: 'renderCode',
	        value: function renderCode() {
	            var out = '<NumericInput ';
	            var hasProps = false;

	            for (var propName in this.state.inputProps) {
	                if (this.state.inputProps[propName].on) {
	                    var val = this.state.inputProps[propName].value;
	                    out += '\n\t' + propName;
	                    if (val !== true) {
	                        out += '=' + (typeof val == 'string' ? '"' + val + '" ' : '{ ' + val + ' } ');
	                    }
	                    hasProps = true;
	                }
	            }

	            if (hasProps) {
	                out += '\n';
	            }

	            out += '/>';

	            return React.createElement(
	                'div',
	                { className: 'code js', ref: 'code' },
	                out
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var inputProps = {};
	            for (var propName in this.state.inputProps) {
	                if (this.state.inputProps[propName].on) {
	                    inputProps[propName] = this.state.inputProps[propName].value;
	                }
	            }

	            return React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(
	                    'div',
	                    { className: 'col-xs-6' },
	                    React.createElement(
	                        'div',
	                        { className: 'panel panel-default' },
	                        React.createElement(
	                            'div',
	                            { className: 'panel-heading' },
	                            'Props'
	                        ),
	                        React.createElement(
	                            'table',
	                            { className: 'table table-striped table-condensed' },
	                            React.createElement(
	                                'thead',
	                                null,
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'prop name'
	                                    ),
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'enable'
	                                    ),
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'prop value'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'tbody',
	                                null,
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'className'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.className.on,
	                                            onChange: this.toggleProp.bind(this, 'className')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'text',
	                                            className: 'form-control',
	                                            value: this.state.inputProps.className.value,
	                                            onChange: this.setProp.bind(this, 'className')
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'value'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.value.on,
	                                            onChange: this.toggleProp.bind(this, 'value')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'text',
	                                            className: 'form-control',
	                                            value: this.state.inputProps.value.value,
	                                            onChange: this.setProp.bind(this, 'value')
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'min'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.min.on,
	                                            onChange: this.toggleProp.bind(this, 'min')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement(NumericInput, {
	                                            className: 'form-control',
	                                            value: this.state.inputProps.min.value,
	                                            onChange: this.setProp.bind(this, 'min')
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'max'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.max.on,
	                                            onChange: this.toggleProp.bind(this, 'max')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement(NumericInput, {
	                                            className: 'form-control',
	                                            value: this.state.inputProps.max.value,
	                                            onChange: this.setProp.bind(this, 'max')
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'precision'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.precision.on,
	                                            onChange: this.toggleProp.bind(this, 'precision')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement(NumericInput, {
	                                            className: 'form-control',
	                                            value: this.state.inputProps.precision.value,
	                                            onChange: this.setProp.bind(this, 'precision'),
	                                            max: 20,
	                                            min: 0
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'size'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.size.on,
	                                            onChange: this.toggleProp.bind(this, 'size')
	                                        })
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement(NumericInput, {
	                                            className: 'form-control',
	                                            value: this.state.inputProps.size.value,
	                                            onChange: this.setProp.bind(this, 'size')
	                                        })
	                                    )
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'disabled'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.disabled.on,
	                                            onChange: this.toggleProp.bind(this, 'disabled')
	                                        })
	                                    ),
	                                    React.createElement('td', null)
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'readOnly'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.readOnly.on,
	                                            onChange: this.toggleProp.bind(this, 'readOnly')
	                                        })
	                                    ),
	                                    React.createElement('td', null)
	                                ),
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'th',
	                                        null,
	                                        'mobile'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        React.createElement('input', {
	                                            type: 'checkbox',
	                                            checked: this.state.inputProps.mobile.on,
	                                            onChange: this.toggleProp.bind(this, 'mobile')
	                                        })
	                                    ),
	                                    React.createElement('td', null)
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'col-xs-6' },
	                    React.createElement(
	                        'div',
	                        { className: 'panel panel-primary' },
	                        React.createElement(
	                            'div',
	                            { className: 'panel-heading' },
	                            'Result'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'panel-body' },
	                            React.createElement(NumericInput, inputProps),
	                            React.createElement('hr', null),
	                            this.renderCode()
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Demo;
	}(React.Component);

	exports.default = Demo;

/***/ }
/******/ ])
});
;