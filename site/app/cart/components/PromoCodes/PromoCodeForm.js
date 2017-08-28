import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Form, Field, reduxForm } from 'redux-form'
import Button from 'material-kit/components/Button'
import classNames from 'classnames'

const validators = {
    required: value => value ? undefined : 'Required'
}

const PromoCodeForm = ({
    error,
    handleSubmit
}) => (
    <Form onSubmit={handleSubmit}>
        <Field component={PromoCodeField} name='promoCode' label='Promotion Code' validate={validators.required}/>

        {/* <!-- Promotion Code Error --> */}
        {error && (
            <div className='text-danger' style={{ fontSize: 'small', paddingBottom: '0.75em' }}>
                {error}
            </div>
        )}
    </Form>
)

const PromoCodeField = ({
    input, label, meta: { active, error, touched }
}) => (
    <div className={classNames({
            'form-group label-floating': true,
            'is-empty': !input.value,
            'is-focused': active,
            'has-error': touched && error
        })}>
        <div className='input-group'>
            <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
            <input {...input} className='form-control' type='text' autoComplete='off'/>
            <span className='material-input'></span>
            <span className='input-group-btn'>
                <Button type='submit' simple sm>
                    <FormattedMessage
                        id='cart.applyDiscount'
                        description='Apply discount to the cart'/>
                </Button>
            </span>
        </div>
    </div>
)

export default reduxForm({ form: 'PromoCode' })(PromoCodeForm)
