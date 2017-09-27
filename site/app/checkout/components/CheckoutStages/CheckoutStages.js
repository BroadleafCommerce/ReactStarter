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
import { Link, Redirect, Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Button from 'material-kit/components/Button'
import ShippingInfoForm, { ReadOnlyShippingInfoForm } from 'checkout/components/ShippingInfoForm'
import PaymentMethods, { ReadOnlyPaymentMethods } from 'checkout/components/PaymentMethods'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import './CheckoutStages.scss'

class CheckoutStages extends Component {

    render() {
        return (
            <div styleName='CheckoutStages'>
                <Route path='/checkout' exact render={({match}) => match && <Redirect to='/checkout/shipping'/>}/>
                <Route path='/checkout/shipping' exact children={props => (
                    <CheckoutStages.Shipping {...props} fetchCart={this.props.fetchCart} fulfillmentGroup={this.props.fulfillmentGroup}/>
                )}/>
                <Route path='/checkout/payment' exact children={props => (
                    <CheckoutStages.Payment {...props} fetchCart={this.props.fetchCart}/>
                )}/>
                <Route path='/checkout/review' exact children={props => (
                    <CheckoutStages.Review {...props} onPerformCheckout={this.props.onPerformCheckout}/>
                )}/>
            </div>
        )
    }
}

CheckoutStages.Shipping = ({ fetchCart, fulfillmentGroup, history, location, match }) => {
    const isActive = !!match
    const isPrevious = !isActive && ['/checkout/payment', '/checkout/review'].includes(location.pathname)

    const shippableFulfillmentGroup = find(fulfillmentGroup, fg => !['DIGITAL', 'GIFT_CARD', 'PHYSICAL_PICKUP'].includes(fg.fulfillmentType))

    return (
        <div className='card'>
            <div styleName='CheckoutStages__title'>
                <h4>
                    {isPrevious && (<i className='material-icons text-success'>check</i>)}
                    Shipping
                </h4>

               {isPrevious && shippableFulfillmentGroup && (
                    <Button
                        className='pull-right'
                        component={Link}
                        componentProps={{ to: '/checkout/shipping' }}
                        lg
                        primary
                        simple
                        styleName='Edit'>Edit</Button>
               )}
            </div>

            <div styleName='CheckoutStages__stage'>
                {isPrevious && (
                    <ReadOnlyShippingInfoForm {...shippableFulfillmentGroup}/>
                )}

                {isActive && (
                    <ShippingInfoForm afterSubmit={() => {
                        fetchCart(true)
                        history.push('/checkout/payment')
                    }}/>
                )}
            </div>
        </div>
    )
}

CheckoutStages.Payment = ({ fetchCart, history, location, match }) => {
    const isActive = !!match
    const isPrevious = !isActive && ['/checkout/review'].includes(location.pathname)
    const isLater = !isActive && ['/checkout/shipping'].includes(location.pathname)

    return (
        <div className='card'>
            <div styleName='CheckoutStages__title'>
                <h4>
                    {isPrevious && (<i className='material-icons text-success'>check</i>)}
                    Payment
                </h4>

               {isPrevious && (
                    <Button
                        className='pull-right'
                        component={Link}
                        componentProps={{ to: '/checkout/payment' }}
                        lg
                        primary
                        simple
                        styleName='Edit'>Edit</Button>
               )}
            </div>

            {!isLater && (
                <div styleName='CheckoutStages__stage'>

                    {/* Demo Disclaimer */}
                    <div className="alert alert-danger payment-alert">
                        <div className="container-fluid">
                            <div className="alert-icon">
                                <i className="material-icons">error_outline</i>
                            </div>
                            <b>Alert:</b> <FormattedMessage id='demoDisclaimer'/>
                        </div>
                    </div>

                    {isPrevious && (
                        <ReadOnlyPaymentMethods paymentMethodType={location.state && location.state.paymentMethodType}/>
                    )}

                    <PaymentMethods active={isActive} afterSubmit={paymentMethodType => {
                        fetchCart(true)
                        history.push({
                            pathname: '/checkout/review',
                            state: {
                                paymentMethodType
                            }
                        })
                    }}/>

                </div>
            )}
        </div>
    )
}

CheckoutStages.Review = ({ location, match, onPerformCheckout }) => {
    const isActive = !!match
    const isLater = !isActive && ['/checkout/shipping', '/checkout/payment'].includes(location.pathname)

    return (
        <div className='card'>
            <div styleName='CheckoutStages__title'>
                <h4>
                    Review
                </h4>
            </div>

            {isActive && (
                <div styleName='CheckoutStages__stage'>

                    {/* Redirect to payment if there is no payment method type in the location state */}
                    {(!location.state || !location.state.paymentMethodType) && (
                        <Redirect to='/checkout/payment'/>
                    )}

                    <div className='col-sm-8' style={{ marginTop: '0.7em' }}>
                        <FormattedMessage
                            id='checkout.completion.prompt'
                            description='Completion prompt for the Review Stage of Checkout'/>
                    </div>
                    <div className='col-sm-4'>
                        <Button
                            className='pull-right'
                            primary
                            onClick={e => onPerformCheckout(location.state.paymentMethodType)}
                        >
                            Place Your Order <i className='material-icons'>keyboard_arrow_right</i>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutStages
