// @flow
import React, { PropTypes, Component } from "react"

const KEYCODE_UP   = 38;
const KEYCODE_DOWN = 40;
const IS_BROWSER   = typeof document != 'undefined';

/**
 * Just a simple helper to provide support for older IEs. This is not exactly a
 * polyfill for classList.add but it does what we need with minimal efford.
 * Works with single className only!
 */
function addClass(element, className) {
    if (element.classList) {
        return element.classList.add(className)
    }
    if (!element.className.search(new RegExp("\\b" + className + "\\b"))) {
        element.className = " " + className
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
            return element.classList.remove(className)
        }

        element.className = element.className.replace(
            new RegExp("\\b" + className + "\\b", "g"),
            ""
        )
    }
}

/**
 * The structure of the InputEvents that we use (not complete but only the used
 * properties)
 */
interface InputEvent {
    type: string;
    target: { value: string };
    persist: Function;
}

class NumericInput extends Component
{
    static propTypes = {
        step         : PropTypes.number,
        min          : PropTypes.number,
        max          : PropTypes.number,
        precision    : PropTypes.number,
        maxLength    : PropTypes.number,
        parse        : PropTypes.func,
        format       : PropTypes.func,
        className    : PropTypes.string,
        disabled     : PropTypes.bool,
        readOnly     : PropTypes.bool,
        required     : PropTypes.bool,
        noValidate   : PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        style        : PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        type         : PropTypes.string,
        pattern      : PropTypes.string,
        onFocus      : PropTypes.func,
        onBlur       : PropTypes.func,
        onKeyDown    : PropTypes.func,
        onChange     : PropTypes.func,
        onInvalid    : PropTypes.func,
        onValid      : PropTypes.func,
        onInput      : PropTypes.func,
        onSelect     : PropTypes.func,
        size         : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        value        : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        defaultValue : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        mobile(props, propName) {
            let prop = props[propName]
            if (prop !== true && prop !== false && prop !== 'auto' &&
                typeof prop != 'function') {
                return new Error(
                    'The "mobile" prop must be true, false, "auto" or a function'
                );
            }
        }
    };

    /**
     * The deault behaviour is to start from 0, use step of 1 and display
     * integers
     */
    static defaultProps = {
        step      : 1,
        min       : Number.MIN_SAFE_INTEGER || -9007199254740991,
        max       : Number.MAX_SAFE_INTEGER ||  9007199254740991,
        precision : 0,
        parse     : null,
        format    : null,
        mobile    : 'auto',
        style     : {}
    };

