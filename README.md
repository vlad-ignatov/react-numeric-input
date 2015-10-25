# React Numeric Unput

Number input component that can replace the native number input wich is not yet very well supported and where it is, it does not have the same appearance across the browsers. Additionally this component offers more flexible options and can be used for
any values (different representations of the internal value)

## Instalation
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
This will behave exactly like `<input type="number">`. It will create an empty numeric input that starts changing from zero. The difference that this works on any browser and does have the same appearance on each browser.
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
You can use to use `step` and `precision` props to make your input working with floating point numbers:
```jsx
<NumericInput step={0.1} precision={2} value={50.3}/>
```

#### Custom format
By default the component displays the value number as is. However, you can provide your own `format` function that will be called with the numeric value and is expected to return the string that will be rendered in the input:
```jsx
function myFormat(num) {
    return num + '$';
}
<NumericInput precision={2} value={50.3} step={0.1} format={myFormat}/>
```

## Options

Option       | Type     |Default
-------------|----------|:-------:
**value**    |`number`  |null
**min**      |`number`  |0
**max**      |`number`  |100
**step**     |`number`  |1
**precision**|`number`  |0
**parse**    |`function`|parseFloat
**format**   |`function`|null

Any other option is passed directly the input created by the component. Just don't forget to camelCase the attributes. For example `readonly` must be `readOnly`.
