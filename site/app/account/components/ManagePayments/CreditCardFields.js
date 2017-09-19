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
import { Field } from 'redux-form'
import CheckoutField from 'checkout/components/CheckoutField'

const CreditCardFields = () => (
    <div className='row'>
        <div className='col-sm-12'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='Cardholder Name' name='creditCard.creditCardName' type='text' validate={Validate.CreditCardName}/>
        </div>
        <div className='col-sm-12'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='Credit Card Number' name='creditCard.creditCardNumber' type='text' validate={Validate.CreditCardNumber}/>
        </div>
        <div className='col-sm-5'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='Exp. Date' name='creditCard.creditCardExpDate' type='text' validate={Validate.ExpDate}/>
        </div>
        <div className='col-sm-3'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='CVV' name='creditCard.creditCardCvv' type='text' validate={Validate.CVV}/>
        </div>
    </div>
)

const Validate = {
    CreditCardName: value => value ? undefined : 'Must enter cardholder name',
    CreditCardNumber: value => value && value.length === 16 ? undefined : 'Invalid credit card number',
    ExpDate: value => value ? undefined : 'Invalid expiration date',
    CVV: value => value && (value.length === 3 || value.length === 4) ? undefined : 'Invalid CVV'
}

export default CreditCardFields
