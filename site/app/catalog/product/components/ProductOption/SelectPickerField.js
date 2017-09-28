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
