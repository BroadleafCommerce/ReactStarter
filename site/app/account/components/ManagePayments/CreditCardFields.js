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
