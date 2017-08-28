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
