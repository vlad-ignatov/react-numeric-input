export default class Demo extends React.Component
{
    constructor(...args) {
        super(...args)
        this.state = {
            inputProps : {
                className: { value: "form-control", on: true  },
                value    : { value: 50,             on: true  },
                min      : { value: 0,              on: true  },
                max      : { value: 100,            on: true  },
                precision: { value: 0,              on: true  },
                size     : { value: 5,              on: true  },
                disabled : { value: true,           on: false },
                readOnly : { value: true,           on: false },
                mobile   : { value: true,           on: false }
            }
        }
    }
    
    componentDidUpdate() {
        hljs.highlightBlock(this.refs.code)
    }
    
    toggleProp(propName) {
        this.state.inputProps[propName].on = !this.state.inputProps[propName].on
        this.setState(this.state)
    }
    
    setProp(propName, event) {
        let val = event.target ? event.target.value : event
        this.state.inputProps[propName].value = val
        this.setState(this.state)
    }
    
    renderCode() {
        let out = '<NumericInput '
        let hasProps = false
        
        for (let propName in this.state.inputProps) {
            if (this.state.inputProps[propName].on) {
                let val = this.state.inputProps[propName].value
                out += `\n\t${propName}`
                if (val !== true) {
                    out += '=' + (
                        typeof val == 'string' ? `"${val}" ` : `{ ${val} } `
                    )
                }
                hasProps = true
            }
        }

        if (hasProps) {
            out += '\n'
        }

        out += '/>'

        return <div className="code js" ref="code">{ out }</div>
    }

    render() {
        let inputProps = {}
        for (let propName in this.state.inputProps) {
            if (this.state.inputProps[propName].on) {
                inputProps[propName] = this.state.inputProps[propName].value
            }
        }

        return (
            <div className="row">
                <div className="col-xs-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">Props</div>
                        <table className="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>prop name</th>
                                    <th>enable</th>
                                    <th>prop value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>className</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.className.on }
                                            onChange={ this.toggleProp.bind(this, 'className') }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={ this.state.inputProps.className.value }
                                            onChange={ this.setProp.bind(this, 'className') }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>value</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.value.on }
                                            onChange={ this.toggleProp.bind(this, 'value') }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={ this.state.inputProps.value.value }
                                            onChange={ this.setProp.bind(this, 'value') }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>min</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.min.on }
                                            onChange={ this.toggleProp.bind(this, 'min') }
                                        />
                                    </td>
                                    <td>
                                        <NumericInput
                                            className="form-control"
                                            value={ this.state.inputProps.min.value }
                                            onChange={ this.setProp.bind(this, 'min') }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>max</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.max.on }
                                            onChange={ this.toggleProp.bind(this, 'max') }
                                        />
                                    </td>
                                    <td>
                                        <NumericInput
                                            className="form-control"
                                            value={ this.state.inputProps.max.value }
                                            onChange={ this.setProp.bind(this, 'max') }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>precision</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.precision.on }
                                            onChange={ this.toggleProp.bind(this, 'precision') }
                                        />
                                    </td>
                                    <td>
                                        <NumericInput
                                            className="form-control"
                                            value={ this.state.inputProps.precision.value }
                                            onChange={ this.setProp.bind(this, 'precision') }
                                            max={ 20 }
                                            min={ 0 }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>size</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.size.on }
                                            onChange={ this.toggleProp.bind(this, 'size') }
                                        />
                                    </td>
                                    <td>
                                        <NumericInput
                                            className="form-control"
                                            value={ this.state.inputProps.size.value }
                                            onChange={ this.setProp.bind(this, 'size') }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>disabled</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.disabled.on }
                                            onChange={ this.toggleProp.bind(this, 'disabled') }
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>readOnly</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.readOnly.on }
                                            onChange={ this.toggleProp.bind(this, 'readOnly') }
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>mobile</th>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ this.state.inputProps.mobile.on }
                                            onChange={ this.toggleProp.bind(this, 'mobile') }
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                                {/*
                                parse	function	parseFloat
                                format	function	none
                                style	object	none
                                size	number or string	none
                                */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">Result</div>
                        <div className="panel-body">
                            <NumericInput { ...inputProps }/>
                            <hr/>
                            { this.renderCode() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}