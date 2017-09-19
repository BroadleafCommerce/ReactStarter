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
