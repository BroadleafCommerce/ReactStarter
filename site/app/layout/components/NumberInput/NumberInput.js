/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
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
