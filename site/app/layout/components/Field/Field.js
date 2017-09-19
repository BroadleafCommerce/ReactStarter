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
