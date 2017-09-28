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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SamplePaymentService from 'checkout/service/SamplePaymentService'
import { FormattedMessage } from 'react-intl'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

class ReadOnlyPaymentMethods extends Component {

    render() {
        const { billingAddress, currentlyUsedPayment, paymentMethodType, storedPayment } = this.props

        switch(paymentMethodType) {
            case SamplePaymentService.Type.CreditCard:
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

                        {!isEmpty(currentlyUsedPayment) ? (
                            <ReadOnlyCreditCard
                                cardType={find(currentlyUsedPayment.additionalField, { key: 'CARD_TYPE' }).value}
                                lastFour={find(currentlyUsedPayment.additionalField, { key: 'LAST_FOUR' }).value}
                                expDate={find(currentlyUsedPayment.additionalField, { key: 'EXP_DATE' }).value}/>
                        ) : (
                            <ReadOnlyCreditCard
                                cardType={SamplePaymentService.cardType(storedPayment)}
                                lastFour={SamplePaymentService.lastFour(storedPayment)}
                                expDate={SamplePaymentService.expDate(storedPayment)}/>
                        )}
                    </div>
                </div>
            )
            case SamplePaymentService.Type.CollectOnDelivery:
            return (
                <p>Payment will be collected upon item's delivery.</p>
            )
            case SamplePaymentService.Type.PayPal:
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

function getPaymentName(additionalField) {
    const field = find(additionalField, { key: 'PAYMENT_NAME' })
    return field && field.value
}

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

const mapStateToProps = (state) => {
    const tempBillingPayment = find(state.cart.payment, { gatewayType: 'Temporary' })
    const currentlyUsedPayment = find(state.customerPayments.customerPayments || [], { usedByCurrentCart: true })

    let billingAddress = {}
    if (!isEmpty(currentlyUsedPayment)) {
        billingAddress = currentlyUsedPayment.billingAddress
    } else if (!isEmpty(tempBillingPayment)) {
        billingAddress = tempBillingPayment.billingAddress
    }

    return {
        currentlyUsedPayment,
        billingAddress,
        storedPayment: state.storedPayment
    }
}

export default connect(mapStateToProps)(ReadOnlyPaymentMethods)