    /**
     * This are the default styles that act as base for all the component
     * instances. One can modify this object to change the default styles
     * of all the widgets on the page.
     */
    static style = {

        // The wrapper (span)
        wrap: {
            position: 'relative',
            display : 'inline-block'
        },

        'wrap.hasFormControl': {
            display : 'block'
        },

        // The increase button arrow (i)
        arrowUp: {
            position   : 'absolute',
            top        : '50%',
            left       : '50%',
            width      : 0,
            height     : 0,
            borderWidth: '0 0.6ex 0.6ex 0.6ex',
            borderColor: 'transparent transparent rgba(0, 0, 0, 0.7)',
            borderStyle: 'solid',
            margin     : '-0.3ex 0 0 -0.56ex'
        },

        // The decrease button arrow (i)
        arrowDown: {
            position   : 'absolute',
            top        : '50%',
            left       : '50%',
            width      : 0,
            height     : 0,
            borderWidth: '0.6ex 0.6ex 0 0.6ex',
            borderColor: 'rgba(0, 0, 0, 0.7) transparent transparent',
            borderStyle: 'solid',
            margin     : '-0.3ex 0 0 -0.56ex'
        },

        // The vertical segment of the plus sign (for mobile only)
        plus: {
            position   : 'absolute',
            top        : '50%',
            left       : '50%',
            width      : 2,
            height     : 10,
            background : 'rgba(0,0,0,.7)',
            margin     : '-5px 0 0 -1px'
        },

        // The horizontal segment of the plus/minus signs (for mobile only)
        minus: {
            position   : 'absolute',
            top        : '50%',
            left       : '50%',
            width      : 10,
            height     : 2,
            background : 'rgba(0,0,0,.7)',
            margin     : '-1px 0 0 -5px'
        },

        // Common styles for the up/down buttons (b)
        btn: {
            position   : 'absolute',
            right      : 2,
            width      : '2.26ex',
            borderColor: 'rgba(0,0,0,.1)',
            borderStyle: 'solid',
            textAlign  : 'center',
            cursor     : 'default',
            transition : 'all 0.1s',
            background : 'rgba(0,0,0,.1)',
            boxShadow  : `-1px -1px 3px rgba(0,0,0,.1) inset,
                1px 1px 3px rgba(255,255,255,.7) inset`
        },

        btnUp: {
            top         : 2,
            bottom      : '50%',
            borderRadius: '2px 2px 0 0',
            borderWidth : '1px 1px 0 1px'
        },

        'btnUp.mobile': {
            width        : '3.3ex',
            bottom       : 2,
            boxShadow    : 'none',
            borderRadius : 2,
            borderWidth  : 1
        },

        btnDown: {
            top         : '50%',
            bottom      : 2,
            borderRadius: '0 0 2px 2px',
            borderWidth : '0 1px 1px 1px'
        },

        'btnDown.mobile': {
            width        : '3.3ex',
            bottom       : 2,
            left         : 2,
            top          : 2,
            right        : 'auto',
            boxShadow    : 'none',
            borderRadius : 2,
            borderWidth  : 1
        },

        'btn:hover': {
            background: 'rgba(0,0,0,.2)'
        },

        'btn:active': {
            background: 'rgba(0,0,0,.3)',
            boxShadow : `0 1px 3px rgba(0,0,0,.2) inset,
                -1px -1px 4px rgba(255,255,255,.5) inset`
        },

        'btn:disabled': {
            opacity: 0.5,
            boxShadow: 'none',
            cursor: 'not-allowed'
        },

        // The input (input[type="text"])
        input: {
            paddingRight: '3ex',
            boxSizing   : 'border-box'
        },

        // The input with bootstrap class
        'input:not(.form-control)': {
            border           : '1px solid #ccc',
            borderRadius     : 2,
            paddingLeft      : 4,
            display          : 'block',
            WebkitAppearance : 'none',
            lineHeight       : 'normal'
        },

        'input.mobile': {
            paddingLeft :' 3.4ex',
            paddingRight: '3.4ex',
            textAlign   : 'center'
        },

        'input:focus': {},

        'input:disabled': {
            color     : 'rgba(0, 0, 0, 0.3)',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)'
        }
    };

    /**
     * When click and hold on a button - the speed of auto changin the value.
     * This is a static property and can be modified if needed.
     */
    static SPEED = 50;

    /**
     * When click and hold on a button - the delay before auto changin the value.
     * This is a static property and can be modified if needed.
     */
    static DELAY = 500;

    /**
     * The step timer
     * @type {Number}
     */
    _timer: number;

    /**
     * This holds the last known validation error. We need to compare that with
     * new errors and detect validation changes...
     * @type {[type]}
     */
    _valid: string;

    /**
     * The state of the component
     * @type {Object}
     */
    state: Object;

    /**
     * The stop method (need to declare it here to use it in the constructor)
     * @type {Function}
     */
    stop: Function;

    /**
     * Set the initial state and bind this.stop to the instance.
     */
    constructor(...args: Array<any>)
    {
        super(...args);

        this.state = {
            selectionStart: null,
            selectionEnd  : null,
            value         : "value" in this.props ? this.props.value : this.props.defaultValue,
            btnDownHover  : false,
            btnDownActive : false,
            btnUpHover    : false,
            btnUpActive   : false,
            inputFocus    : false
        }

        this.stop = this.stop.bind(this);
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
    componentWillReceiveProps(props: Object): void
    {
        let _value = String(
            props.value || props.value === 0 ? props.value : ''
        ).replace(/^\s*|\s*$/, "")

        this.setState({
            value: "value" in props && _value !== '' ? this._parse(_value) : null
        })
    }

    /**
     * Save the input selection right before rendering
     */
    componentWillUpdate(): void
    {
        this.saveSelection()
    }

    /**
     * After the component has been rendered into the DOM, do whatever is
     * needed to "reconnect" it to the outer world, i.e. restore selection,
     * call some of the callbacks, validate etc.
     */
    componentDidUpdate(prevProps: Object, prevState: Object): void
    {
        // Call the onChange if needed. This is placed here because there are
        // many reasons for changing the value and this is the common place
        // that can capture them all
        if (prevState.value !== this.state.value && (!isNaN(this.state.value) || this.state.value === null)) {
            this._invokeEventCallback("onChange", this.state.value, this.refs.input.value)
        }

        // focus the input is needed (for example up/down buttons set
        // this.state.inputFocus to true)
        if (this.state.inputFocus) {
            this.refs.input.focus()

            // Restore selectionStart (if any)
            if (this.state.selectionStart || this.state.selectionStart === 0) {
                this.refs.input.selectionStart = this.state.selectionStart
            }

            // Restore selectionEnd (if any)
            if (this.state.selectionEnd || this.state.selectionEnd === 0) {
                this.refs.input.selectionEnd = this.state.selectionEnd
            }
        }

        this.checkValidity()
    }

    /**
     * This is used to clear the timer if any
     */
    componentWillUnmount(): void
    {
        this.stop();
    }

    /**
     * Adds getValueAsNumber and setValue methods to the input DOM element.
     */
    componentDidMount(): void
    {
        this.refs.input.getValueAsNumber = () => this.state.value || 0

        this.refs.input.setValue = (value) => {
            this.setState({
                value: this._parse(value)
            })
        }

        // This is a special case! If the component has the "autoFocus" prop
        // and the browser did focus it we have to pass that to the onFocus
        if (!this.state.inputFocus && IS_BROWSER && document.activeElement === this.refs.input) {
            this.state.inputFocus = true
            this.refs.input.focus()
            this._invokeEventCallback("onFocus", {
                target: this.refs.input,
                type  : "focus"
            })
        }

        this.checkValidity()
    }

    /**
     * Saves the input selection in the state so that it can be restored after
     * updates
     */
    saveSelection(): void
    {
        this.state.selectionStart = this.refs.input.selectionStart
        this.state.selectionEnd   = this.refs.input.selectionEnd
    }

    /**
     * Unless noValidate is set to true, the component will check the
     * existing validation state (if any) and will toggle the "has-error"
     * CSS class on the wrapper
     */
    checkValidity(): void
    {
        let valid, validationError = ""

        let supportsValidation = !!this.refs.input.checkValidity

        // noValidate
        let noValidate = !!(
            this.props.noValidate && this.props.noValidate != "false"
        )

        this.refs.input.noValidate = noValidate

        // If "noValidate" is set or "checkValidity" is not supported then
        // consider the element valid. Otherwise consider it invalid and
        // make some additional checks below
        valid = noValidate || !supportsValidation

        if (valid) {
            validationError = ""
        }
        else {

            // In some browsers once a pattern is set it connot be removed. The
            // browser sets it to "" instead which results in validation
            // failures...
            if (this.refs.input.pattern === "") {
                this.refs.input.pattern = this.props.required ? ".+" : ".*"
            }

            // Now check validity
            if (supportsValidation) {
                this.refs.input.checkValidity()
                valid = this.refs.input.validity.valid

                if (!valid) {
                    validationError = this.refs.input.validationMessage
                }
            }

            // Some brousers might fail to validate maxLength
            if (valid && supportsValidation && this.props.maxLength) {
                if (this.refs.input.value.length > this.props.maxLength) {
                    validationError = "This value is too long"
                }
            }
        }

        validationError = validationError || (
            valid ? "" : this.refs.input.validationMessage || "Unknown Error"
        )

        let validStateChanged = this._valid !== validationError
        this._valid = validationError
        if (validationError) {
            addClass(this.refs.wrapper, "has-error")
            if (validStateChanged) {
                this._invokeEventCallback(
                    "onInvalid",
                    validationError,
                    this.state.value,
                    this.refs.input.value
                )
            }
        }
        else {
            removeClass(this.refs.wrapper, "has-error")
            if (validStateChanged) {
                this._invokeEventCallback(
                    "onValid",
                    this.state.value,
                    this.refs.input.value
                )
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
    _toNumber(x: any, loose?: boolean): number
    {
        loose = loose === undefined ?
            this.state.inputFocus && !(this.state.btnDownActive || this.state.btnUpActive) :
            !!loose
        let n = parseFloat(x);
        let q = Math.pow(10, this.props.precision);
        if (isNaN(n) || !isFinite(n)) {
            n = 0;
        }

        if (loose) {
            return n
        }

        n = Math.min( Math.max(n, this.props.min), this.props.max );
        n = Math.round( n * q ) / q;

        return n;
    }

    /**
     * This is used internally to parse any string into a number. It will
     * delegate to this.props.parse function if one is provided. Otherwise it
     * will just use parseFloat.
     * @private
     */
    _parse(x: string): number
    {
        // prevent backspace on dot in float value
        if (this.props.precision > 0 && this.state.value !== null && !isNaN(this.state.value) && x.length > 0 && x.indexOf(".") < 0) {
            x = this.state.value;
        }

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
    _format(n: number): string
    {
        let _n = this._toNumber(n).toFixed(this.props.precision);

        if (this.props.format) {
            return this.props.format(_n);
        }

        return _n;
    }

    /**
     * The internal method that actualy sets the new value on the input
     * @private
     */
    _step(n: number, callback?: Function): boolean
    {
        let _n = this._toNumber(
            (this.state.value || 0) + this.props.step * n,
            false
        );

        if (_n !== this.state.value) {
            this.setState({ value: _n }, callback);
            return true
        }

        return false
    }

    /**
     * This gets called whenever the user edits the input value. The value will
     * be recreated using the current parse/format methods so the input will
     * appear as readonly if the user tries to type something invalid.
     */
    _onChange(e: InputEvent): void
    {
        this.setState({
            value: this._parse(e.target.value)
        })
    }

    /**
     * This binds the Up/Down arrow key listeners
     */
    _onKeyDown(...args: Array<any>): void
    {
        args[0].persist()
        this._invokeEventCallback("onKeyDown", ...args)
        let e = args[0]
        if (!e.isDefaultPrevented()) {
            if (e.keyCode === KEYCODE_UP) {
                e.preventDefault();
                this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
            }
            else if (e.keyCode === KEYCODE_DOWN) {
                e.preventDefault();
                this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
            }
        }
    }

    /**
     * Stops the widget from auto-changing by clearing the timer (if any)
     */
    stop(): void
    {
        if ( this._timer ) {
            clearTimeout( this._timer );
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
    increase(_recursive: boolean = false, callback?: Function): void
    {
        this.stop();
        this._step(1, callback);
        if (isNaN(this.state.value) || this.state.value < this.props.max) {
            this._timer = setTimeout(() => {
                this.increase(true);
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
    decrease(_recursive: boolean = false, callback?: Function): void
    {
        this.stop();
        this._step(-1, callback);
        if (isNaN(this.state.value) || this.state.value > this.props.min) {
            this._timer = setTimeout(() => {
                this.decrease(true);
            }, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
        }
    }

    /**
     * Handles the mousedown event on the up/down buttons. Changes The
     * internal value and sets up a delay for auto increment/decrement
     * (until mouseup or mouseleave)
     */
    onMouseDown(dir: "up"|"down", callback?: Function): void
    {
        if (dir == 'down') {
            this.decrease(false, callback);
        }
        else if (dir == 'up') {
            this.increase(false, callback);
        }
    }

    /**
     * Handles the touchstart event on the up/down buttons. Changes The
     * internal value and DOES NOT sets up a delay for auto increment/decrement.
     * Note that this calls e.preventDefault() so the event is not used for
     * creating a virtual mousedown after it
     */
    onTouchStart(dir: "up"|"down", e: Event): void
    {
        e.preventDefault();
        if (dir == 'down') {
            this.decrease();
        }
        else if (dir == 'up') {
            this.increase();
        }
    }

    /**
     * Helper method to ivoke event callback functions if they are provided
     * in the props.
     * @param {String} callbackName The name of the function prop
     * @param {*[]} args Any additional argument are passed thru
     */
    _invokeEventCallback(callbackName: string, ...args: Array<any>): void
    {
        if (typeof this.props[callbackName] == "function") {
            this.props[callbackName].call(null, ...args);
        }
    }

    /**
     * Renders an input wrapped in relative span and up/down buttons
     * @return {Component}
     */
    render()
    {
        let props = this.props
        let state = this.state
        let css   = {}

        let {
            // These are ignored in rendering
            step, min, max, precision, parse, format, mobile,
            value, type, style, defaultValue, onInvalid, onValid,

            // The rest are passed to the input
            ...rest
        } = this.props;

        // Build the styles
        for (let x in NumericInput.style) {
            css[x] = Object.assign(
                {},
                NumericInput.style[x],
                style ? style[x] || {} : {}
            );
        }

        let hasFormControl = props.className && (/\bform-control\b/).test(
            props.className
        )

        if (mobile == 'auto') {
            mobile = IS_BROWSER && 'ontouchstart' in document
        }

        if (typeof mobile == "function") {
            mobile = mobile.call(this)
        }
        mobile = !!mobile

        let attrs = {
            wrap : {
                style       : style === false ? null : css.wrap,
                className   : 'react-numeric-input',
                ref         : 'wrapper',
                onMouseUp   : undefined,
                onMouseLeave: undefined
            },
            input : {
                ref: 'input',
                type: 'text',
                style: style === false ? null : Object.assign(
                    {},
                    css.input,
                    !hasFormControl ?
                        css['input:not(.form-control)'] :
                        {},
                    state.inputFocus ? css['input:focus'] : {}
                ),
                ...rest
            },
            btnUp: {
                onMouseEnter: undefined,
                onMouseDown : undefined,
                onMouseUp   : undefined,
                onMouseLeave: undefined,
                onTouchStart: undefined,
                onTouchEnd  : undefined,
                style: style === false ? null : Object.assign(
                    {},
                    css.btn,
                    css.btnUp,
                    props.disabled ?
                        css['btn:disabled'] :
                        state.btnUpActive ?
                            css['btn:active'] :
                            state.btnUpHover ?
                                css['btn:hover'] :
                                {}
                )
            },
            btnDown: {
                onMouseEnter: undefined,
                onMouseDown : undefined,
                onMouseUp   : undefined,
                onMouseLeave: undefined,
                onTouchStart: undefined,
                onTouchEnd  : undefined,
                style: style === false ? null : Object.assign(
                    {},
                    css.btn,
                    css.btnDown,
                    props.disabled ?
                        css['btn:disabled'] :
                        state.btnDownActive ?
                            css['btn:active'] :
                            state.btnDownHover ?
                                css['btn:hover'] :
                                {}
                )
            }
        };

        if (state.value || state.value === 0) {
            attrs.input.value = this._format(state.value)
        } else {
            attrs.input.value = ""
        }

        if (hasFormControl && style !== false) {
            Object.assign(attrs.wrap.style, css['wrap.hasFormControl'])
        }

        // mobile
        if (mobile && style !== false) {
            Object.assign(attrs.input  .style, css['input.mobile'  ])
            Object.assign(attrs.btnUp  .style, css['btnUp.mobile'  ])
            Object.assign(attrs.btnDown.style, css['btnDown.mobile'])
        }

        // Attach event listeners if the widget is not disabled
        if (!props.disabled) {
            Object.assign(attrs.wrap, {
                onMouseUp    : this.stop,
                onMouseLeave : this.stop
            });

            Object.assign(attrs.btnUp, {
                onTouchStart: this.onTouchStart.bind(this, 'up'),
                onTouchEnd: this.stop,
                onMouseEnter: () => {
                    this.setState({
                        btnUpHover : true
                    });
                },
                onMouseLeave: () => {
                    this.stop();
                    this.setState({
                        btnUpHover : false,
                        btnUpActive: false
                    });
                },
                onMouseUp: () => {
                    this.setState({
                        btnUpHover  : true,
                        btnUpActive : false
                    });
                },
                onMouseDown: (...args) => {
                    args[0].preventDefault();
                    args[0].persist();
                    this.setState({
                        btnUpHover  : true,
                        btnUpActive : true,
                        inputFocus  : true
                    }, () => {
                        this._invokeEventCallback("onFocus", ...args)
                    });
                    this.onMouseDown('up');
                }
            });

            Object.assign(attrs.btnDown, {
                onTouchStart: this.onTouchStart.bind(this, 'down'),
                onTouchEnd: this.stop,
                onMouseEnter: () => {
                    this.setState({
                        btnDownHover : true
                    });
                },
                onMouseLeave: () => {
                    this.stop();
                    this.setState({
                        btnDownHover : false,
                        btnDownActive: false
                    });
                },
                onMouseUp: () => {
                    this.setState({
                        btnDownHover  : true,
                        btnDownActive : false
                    });
                },
                onMouseDown: (...args) => {
                    args[0].preventDefault();
                    args[0].persist();
                    this.setState({
                        btnDownHover  : true,
                        btnDownActive : true,
                        inputFocus    : true
                    }, () => {
                        this._invokeEventCallback("onFocus", ...args)
                    });
                    this.onMouseDown('down');
                }
            });

            Object.assign(attrs.input, {
                onChange : e => {
                    let val = this._parse(e.target.value)
                    if (isNaN(val)) {
                        val = null
                    }
                    this.setState({ value: val })
                },
                onKeyDown: this._onKeyDown.bind(this),
                onInput: (...args) => {
                    this.saveSelection()
                    this._invokeEventCallback("onInput", ...args)
                },
                onSelect: (...args) => {
                    this.saveSelection()
                    this._invokeEventCallback("onSelect", ...args)
                },
                onFocus: (...args) => {
                    args[0].persist();
                    this.setState({ inputFocus: true }, () => {
                        this.setState({
                            value: this._parse(args[0].target.value)
                        }, () => {
                            this._invokeEventCallback("onFocus", ...args)
                        })
                    });
                },
                onBlur: (...args) => {
                    args[0].persist();
                    this.setState({ inputFocus: false }, () => {
                        this.setState({
                            value: this._parse(args[0].target.value)
                        }, () => {
                            this._invokeEventCallback("onBlur", ...args)
                        })
                    });
                }
            });
        }
        else {
            if (style !== false) {
                Object.assign(attrs.input.style, css['input:disabled'])
            }
        }

        if (mobile) {
            return (
                <span {...attrs.wrap}>
                    <input {...attrs.input}/>
                    <b {...attrs.btnUp}>
                        <i style={ style === false ? null : css.minus }/>
                        <i style={ style === false ? null : css.plus }/>
                    </b>
                    <b {...attrs.btnDown}>
                        <i style={ style === false ? null : css.minus }/>
                    </b>
                </span>
            )
        }

        return (
            <span {...attrs.wrap}>
                <input {...attrs.input}/>
                <b {...attrs.btnUp}>
                    <i style={ style === false ? null : css.arrowUp }/>
                </b>
                <b {...attrs.btnDown}>
                    <i style={ style === false ? null : css.arrowDown }/>
                </b>
            </span>
        );
    }
}

module.exports = NumericInput;
