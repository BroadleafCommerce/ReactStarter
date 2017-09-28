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
