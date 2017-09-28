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
import React from 'react'
import {Field} from 'redux-form'
import ColorField from './ColorField'
import SelectPickerField from './SelectPickerField'
import classNames from 'classnames'

//TODO: document props of this component
const ProductOption = ({ attributeName, allowedValue, label, propertyPrefix = 'itemAttributes', productOptionType, required }) => {
    const fullyQualifiedPropertyName = `${propertyPrefix}[${attributeName.substring(attributeName.indexOf('.') + 1)}]`

    const validate = required ? validators.required : undefined
    switch (productOptionType) {
        case 'TEXT':
        return (
            <Field
                key={attributeName}
                component={TextField}
                label={label}
                name={fullyQualifiedPropertyName}
                validate={validate}
            />
        )
        case 'TEXTAREA':
        return (
            <Field
                key={attributeName}
                component={TextAreaField}
                label={label}
                name={fullyQualifiedPropertyName}
                validate={validate}
            />
        )
        case 'DECIMAL':
        return (
            <Field
                key={attributeName}
                component={DecimalField}
                label={label}
                name={fullyQualifiedPropertyName}
                validate={validate}
            />
        )
        case 'COLOR':
        return (
            <Field
                key={attributeName}
                allowedValue={allowedValue}
                component={ColorField}
                label={label}
                name={fullyQualifiedPropertyName}
                validate={validate}
            />
        )
        default:
        return (
            <Field
                key={attributeName}
                allowedValue={allowedValue}
                component={SelectPickerField}
                label={label}
                name={fullyQualifiedPropertyName}
                validate={validate}
            />
        )
    }
}

const TextField = ({
    input, label, meta: { active, touched, error }
}) => (
    <div className={classNames({
            'form-group label-floating': true,
            'is-empty': !input.value,
            'is-focused': active,
            'has-error': touched && error
        })}>
        <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
        <input
            type='text'
            className='form-control'
            maxLength='255'
            {...input}
        />
    </div>
)

const TextAreaField = ({
    input, label, meta: { active, touched, error }
}) => (
    <div className={classNames({
            'form-group label-floating': true,
            'is-empty': !input.value,
            'is-focused': active,
            'has-error': touched && error
        })}>
        <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
        <textarea
            className='form-control'
            rows='3'
            {...input}></textarea>
    </div>
)

const DecimalField = ({
    input, label, meta: { active, touched, error }
}) => (
    <div className={classNames({
            'form-group label-floating': true,
            'is-empty': !input.value,
            'is-focused': active,
            'has-error': touched && error
        })}>
        <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
        <input
            className='form-control'
            type='number'
            maxlength='10'
            {...input}
        />
    </div>
)

const validators = {
    required : value => (value ? undefined : 'Required')
}

export default ProductOption
