/* global ReactDOM, $, hljs */
import NumericInput from '../src/NumericInput.jsx';

// require('../src/style/NumericInput.less');// webpack magic

$(function() {
    $('script.jsx').each(function(i, s) {
        var div   = $('<div/>'),
            props = Function('return (' + $(s).text() + ')')();

        $(s).replaceWith(div);
        ReactDOM.render(<NumericInput {...props}/>, div[0]);

        div.append('<br/><br/>Touch:<br/>');
        div = $('<div class="mobile"/>').appendTo(div);
        ReactDOM.render(<NumericInput {...props}/>, div[0]);
    });

    hljs.configure({ useBR : false });

    $('.code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
