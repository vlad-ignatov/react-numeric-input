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
        format    : null
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
            value: 'value' in props ?
                    this._parse(String(props.value || '')) :
                    null
        };
    }

    /**
     * This is used to clear the timer if any
     */
    componentWillUnmount(): void
    {
        this.stop();
    }

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
        var inputProps = {
            ref: 'input'
        };
        var widgetProps = [
            'step',
            'min',
            'max',
            'precision',
            'parse',
            'format',
            'value'
        ];
        for (var key in this.props) {
            if (widgetProps.indexOf(key) == -1) {
                inputProps[key] = this.props[key];
            }
        }
        inputProps.type = 'text';
        inputProps.value = this.state.value || this.state.value === 0 ?
            this._format(this.state.value) :
            '';
        inputProps.onChange  = this._onChange.bind(this);
        inputProps.onKeyDown = this._onKeyDown.bind(this);
        inputProps.className = [];

        if (this.props.className) {
            inputProps.className.push(this.props.className);
        }

        var attrs = {
            wrap : {
                onMouseUp   : this.stop.bind(this),
                onMouseLeave: this.stop.bind(this),
                className   : []
            },
            input : inputProps,
            btnUp : {
                href: 'javascript:void 0',
                onTouchStart: this.onTouchStart.bind(this, 'up'),
                onTouchEnd  : this.stop.bind(this),
                onMouseDown : this.onMouseDown.bind(this, 'up')
            },
            btnDown : {
                href        : 'javascript:void 0',
                onTouchStart: this.onTouchStart.bind(this, 'down'),
                onTouchEnd  : this.stop.bind(this),
                onMouseDown : this.onMouseDown.bind(this, 'down')
            }
        };

        attrs.wrap.className.push('numeric-input-wrap');
        attrs.input.className.push('numeric-input-input');
        attrs.btnUp.className   = 'numeric-input-up';
        attrs.btnDown.className = 'numeric-input-down';

        if (attrs.input.readOnly) {
            attrs.wrap.className.push('readonly');
        }

        if (attrs.input.disabled) {
            attrs.wrap.className.push('disabled');
        }

        attrs.input.className = attrs.input.className.join(' ');

        if ((/\bform-control\b/).test(attrs.input.className)) {
            attrs.wrap.className.push('bs-form-control');
        }
        else {
            attrs.wrap.className.push('std');
        }

        attrs.wrap.className  = attrs.wrap.className.join(' ');

        return (
            <span {...attrs.wrap}>
                <input {...attrs.input}/>
                <b {...attrs.btnUp}/>
                <b {...attrs.btnDown}/>
            </span>
        );
    }
}
