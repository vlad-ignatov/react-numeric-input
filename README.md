# React Numeric Input
Number input component that can replace the native number input which is not yet
very well supported and where it is, it does not have the same appearance across
the browsers. Additionally this component offers more flexible options and can
be used for any values (differently formatted representations of the internal
numeric value).

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

## Options
Option       | Type     |Default
-------------|----------|:-------:
**value**    |`number`  |0
**min**      |`number`  |`Number.MIN_SAFE_INTEGER`
**max**      |`number`  |`Number.MAX_SAFE_INTEGER`
**step**     |`number`  |1
**precision**|`number`  |0
**parse**    |`function`|parseFloat
**format**   |`function`|none

Any other option is passed directly the input created by the component. Just
don't forget to camelCase the attributes. For example `readonly` must be `readOnly`.
See examples/index.html for examples.

## Styling
This component comes with styles written in LESS and precompiled to CSS in
[src/style](./src/style). It's up to you to decide how to use them but here are a few options:
* Copy [src/style/NumericInput.css](./src/style/NumericInput.css) code to your css
* Setup less preprocessing from [src/style/NumericInput.less](./src/style/NumericInput.less) to wherever you need.
* Use modern tool like webpack and then just do `require('node_modules/react-numeric-input/src/style/NumericInput.less');`.
  See [examples/examples.jsx](./examples/examples.jsx) for example.

## License
MIT
