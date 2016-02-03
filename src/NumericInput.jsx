import React from "react";

const PropTypes = React.PropTypes
const KEYCODE_UP   = 38;
const KEYCODE_DOWN = 40;

export class NumericInput extends React.Component
{
    static propTypes = {
        step      : PropTypes.number,
        min       : PropTypes.number,
        max       : PropTypes.number,
        precision : PropTypes.number,
        parse     : PropTypes.func,
        format    : PropTypes.func,
        className : PropTypes.string,
        disabled  : PropTypes.bool,
        readOnly  : PropTypes.bool,
        style     : PropTypes.object,
        type      : PropTypes.string,
        size      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
        value     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
        mobile(props, propName) {
            let prop = props[propName]
            if (prop !== true && prop !== false && prop !== 'auto' && typeof prop != 'function') {
                return new Error('The "mobile" prop must be true, false, "auto" or a function');
            }
        }
    };

    /**
     * The deault behaviour is to start from 0, use step of 1 and display
     * integers
     */
    static defaultProps = {
        value     : '',
        step      : 1,
        min       : Number.MIN_SAFE_INTEGER || -9007199254740991,
        max       : Number.MAX_SAFE_INTEGER ||  9007199254740991,
        precision : 0,
        parse     : null,
        format    : null,
        className : '',
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
            boxShadow  : '-1px -1px 3px rgba(0,0,0,.1) inset, 1px 1px 3px rgba(255,255,255,.7) inset'
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
            boxShadow : '0 1px 3px rgba(0,0,0,.2) inset, -1px -1px 4px rgba(255,255,255,.5) inset'
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

        'input:focus': {}
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
     * Set the initial state and create the "_timer" property to contain the
     * step timer. Then define all the private methods within the constructor.
     */
    constructor(props)
    {
        super(props);

        this._timer = null;

        let _value = String(
            props.value || props.value === 0 ? props.value : ''
        ).replace(/^\s*|\s*$/, "");

        this.state = {
            style: {},
            value: 'value' in props && _value !== '' ? this._parse(_value) : null
        };

        for (let x in NumericInput.style) {
            this.state.style[x] = Object.assign(
                {},
                NumericInput.style[x],
                props.style[x] || {}
            );
        }

        this.stop = this.stop.bind(this);
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
        this.refs.input.getValueAsNumber = () => this.state.value || 0;

        this.refs.input.setValue = (value) => {
            this.setState({
                value: this._parse(value)
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
    _toNumber(x: any): number
    {
        let n = parseFloat(x);
        let q = Math.pow(10, this.props.precision);
        if (isNaN(n) || !isFinite(n)) {
            n = 0;
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
    _step(n: number): boolean
    {
        let _n = this._toNumber(
            (this.state.value || 0) + this.props.step * n
        );

        if (_n !== this.state.value) {
            this.setState({ value: _n });
        }
    }

    /**
     * This gets called whenever the user edits the input value. The value will
     * be recreated using the current parse/format methods so the input will
     * appear as readonly if the user tries to type something invalid.
     */
    _onChange(e: Event): void
    {
        this.setState({
            value: this._parse(e.target.value)
        });
    }

    /**
     * This binds the Up/Down arrow keys
     */
    _onKeyDown(e: KeyboardEvent): void
    {
        if (e.keyCode === KEYCODE_UP) {
            e.preventDefault();
            this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
        }
        else if (e.keyCode === KEYCODE_DOWN) {
            e.preventDefault();
            this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
        }
    }

    /**
     * Stops the widget from auto-changing by clearing the timer (if any)
     */
    stop(): void
    {
        if ( this._timer ) {
            window.clearTimeout( this._timer );
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
    increase(_recursive: boolean): void
    {
        this.stop();
        this._step(1);
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
    decrease(_recursive: boolean): void
    {
        this.stop();
        this._step(-1);
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
    onMouseDown(dir, e)
    {
        e.preventDefault();
        if (dir == 'down') {
            this.decrease();
        }
        else if (dir == 'up') {
            this.increase();
        }
        setTimeout(() => { this.refs.input.focus(); });
    }

    /**
     * Handles the touchstart event on the up/down buttons. Changes The
     * internal value and DOES NOT sets up a delay for auto increment/decrement.
     * Note that this calls e.preventDefault() so the event is not used for
     * creating a virtual mousedown after it
     */
    onTouchStart(dir, e)
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
     * Renders an input wrapped in relative span and up/down buttons
     * @return {Component}
     */
    render()
    {
        let props = this.props
        let state = this.state
        let {
            // These are ignored in rendering
            step, min, max, precision, parse, format, value, type, style,

            // The rest are passed to the input
            ...rest
        } = props

        let hasFormControl = props.className && (/\bform-control\b/).test(props.className)

        let mobile = props.mobile == 'auto' ?
            'ontouchstart' in document :
            props.mobile
        if (typeof mobile == "function") {
            mobile = mobile.call(this)
        }
        mobile = !!mobile

        let attrs = {
            wrap : {
                style    : Object.assign({}, NumericInput.style.wrap, props.style.wrap),
                className: 'react-numeric-input'
            },
            input : {
                ref: 'input',
                type: 'text',
                style: Object.assign(
                    {},
                    state.style.input,
                    !hasFormControl ?
                        state.style['input:not(.form-control)'] :
                        {},
                    state.inputFocus ? state.style['input:focus'] : {}
                ),
                value: state.value || state.value === 0 ?
                    this._format(state.value) :
                    '',
                ...rest
            },
            btnUp: {
                style: Object.assign(
                    {},
                    state.style.btn,
                    state.style.btnUp,
                    props.disabled ?
                        state.style['btn:disabled'] :
                        state.btnUpActive ?
                            state.style['btn:active'] :
                            state.btnUpHover ?
                                state.style['btn:hover'] :
                                {}
                )
            },
            btnDown: {
                style: Object.assign(
                    {},
                    state.style.btn,
                    state.style.btnDown,
                    props.disabled ?
                        state.style['btn:disabled'] :
                        state.btnDownActive ?
                            state.style['btn:active'] :
                            state.btnDownHover ?
                                state.style['btn:hover'] :
                                {}
                )
            }
        };

        if (hasFormControl) {
            Object.assign(attrs.wrap.style, state.style['wrap.hasFormControl'])
        }

        // mobile
        if (mobile) {
            Object.assign(attrs.input  .style, state.style['input.mobile'  ])
            Object.assign(attrs.btnUp  .style, state.style['btnUp.mobile'  ])
            Object.assign(attrs.btnDown.style, state.style['btnDown.mobile'])
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
                onMouseDown: (e) => {
                    this.setState({
                        btnUpHover  : true,
                        btnUpActive : true
                    });
                    this.onMouseDown('up', e);
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
                onMouseDown: (e) => {
                    this.setState({
                        btnDownHover  : true,
                        btnDownActive : true
                    });
                    this.onMouseDown('down', e);
                }
            });

            Object.assign(attrs.input, {
                onChange : this._onChange.bind(this),
                onKeyDown: this._onKeyDown.bind(this),
                onFocus : () => {
                    this.setState({ inputFocus: true });
                },
                onBlur : () => {
                    this.setState({ inputFocus: false });
                }
            });
        }

        if (mobile) {
            return (
                <span {...attrs.wrap}>
                    <input {...attrs.input}/>
                    <b {...attrs.btnUp}>
                        <i style={state.style.minus}/>
                        <i style={state.style.plus}/>
                    </b>
                    <b {...attrs.btnDown}>
                        <i style={state.style.minus}/>
                    </b>
                </span>
            )
        }

        return (
            <span {...attrs.wrap}>
                <input {...attrs.input}/>
                <b {...attrs.btnUp}>
                    <i style={state.style.arrowUp}/>
                </b>
                <b {...attrs.btnDown}>
                    <i style={state.style.arrowDown}/>
                </b>
            </span>
        );
    }
}

export default NumericInput
