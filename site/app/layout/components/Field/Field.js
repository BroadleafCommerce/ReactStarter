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
import {Field as ReduxFormField} from 'redux-form'
import './Field.scss'

const renderSelect = ({ className, input, label, type, children, meta: { touched, error }, touchBeforeError = true, ...props }) => (
    <div styleName='Field' className={className}>
        <label styleName='Field__label'>
            {label}
            {(touched || !touchBeforeError) && error && <span styleName='Field__error'>{error}</span>}
        </label>
        <select styleName='Field__input' {...input} {...props}>
            {children}
        </select>
    </div>
)

const renderCheckbox = ({ className, input, label, type, meta: { touched, error }, touchBeforeError = true, ...props }) => (
    <div styleName='Field' className={className}>
        <input styleName='Field__checkbox' type={type} {...input} {...props}/>
        <label styleName='Field__label'>
            {label}
            {(touched || !touchBeforeError) && error && <span styleName='Field__error'>{error}</span>}
        </label>
    </div>
)

const renderInput = ({ className, input, label, type, meta: { touched, error }, touchBeforeError = true, ...props }) => (
    <div styleName='Field' className={className}>
        <label styleName='Field__label'>
            {label}
            {(touched || !touchBeforeError) && error && <span styleName='Field__error'>{error}</span>}
        </label>
        <input styleName='Field__input' type={type} {...input} {...props}/>
    </div>
)

const getComponent = type => {
    switch(type) {
        case 'select':
        return renderSelect
        case 'checkbox':
        return renderCheckbox
        default:
        return renderInput
    }
}

export const Field = ({
    type,
    ...rest,
}) => (
    <ReduxFormField
        {...rest}
        type={type}
        component={getComponent(type)}/>
)

export const FieldGroup = ({
    ...rest,
    children,
}) => (
    <div styleName='FieldGroup' {...rest}>
        {children}
    </div>
)

export const Form = ({
    children,
    ...rest
}) => (
    <form styleName='Form' {...rest}>
        {children}
    </form>
)

export const FormError = ({
    message,
    ...rest,
}) => (
    <div styleName='FormError' {...rest}>
        {message}
    </div>
)

export default Field
