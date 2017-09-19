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
import React, { PureComponent } from 'react'
import Button from 'material-kit/components/Button'
import find from 'lodash/find'
import classNames from 'classnames'

class SavedPaymentCards extends PureComponent {
    render() {
        const { customerPayments = [], selectedPaymentId, onSelectCustomerPayment, onSubmitSavedPayment, toggleSavedPayments } = this.props
        return (
            <div>
                <div className='row'>
                    {customerPayments.map(customerPayment => (
                        <SavedPaymentCards.Card
                            key={customerPayment.id}
                            active={customerPayment.id === selectedPaymentId}
                            {...customerPayment}
                            onClick={e => onSelectCustomerPayment(customerPayment.id)}/>
                    ))}

                    <div className='col-sm-4' >
                        <div className='card saved-payment-card' onClick={e => toggleSavedPayments(false)}>
                            <div className='card-content'>
                                <div className='card-title'>
                                    <i className='material-icons' style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>add</i>
                                    <div style={{ display: 'inline-block' }}>Use a different card</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <Button className='pull-right' disabled={!selectedPaymentId} onClick={e => onSubmitSavedPayment()} primary type='submit'>
                            Continue <i className='material-icons'>keyboard_arrow_right</i>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

SavedPaymentCards.Card = ({
    active,
    additionalField,
    isDefault,
    onClick,
}) => (
    <div className='col-sm-4'>
        <div className={classNames({
                'card saved-payment-card': true,
                'active': active
            })} onClick={onClick}>
            <div className='card-content'>
                <div className='card-title'>
                    <span>{getPaymentName(additionalField)}</span>
                    {isDefault && (<span>(Default)</span>)}
                </div>

                <div className='read-only-credit-card'>
                    <ul className='row' style={{ listStyle: 'none', padding: 0 }}>
                        <li className='col-xs-6'>
                            <img src={getCardTypeImage(find(additionalField, { key: 'CARD_TYPE' }).value)}/>
                        </li>
                    </ul>

                    <div className='row'>
                        <span className='col-xs-12'>{`**** **** **** ${find(additionalField, { key: 'LAST_FOUR' }).value}`}</span>
                    </div>
                </div>
                <div className='credit-card-exp'>
                    {`Exp. ${find(additionalField, { key: 'EXP_DATE' }).value}`}
                </div>
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


export default SavedPaymentCards
