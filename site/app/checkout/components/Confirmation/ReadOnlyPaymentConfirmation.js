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
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

class ReadOnlyPaymentConfirmation extends Component {

    render() {
        const { billingAddress, type } = this.props

        const transaction = find(this.props.transactions, t => {
            return t.success
            && !isEmpty(t.additionalField)
            && find(t.additionalField, { key: 'LAST_FOUR' })
            && find(t.additionalField, { key: 'EXP_DATE' })
            && find(t.additionalField, { key: 'CARD_TYPE' })
        })

        const additionalField = transaction && transaction.additionalField

        switch(type) {
            case 'CREDIT_CARD':
            return (
                <div className='row'>
                    <div className='col-sm-6'>
                        <FormattedMessage
                            defaultMessage='Billing Information'
                            description='Billing information form heading'
                            id='cart.billingInformation'
                            tagName='h4'
                        />

                        <div>
                            {billingAddress.firstName}&nbsp;{billingAddress.lastName}<br />
                            {billingAddress.addressLine1}<br /> {billingAddress.addressLine2}{billingAddress.addressLine2 && (<br/>)}
                            {billingAddress.city},&nbsp;{billingAddress.stateProvinceRegion}&nbsp;{billingAddress.postalCode}<br />
                            {billingAddress.phonePrimary && billingAddress.phonePrimary.phoneNumber}
                        </div>

                    </div>

                    <div className="col-sm-6">
                        <FormattedMessage
                            defaultMessage='Payment Information'
                            description='Payment information form heading'
                            id='account.payments.paymentFormTitle'
                            tagName='h4'
                        />

                        {!isEmpty(additionalField) && (
                            <ReadOnlyCreditCard
                                cardType={find(additionalField, { key: 'CARD_TYPE' }).value}
                                lastFour={find(additionalField, { key: 'LAST_FOUR' }).value}
                                expDate={find(additionalField, { key: 'EXP_DATE' }).value}/>
                        )}
                    </div>
                </div>
            )
            case 'COD':
            return (
                <p>Payment will be collected upon item's delivery.</p>
            )
            default:
            return (
                <p>Unsupported</p>
            )
        }
    }
}

const ReadOnlyCreditCard = ({
    cardType,
    lastFour,
    expDate,
}) => (
    <div className='card card-plain'>
        <ul className='row' style={{ listStyle: 'none', padding: 0 }}>
            <li className='col-xs-3'>
                <img src={getCardTypeImage(cardType)}/>
            </li>
        </ul>
        <div className='row'>
            <span className='col-xs-12'>{`**** **** **** ${lastFour}`}</span>
        </div>
        <div className='row'>
            <div className='col-xs-12'>
                {`Exp. ${expDate}`}
            </div>
        </div>
    </div>
)

function getCardTypeImage(cardType) {
    switch(cardType) {
        case 'AMEX':
        return '/img/payment/american-express-curved-32px.png'
        case 'MASTERCARD':
        return '/img/payment/mastercard-curved-32px.png'
        case 'DISCOVER':
        return '/img/payment/discover-curved-32px.png'
        case 'VISA':
        default:
        return '/img/payment/visa-curved-32px.png'
    }
}

export default ReadOnlyPaymentConfirmation
