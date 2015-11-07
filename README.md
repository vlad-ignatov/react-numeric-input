# <img align="right" src="http://react-numeric-input.jsdevel.com/ReactNumericInput.png" width="197"/>React Numeric Input

[![Build Status](https://travis-ci.org/vlad-ignatov/react-numeric-input.svg?branch=master)](https://travis-ci.org/vlad-ignatov/react-numeric-input)

Number input component that can replace the native number input which is not yet
very well supported and where it is, it does not have the same appearance across
the browsers. Additionally this component offers more flexible options and can
be used for any values (differently formatted representations of the internal
numeric value).

[Live demo](http://react-numeric-input.jsdevel.com/)

## Installation
```sh
npm install react-number-nput --save
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
Option       | Type                | Default
-------------|---------------------|:-------:
**value**    |`number` or `string` | `""` which converts to 0
**min**      |`number`             | `Number.MIN_SAFE_INTEGER`
**max**      |`number`             | `Number.MAX_SAFE_INTEGER`
**step**     |`number`             | 1
**precision**|`number`             | 0
**parse**    |`function`           | parseFloat
**format**   |`function`           | none
**className**| `string`            | none
**disabled** |`boolean`            | none
**readOnly** |`boolean`            | none
**style**    |`object`             | none
**size**     |`number`             | none

Any other option is passed directly the input created by the component. Just
don't forget to camelCase the attributes. For example `readonly` must be `readOnly`.
See examples/index.html for examples.

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
rules. Example:
```css
.react-numeric-input input {
	color: red;
}
```

## Keyboard navigation
* You can use <kbd>Up</kbd> and <kbd>Down</kbd> arrow keys to increment/decrement the input value.
* <kbd>Ctrl/Command + Up</kbd> and <kbd>Ctrl/Command + Down</kbd> to use smaller step (`step / 10`).
  Note that this will only work if you have specified a `precision` option that supports it.
* <kbd>Shift + Up</kbd> and <kbd>Shift + Down</kbd> to use bigger step (`step * 10`).


## License
MIT
