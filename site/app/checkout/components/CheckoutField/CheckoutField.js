import React from 'react'
import classNames from 'classnames'
import Checkbox from 'material-kit/components/Checkbox'
import './CheckoutField.scss'

const CheckoutField = ({
    addon, autoComplete = 'on', children, id, inputGroup = true, input, label, meta: { active, touched, error }, type
}) => {
    if (type === 'radio') {
        return (
            <div className='radio'>
                <label htmlFor={id}>
                    <input id={id} type='radio' {...input}/>
                    <span className='circle'/>
                    <span className='check'/>
                    {label}
                </label>
            </div>
        )
    }

    const formGroup = (
        <div className={classNames({
                'form-group label-floating': true,
                'error-group': true,
                'is-empty': !input.value,
                'is-focused': active,
                'has-error': touched && error
            })}>
                {type !== 'checkbox' && type !== 'radio' && (<label className='control-label'>{label}</label>)}
                {(() => {
                    switch(type) {
                        case 'select':
                        return (
                            <select autoComplete={autoComplete} className='form-control' {...input}>
                                {children}
                            </select>
                        )
                        case 'checkbox':
                        return (
                            <Checkbox autoComplete={autoComplete} {...input}>
                                {label}
                            </Checkbox>
                        )
                        default:
                        return (
                            <input
                                autoComplete={autoComplete}
                                type={type}
                                className='form-control'
                                {...input}
                            />
                        )
                    }
                })()}
                {touched && error && (
                    <span className='text-danger' styleName='CheckoutField__error'>{error}</span>
                )}
        </div>
    )

    return inputGroup ? (
        <div className='input-group'>

            {inputGroup && (
                <span className='input-group-addon'>
                    {addon ? (
                        <i className='material-icons'>{addon}</i>
                    ) : (
                        <i className='material-icons'  style={{ visibility: 'hidden' }}>person</i>
                    )}
                </span>
            )}

            {formGroup}
        </div>
    ) : formGroup
}

export default CheckoutField
