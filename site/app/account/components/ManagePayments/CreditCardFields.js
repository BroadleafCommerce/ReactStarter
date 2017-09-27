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
