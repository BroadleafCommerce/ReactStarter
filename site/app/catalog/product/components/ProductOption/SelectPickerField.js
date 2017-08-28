import React, { Component } from 'react'
import classNames from 'classnames'

// TODO: refactor later to and create 'material-kit/components/SelectPicker' to try and use select picker ui
class SelectPickerField extends Component {

    render() {
        const { allowedValue, input, label, meta: { active, touched, error } } = this.props

        const options = allowedValue.map(optionValue => ({ label: optionValue.attributeValue, value: optionValue.attributeValue }))

        return (
            <div className={classNames({
                'form-group label-floating': true,
                'is-empty': !input.value,
                'is-focused': active,
                'has-error': touched && error
            })}>
                <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
                <select
                    className='form-control'
                    {...input}>
                    <option key={0} value=''/>
                    {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
                </select>
            </div>
        )
    }
}

export default SelectPickerField
