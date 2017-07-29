/* global describe, it */
/*
 * This file contains various tests dedicated to different GitHub issues
 * reported by users.
 */
import expect       from 'expect'
import NumericInput from '../src/NumericInput.jsx'
import React        from 'react'
import TestUtils    from 'react-dom/test-utils'

describe ('NumericInput/misc', function() {

    this.timeout(10000);

    /**
     * Assert that the user can type a value lower than the current "min"
     * @see https://github.com/vlad-ignatov/react-numeric-input/issues/19
     */
    it ('can type in number when `min` prop is set', done => {
        let widget = TestUtils.renderIntoDocument(<NumericInput min={100}/>)
        let input  = widget.refs.input

        input.focus()

        input.value = 2
        TestUtils.Simulate.input(input)
        expect(input.value).toEqual('2')

        input.value = 20
        TestUtils.Simulate.input(input)
        expect(input.value).toEqual('20')

        input.value = 200
        TestUtils.Simulate.input(input)
        expect(input.value).toEqual('200')

        done()
    })

    /**
     * Assert that the user can type a value lower than the current "min"
     *
     * "There is also a bug when using min property with onChange event. When
     * you have for ex. min=100 and type 1 into input - it gets changed to 100
     * but onChange is fired only for typing 1, not on changing to 100."
     *
     * @see https://github.com/vlad-ignatov/react-numeric-input/issues/19
     */
    it ('onChange gets called properly with `min`', done => {
        let log    = []
        let widget = TestUtils.renderIntoDocument(
            <NumericInput min={100} onChange={function(...args) { log.push(...args) }}/>
        )
        let input  = widget.refs.input

        TestUtils.Simulate.focus(input)
        input.value = 1
        TestUtils.Simulate.change(input)
        expect(log.length).toEqual(3)
        expect(log[0]).toEqual(1)
        expect(log[1]).toEqual('1')
        expect(log[2]).toEqual(input)
        done()
    })

    /**
     * @see https://github.com/vlad-ignatov/react-numeric-input/issues/21
     *
     * Answer: dynamic precision (no precision) as bad idea since for example
     * in JS 0.2 + 0.4 = 0.6000000000000001
     * For better results use something like:
     * <NumericInput format={ parseFloat } precision={10}/>
     */
    it ('supports dynamic precision', done => {
        let widget = TestUtils.renderIntoDocument(
            <NumericInput format={ parseFloat } precision={10}/>
        )
        widget.setState({ value: 1.25 })
        expect(widget.refs.input.value).toEqual('1.25')
        widget.setState({ value: 1.5 })
        expect(widget.refs.input.value).toEqual('1.5')
        done()
    })

    /**
     * Make sure the selection is not lost after re-render which leads to many
     * issues. For some reason selectionEnd and selectionStart do not work
     * correctly in PhantomJS
     */
    if (navigator.userAgent.indexOf("PhantomJS") == -1) {
        it ('persists selection', done => {
            let widget = TestUtils.renderIntoDocument(
                <NumericInput format={ n => `${n}%`} value={10}/>
            )
            expect(widget.refs.input.value).toEqual('10%')
            TestUtils.Simulate.focus(widget.refs.input)
            widget.refs.input.selectionStart = 1
            widget.refs.input.selectionEnd = 1
            widget.saveSelection()
            widget.increase()
            expect(widget.refs.input.value).toEqual('11%')
            expect(widget.refs.input.selectionStart).toEqual(1)
            expect(widget.refs.input.selectionEnd).toEqual(1)
            done()
        })
    }

    /**
     * onChange gets called when input content is deleted
     * @see https://github.com/vlad-ignatov/react-numeric-input/issues/27
     */
    it ('onChange gets called when input content is deleted', done => {
        let log    = []
        let widget = TestUtils.renderIntoDocument(
            <NumericInput min={100} value={1} onChange={(...args) => log.push(...args)}/>
        )
        let input = widget.refs.input

        TestUtils.Simulate.focus(input)
        input.value = 2
        TestUtils.Simulate.change(input)
        expect(log).toEqual([2, '2', input])
        input.value = ""
        TestUtils.Simulate.change(input)
        expect(log).toEqual([2, '2', input, null, "", input])
        done()
    })

    /**
     * The field should accept "-.", "+.", ".", "-", and "+" at beginning of input value.
     * @see https://github.com/vlad-ignatov/react-numeric-input/pull/48/commits/b01f1f9b61c86a9f3a72088f4f82279370e7155a
     */
    it ('The field should accept "-.", "+.", ".", "-", and "+" at beginning of input value', done => {
        let widget = TestUtils.renderIntoDocument(<NumericInput min={-10} max={10}/>)
        let input  = widget.refs.input

        input.focus();

        ["-.", "+.", ".", "-", "+"].forEach(value => {
            input.value = value;
            TestUtils.Simulate.input(input);
            expect(input.value).toEqual(value);
        })

        done();
    });

    it ('Can snap to steps', done => {
        const KEYCODE_UP = 38;
        const KEYCODE_DOWN = 40;
        const tests = [
            [0.2  , KEYCODE_UP  , "0.5"  ], //  0.2  + 0.5 =  0.5
            [0.3  , KEYCODE_UP  , "1.0"  ], //  0.3  + 0.5 =  1.0
            [0.5  , KEYCODE_UP  , "1.0"  ], //  0.5  + 0.5 =  1.0
            [0.6  , KEYCODE_UP  , "1.0"  ], //  0.6  + 0.5 =  1.0
            [0.9  , KEYCODE_UP  , "1.5"  ], //  0.9  + 0.5 =  1.5
            [1.1  , KEYCODE_UP  , "1.5"  ], //  1.1  + 0.5 =  1.5
            [9.1  , KEYCODE_UP  , "9.5"  ], //  9.1  + 0.5 =  9.5
            [9.3  , KEYCODE_UP  , "10.0" ], //  9.3  + 0.5 =  10.0
            [11.1 , KEYCODE_UP  , "10.0" ], //  11.1 + 0.5 =  10.0 (<= max)
            [11.1 , KEYCODE_DOWN, "10.0" ], //  11.1 - 0.5 =  10.0 (<= max)
            [1.1  , KEYCODE_DOWN, "0.5"  ], //  1.1  - 0.5 =  0.5
            [0.3  , KEYCODE_DOWN, "0.0"  ], //  0.3  - 0.5 =  0.0
            [0.1  , KEYCODE_DOWN, "-0.5" ], //  0.1  - 0.5 = -0.5
            [-1.1 , KEYCODE_DOWN, "-1.5" ], // -1.1  - 0.5 = -1.5
            [-1.4 , KEYCODE_DOWN, "-2.0" ], // -1.4  - 0.5 = -2.0
            [-10.4, KEYCODE_DOWN, "-10.0"], // -10.4 - 0.5 = -2.0 (>= min)
            [-10.4, KEYCODE_UP  , "-10.0"], // -10.4 + 0.5 = -2.0 (>= min)
            [-8.4 , KEYCODE_UP  , "-8.0" ]  // -8.4  + 0.5 = -8.0
        ];

        tests.forEach(([inputValue, key, result]) => {
            let widget = TestUtils.renderIntoDocument(
                <NumericInput min={-10} max={10} precision={1} step={0.5} value={inputValue} snap />
            );
            let input = widget.refs.input;
            TestUtils.Simulate.keyDown(input, { keyCode: key });
            expect(input.value).toEqual(result);
        });

        done();
    });
})
