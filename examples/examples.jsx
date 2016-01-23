/* global $, hljs, NumericInput */
import React from "react"
import ReactDOM from "react-dom"
// import NumericInput from '../index.js';


$(function() {
    $('script.jsx').each(function(i, s) {
        var div   = $('<div/>'),
            props = Function('return (' + $(s).text() + ')')();
        $(s).replaceWith(div);
        var widget = ReactDOM.render(
            React.createElement(NumericInput, props),
            div[0]
        );
        console.log(widget)
        div.data("widget", widget)
    });

    hljs.configure({ useBR : false });

    $('.code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
