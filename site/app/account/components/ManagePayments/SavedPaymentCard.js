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
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-kit/components/Button'
import find from 'lodash/find'
import classNames from 'classnames'
import './SavedPaymentCard.scss'

class SavedPaymentCard extends PureComponent {
    static propTypes = {
        active: PropTypes.bool,
        additionalFieldMap: PropTypes.object,
        billingAddress: PropTypes.object,
        empty: PropTypes.bool,
        id: PropTypes.number,
        isDefault: PropTypes.bool,
        onClick: PropTypes.func,
        onMakeDefault: PropTypes.func,
        onRemove: PropTypes.func,
    }

    render() {
        const { active, additionalFieldMap, empty, id, isDefault, onClick, onMakeDefault, onRemove } = this.props

        return (
            <div className={classNames({
                'card saved-payment-card': true,
                'active': active
            })} onClick={onClick}>
                <div className='card-content'>
                    {!empty ? (
                        <div className='card-title'>
                            {additionalFieldMap.PAYMENT_NAME}
                        </div>
                    ) : (
                        <div className='card-title'>
                            <i className='material-icons' style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>add</i>
                            <div style={{ display: 'inline-block' }}>Define a new card</div>
                        </div>
                    )}



                    {!empty && (
                        <div className='read-only-credit-card'>
                            <ul className='row' style={{ listStyle: 'none', padding: 0 }}>
                                <li className='col-xs-6'>
                                    <img src={getCardTypeImage(additionalFieldMap.CARD_TYPE)}/>
                                </li>
                            </ul>

                            <div className='row'>
                                <span className='col-xs-12'>{`**** **** **** ${additionalFieldMap.LAST_FOUR}`}</span>
                            </div>
                        </div>
                    )}

                    {!empty && (
                        <div className='credit-card-exp'>
                            {`Exp. ${additionalFieldMap.EXP_DATE}`}
                        </div>
                    )}

                    {!empty && (
                        <div className='row'>
                            <div className='col-xs-6'>
                                {isDefault ? (
                                    <span className='btn btn-simple btn-success btn-xs'>Default</span>
                                ) : (
                                    <Button
                                        simple
                                        xs
                                        onClick={e => {
                                            e.stopPropagation()
                                            onMakeDefault(id)
                                        }}>
                                        Make Default
                                    </Button>
                                )}
                            </div>

                            <div className='col-xs-6'>
                                <Button
                                    danger
                                    simple
                                    xs
                                    onClick={e => {
                                        e.stopPropagation()
                                        onRemove(id)
                                    }}>Remove</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

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

export default SavedPaymentCard
