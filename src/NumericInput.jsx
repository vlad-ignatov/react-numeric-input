import { PropTypes, Component } from 'react';

const KEYCODE_UP   = 38;
const KEYCODE_DOWN = 40;
export const SPEED = 50;
export const DELAY = 500;

export default class NumericInput extends Component
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
        size      : PropTypes.number,
        value     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
    };

    /**
     * The deault behaviour is to start from 0, use step of 1 and display
     * integers
     */
    static defaultProps = {
        value     : 0,
        step      : 1,
        min       : Number.MIN_SAFE_INTEGER || -9007199254740991,
        max       : Number.MAX_SAFE_INTEGER ||  9007199254740991,
        precision : 0,
        parse     : null,
        format    : null,
        className : '',
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

        btnDown: {
            top         : '50%',
            bottom      : 2,
            borderRadius: '0 0 2px 2px',
            borderWidth : '0 1px 1px 1px'
        },

        'btn:hover': {
            background: 'rgba(0,0,0,.2)'
        },

        'btn:active': {
            background: 'rgba(0,0,0,.3)',
            boxShadow : '0 1px 3px rgba(0,0,0,.2) inset, -1px -1px 4px rgba(255,255,255,.5) inset'
        },

        'btn:disabled': {
            opacity: .5,
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
        }
    };

    /**
     * Set the initial state and create the "_timer" property to contain the
     * step timer. Then define all the private methods within the constructor.
     */
    constructor(props)
    {
        super(props);

        this._timer = null;

        this.state = {
            step : props.step,
            min  : props.min,
            max  : props.max,
            style: {},
            value: 'value' in props ?
                    this._parse(String(props.value || '')) :
                    null
        };

        for (let x in NumericInput.style) {
            this.state.style[x] = Object.assign({}, NumericInput.style[x], props.style[x] || {});
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
            (this.state.value || 0) + this.state.step * n
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
    decrease(_recursive: boolean): void
    {
        this.stop();
        this._step(-1);
        if (isNaN(this.state.value) || this.state.value > this.props.min) {
            this._timer = setTimeout(() => {
                this.decrease(true);
            }, _recursive ? SPEED : DELAY);
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
        let {
                // These are ignored in rendering
                step, min, max, precision, parse, format, value, type, style,

                // The rest are passed to the input
                ...rest
            } = this.props,

            attrs = {
                wrap : {
                    style    : Object.assign({}, NumericInput.style.wrap, this.props.style.wrap),
                    className: 'react-numeric-input'
                },
                input : {
                    ref: 'input',
                    type: 'text',
                    style: Object.assign(
                        {},
                        this.state.style.input,
                        this.props.className && !(/\bform-control\b/).test(this.props.className) ?
                            this.state.style['input:not(.form-control)'] :
                            {}
                        ),
                    value: this.state.value || this.state.value === 0 ?
                        this._format(this.state.value) :
                        '',
                    ...rest
                },
                btnUp: {
                    style: Object.assign(
                        {},
                        this.state.style.btn,
                        this.state.style.btnUp,
                        this.props.disabled ?
                            this.state.style['btn:disabled'] :
                            this.state.btnUpActive ?
                                this.state.style['btn:active'] :
                                this.state.btnUpHover ?
                                    this.state.style['btn:hover'] :
                                    {}
                    )
                },
                btnDown: {
                    style: Object.assign(
                        {},
                        this.state.style.btn,
                        this.state.style.btnDown,
                        this.props.disabled ?
                            this.state.style['btn:disabled'] :
                            this.state.btnDownActive ?
                                this.state.style['btn:active'] :
                                this.state.btnDownHover ?
                                    this.state.style['btn:hover'] :
                                    {}
                    )
                }
            };

        // Attach event listeners if the widget is not disabled
        if (!this.props.disabled) {
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
                onKeyDown: this._onKeyDown.bind(this)
            });
        }

        return (
            <span {...attrs.wrap}>
                <input {...attrs.input}/>
                <b {...attrs.btnUp}>
                    <i style={this.state.style.arrowUp}/>
                </b>
                <b {...attrs.btnDown}>
                    <i style={this.state.style.arrowDown}/>
                </b>
            </span>
        );
    }
}
