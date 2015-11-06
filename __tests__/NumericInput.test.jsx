/* global describe, it, ReactDOM, React */
import expect from 'expect';
import { default as NumericInput, DELAY } from '../src/NumericInput.jsx';

const TestUtils    = React.addons.TestUtils;
const KEYCODE_UP   = 38;
const KEYCODE_DOWN = 40;


describe('NumericInput', () => {

    it('works like inpit[type="number"] by default', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput />
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild;

        expect(inputNode.value).toEqual('');
        expect(inputNode.type).toEqual('text');
        // expect(inputNode.className).toEqual('numeric-input-input');
    });

    it('accepts all the props', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput
                    value={5}
                    min={4.9}
                    max={5.3}
                    step={0.2}
                    precision={2}
                    className="form-control"
                />
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild;

		// Test the precision
        expect(inputNode.value).toEqual('5.00');
        expect(inputNode.className).toEqual('form-control');

		// Test the step
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_UP });
        expect(inputNode.value).toEqual('5.20');

		// Test the max
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_UP });
        expect(inputNode.value).toEqual('5.30');

		// Test the min
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_DOWN });
        expect(inputNode.value).toEqual('5.10');
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_DOWN });
        expect(inputNode.value).toEqual('4.90');
    });

    it('can auto-increase', (done) => {
        var widget     = TestUtils.renderIntoDocument(<NumericInput/>),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild,
            btnUp      = inputNode.nextElementSibling;

        TestUtils.Simulate.mouseDown(btnUp);
        expect(inputNode.value).toEqual('1');

        setTimeout(() => {
            expect(inputNode.value).toEqual('2');
            TestUtils.Simulate.mouseUp(btnUp);
            setTimeout(() => {
                expect(inputNode.value).toEqual('2');
                done();
            }, DELAY);
        }, DELAY);
    });

    it('can auto-decrease', (done) => {
        var widget     = TestUtils.renderIntoDocument(<NumericInput/>),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild,
            btnDown    = widgetNode.lastChild;

        TestUtils.Simulate.mouseDown(btnDown);
        expect(inputNode.value).toEqual('-1');

        setTimeout(() => {
            expect(inputNode.value).toEqual('-2');
            TestUtils.Simulate.mouseUp(btnDown);
            setTimeout(() => {
                expect(inputNode.value).toEqual('-2');
                done();
            }, DELAY);
        }, DELAY);
    });

    it('will stop increasing on mouseleave', (done) => {
        var widget     = TestUtils.renderIntoDocument(<NumericInput/>),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild,
            btnUp      = inputNode.nextElementSibling;

        TestUtils.Simulate.mouseDown(btnUp);
        expect(inputNode.value).toEqual('1');

        setTimeout(() => {
            expect(inputNode.value).toEqual('2');
            // TestUtils.Simulate.mouseLeave(widgetNode);
            TestUtils.Simulate.mouseLeave(btnUp);
            setTimeout(() => {
                expect(inputNode.value).toEqual('2');
                done();
            }, DELAY);
        }, DELAY);
    });

    it('will stop decreasing on mouseleave', (done) => {
        var widget     = TestUtils.renderIntoDocument(<NumericInput/>),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild,
            btnDown    = widgetNode.lastChild;

        TestUtils.Simulate.mouseDown(btnDown);
        expect(inputNode.value).toEqual('-1');

        setTimeout(() => {
            expect(inputNode.value).toEqual('-2');
            // TestUtils.Simulate.mouseLeave(widgetNode);
            TestUtils.Simulate.mouseLeave(btnDown);
            setTimeout(() => {
                expect(inputNode.value).toEqual('-2');
                done();
            }, DELAY);
        }, DELAY);
    });

    it('uses "format" and "parse" methods', () => {

        function format(n) {
            return `That was ${n} days ago`;
        }
        function parse(s) {
            return parseFloat(s.replace(/That\swas\s(\d+)\sdays\sago/gi, '$1'));
        }

        var widget = TestUtils.renderIntoDocument(
                <NumericInput
                    value={5}
                    step={2}
                    format={format}
                    parse={parse}
                />
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild;

        expect(inputNode.value).toEqual('That was 5 days ago');
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_DOWN });
        expect(inputNode.value).toEqual('That was 3 days ago');
        inputNode.value = 'That was 13 days ago';
        TestUtils.Simulate.change(inputNode);
        TestUtils.Simulate.keyDown(inputNode, { keyCode: KEYCODE_UP });
        expect(inputNode.value).toEqual('That was 15 days ago');
    });

    it('uses the "disabled" prop to disable the UI', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput disabled readOnly/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild,
            btnUp      = inputNode.nextElementSibling;

        expect(inputNode.disabled).toEqual(true);
        expect(inputNode.readOnly).toEqual(true);
        // expect(widgetNode.className).toMatch(/\bdisabled\b/);
        // expect(widgetNode.className).toMatch(/\breadonly\b/);
        TestUtils.Simulate.mouseDown(btnUp);
        expect(inputNode.value).toEqual('');
    });

    // Testing styles ------------------------------------------------------------------
    it('can set wrapper styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    wrap: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget);

        expect(widgetNode.style.color).toEqual('red');
    });

    it('can set input styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    input: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            inputNode  = widgetNode.firstChild;

        expect(inputNode.style.color).toEqual('red');
    });

    it('can set btnUp styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    btnUp: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            btnNode    = widgetNode.firstChild.nextElementSibling;

        expect(btnNode.style.color).toEqual('red');
    });

    it('can set btnDown styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    btnDown: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            btnNode    = widgetNode.lastChild;

        expect(btnNode.style.color).toEqual('red');
    });

    it('can set arrowDown styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    arrowDown: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            arrowDown  = widgetNode.lastChild.firstChild;

        expect(arrowDown.style.color).toEqual('red');
    });

    it('can set arrowUp styles', () => {
        var widget = TestUtils.renderIntoDocument(
                <NumericInput style={{
                    arrowUp: {
                        color: 'red'
                    }
                }}/>
            ),
            widgetNode = ReactDOM.findDOMNode(widget),
            arrowUp    = widgetNode.firstChild.nextElementSibling.firstChild;

        expect(arrowUp.style.color).toEqual('red');
    });

    it('can set btn:state styles', () => {
        var disabled = false;
        var widget = TestUtils.renderIntoDocument(
                <NumericInput disabled={disabled} style={{
                    'btn'         : { color: 'red'    },
                    'btn:hover'   : { color: 'blue'   },
                    'btn:active'  : { color: 'pink'   },
                    'btn:disabled': { color: 'skyblue'}
                }}/>
            ),
            widgetNode  = ReactDOM.findDOMNode(widget),
            btnUpNode   = widgetNode.firstChild.nextElementSibling,
            btnDownNode = widgetNode.lastChild;

        // normal
        expect(btnUpNode.style.color).toEqual('red');
        expect(btnDownNode.style.color).toEqual('red');

        // :hover
        TestUtils.Simulate.mouseEnter(btnUpNode);
        expect(btnUpNode.style.color).toEqual('blue');
        TestUtils.Simulate.mouseEnter(btnDownNode);
        expect(btnDownNode.style.color).toEqual('blue');

        // :active
        TestUtils.Simulate.mouseDown(btnUpNode);
        expect(btnUpNode.style.color).toEqual('pink');
        TestUtils.Simulate.mouseDown(btnDownNode);
        expect(btnDownNode.style.color).toEqual('pink');

        // :disabled
        widget = TestUtils.renderIntoDocument(
            <NumericInput disabled style={{
                'btn'         : { color: 'red'    },
                'btn:hover'   : { color: 'blue'   },
                'btn:active'  : { color: 'pink'   },
                'btn:disabled': { color: 'skyblue'}
            }}/>
        );
        widgetNode  = ReactDOM.findDOMNode(widget);
        btnUpNode   = widgetNode.firstChild.nextElementSibling;
        btnDownNode = widgetNode.lastChild;

        expect(btnUpNode.style.color).toEqual('skyblue');
        expect(btnDownNode.style.color).toEqual('skyblue');
        TestUtils.Simulate.mouseEnter(btnUpNode);
        expect(btnUpNode.style.color).toEqual('skyblue');
        TestUtils.Simulate.mouseEnter(btnDownNode);
        expect(btnDownNode.style.color).toEqual('skyblue');
        TestUtils.Simulate.mouseDown(btnUpNode);
        expect(btnUpNode.style.color).toEqual('skyblue');
        TestUtils.Simulate.mouseDown(btnDownNode);
        expect(btnDownNode.style.color).toEqual('skyblue');
    });
});
