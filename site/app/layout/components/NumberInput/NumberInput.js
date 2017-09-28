/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
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
