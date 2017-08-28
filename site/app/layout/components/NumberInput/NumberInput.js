import React, {Component} from 'react'
import debounce from 'lodash/debounce'

class NumberInput extends Component {
    defaultProps = {
        delay : undefined,
    }

    state = {
        internalValue: this.props.value
    }

    constructor(props) {
        super(props)
        this.onChangeCallback = !!props.delay ? debounce(props.onChange, props.delay) : props.onChange
    }

    onChange = e => {
        this.setState({
            internalValue: +e.target.value
        }, () => {
            this.onChangeCallback(this.state.internalValue)
        })
    }

    render() {
        const {className, min} = this.props
        return (
            <input
                className={className}
                type="number"
                value={this.state.internalValue}
                min={min}
                onKeyPress={e =>
                    (e.metaKey || // cmd/ctrl
                    e.which <= 0 || // arrow keys
                    e.which == 8 || // delete key
                    /[0-9]/.test(String.fromCharCode(e.which)))}
                onChange={this.onChange}/>
        )
    }
}

export default NumberInput
