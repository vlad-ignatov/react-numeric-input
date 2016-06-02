# <img align="right" src="http://vlad-ignatov.github.io/react-numeric-input/examples/v2.0.0/screenshot.png" width="123"/>React Numeric Input

[![Build Status](https://travis-ci.org/vlad-ignatov/react-numeric-input.svg?branch=master)](https://travis-ci.org/vlad-ignatov/react-numeric-input)

Number input component that can replace the native number input which is not yet
very well supported and where it is, it does not have the same appearance across
the browsers. Additionally this component offers more flexible options and can
be used for any values (differently formatted representations of the internal
numeric value).

[Live demo](http://vlad-ignatov.github.io/react-numeric-input/examples/v2.0.4/index.html)

## Installation
```sh
npm install react-numeric-input --save
```
Then in your scrips:
```js
// es6
import NumericInput from 'react-numeric-input';
// or es5
var NumericInput = require('react-numeric-input');
```

## Usage
##### Minimal Usage:
This will behave exactly like `<input type="number">`. It will create an empty
numeric input that starts changing from zero. The difference that this works on
any browser and does have the same appearance on each browser.
```jsx
<NumericInput/>
// or:
<NumericInput className="form-control"/>
```

##### Typical Usage
Most of the time you will need to specify `min`, `max` and `value`:
```jsx
<NumericInput min={0} max={100} value={50}/>
```

#### Working with floats
You can use `step` and `precision` props to make your input working with
floating point numbers:
```jsx
<NumericInput step={0.1} precision={2} value={50.3}/>
```

#### Custom format
By default the component displays the value number as is. However, you can
provide your own `format` function that will be called with the numeric value
and is expected to return the string that will be rendered in the input:
```jsx
function myFormat(num) {
    return num + '$';
}
<NumericInput precision={2} value={50.3} step={0.1} format={myFormat}/>
```

## Props
Name         | Type                                | Default
-------------|-------------------------------------|:-------:
**value**    |`number` or `string`                 | `""` which converts to 0
**min**      |`number`                             | `Number.MIN_SAFE_INTEGER`
**max**      |`number`                             | `Number.MAX_SAFE_INTEGER`
**step**     |`number`                             | 1
**precision**|`number`                             | 0
**parse**    |`function`                           | parseFloat
**format**   |`function`                           | none
**className**|`string`                             | none
**disabled** |`boolean`                            | none
**readOnly** |`boolean`                            | none
**style**    |`object` or `false`                  | none
**size**     |`number` or `string`                 | none
**mobile**   |`true`, `false`, 'auto' or `function`|`auto`

Any other option is passed directly the input created by the component. Just
don't forget to camelCase the attributes. For example `readonly` must be `readOnly`.
See examples/index.html for examples.

## Event Callbacks
You can pass callback props like `onClick`, `onMouseOver` etc. and they will be
attached to the input element and React will call them with `null` scope and the corresponding event. However, there are few special cases to be aware of:

* `onChange`  - Called with `valueAsNumber` and `valueAsString`. The `valueAsNumber` represents the internal numeric value while `valueAsString` is the same as the input value and might be completely different from the numeric one if custom formatting is used.
* `onInvalid` - Will be called with `errorMessage`, `valueAsNumber` and `valueAsString`.
* `onValid`   - There is no corresponding event in browsers. It will be called when the component transitions from invalid to valid state with the same arguments as onChange: `valueAsNumber` and `valueAsString`.

## Styling
The component uses inline styles which you can customize. The `style` prop is not added
directly to the component but instead it is a container for styles which you can overwrite.
For example
```xml
<NumericInput style={{
	input: {
		color: 'red'
	}
}}>
```
You can modify the styles for everything including states like `:hover`, `:active` and
`:disabled`. Take a look at the source to see what styles are supported. Also, the style is
stored as static class property so that you can change it and affect all the components
from your script. Example:
```js
import NumericInput from 'react-numeric-input';
NumericInput.style.input.color = 'red';
```

Finally, you can still use CSS if you want. Each component's root element has the
`react-numeric-input` class so that it is easy to find these widgets on the page. However,
keep in mind that because of the inline styles you might need to use `!important` for some
rules unless you pass `style={false}` which will disable the inline styles and you will
have to provide your own CSS styles for everything. Example:
```css
.react-numeric-input input {
	color: red;
}
```

## Keyboard navigation
* You can use <kbd>⬆</kbd> and <kbd>⬇</kbd> arrow keys to increment/decrement the input value.
* <kbd>Ctrl + ⬆</kbd> or <kbd>⌘ + ⬆</kbd> and <kbd>Ctrl + ⬇</kbd> or <kbd>⌘ + ⬇</kbd> to use smaller step (`step / 10`).
  Note that this will only work if you have specified a `precision` option that supports it.
* <kbd>Shift + ⬆</kbd> and <kbd>Shift + ⬇</kbd> to use bigger step (`step * 10`).

## Integration with external scripts
This component aims to provide good integration not only with React but with any third party script
that might want to work with it on the current page.

### getValueAsNumber()
The native number inputs have special property called `valueAsNumber`. It provides access to the
value as number to be used by scripts. In this react component this becomes even more desirable as
the display value might be formatted and have nothing in common with the underlying value meaning
that one might need to call parse to find out what the numeric value is. For that reason this
component exposes `getValueAsNumber()` method on the input element. Also keep in mind
that this really returns a number (float) so it might be different from the displayed value. For
example an input showing "12.30" will have `getValueAsNumber()` returning `12.3` and if the input
is empty the result would be `0`.

### setValue()
An external script that does not "understand" React can still work with this component by reading
the `_valueAsNumber` or by calling the `setValue()` method exposed on the input element. Here is
an example with jQuery:
```js
$('input[name="some-input"]')[0].setValue('123mph');
```
Calling this method will invoke the component's `parse` method with the provided argument and then
it will `setState` causing the usual re-rendering.

## License
MIT
