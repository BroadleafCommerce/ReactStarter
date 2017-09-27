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
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchCart, invalidateCart } from 'cart/actions'
import { clearPaymentData } from 'checkout/actions'
import { isAnonymous } from 'auth/selectors'
import { getCart } from 'cart/selectors'
import { CartContext } from 'cart/constants'
import SamplePaymentService from 'checkout/service/SamplePaymentService'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CheckoutStages from 'checkout/components/CheckoutStages'
import CartPricingSummary from 'cart/components/CartPricingSummary'
import CartItemSummary from 'cart/components/CartItemSummary'
import PromoCodes from 'cart/components/PromoCodes'
import Button from 'material-kit/components/Button'
import './Checkout.scss'

class Checkout extends PureComponent {

    componentDidMount() {
        // this component mounts and the stage is review, redirect to payment,
        if (this.props.location.pathname === '/checkout/review') {
            this.props.history.replace('/checkout/payment')
        }
    }

    componentWillReceiveProps(nextProps) {
        const {anonymous: wasAnonymous} = this.props
        const {anonymous} = nextProps
        if (wasAnonymous !== anonymous && !nextProps.isFetching) {
            nextProps.fetchCart(true)
        }
    }

    _onPerformCheckout = (paymentMethodType) => {
        const { authenticationToken, customerToken } = this.props
        switch(paymentMethodType) {
            case SamplePaymentService.Type.CreditCard:
                const { storedPayment } = this.props
                SamplePaymentService.tokenizeCard(storedPayment)
                .then(nonce => {

                    SamplePaymentService.performCheckout(this.props.id, nonce, { authenticationToken, customerToken })
                    .then(orderNumber => {
                        this.props.invalidateCart()
                        this.props.fetchCart(true)
                        this.props.history.push({
                            pathname: `/confirmation/${orderNumber}`
                        })
                        this.props.clearPaymentData()
                    }, err => {
                        // handle failed checkout
                        alert(err)
                    })
                }, err => {
                    // handle failed payment submission
                    alert(err)
                })

                break;
            case SamplePaymentService.Type.CollectOnDelivery:
                SamplePaymentService.performCodCheckout(this.props.id, { authenticationToken, customerToken })
                .then(orderNumber => {
                    this.props.invalidateCart()
                    this.props.fetchCart(true)
                    this.props.history.push({
                        pathname: `/confirmation/${orderNumber}`
                    })
                    this.props.clearPaymentData()
                }, err => {
                    // handle failed checkout
                    alert(err)
                })
                break;
            case SamplePaymentService.Type.PayPal:
            alert('PayPal not yet supported')
            break;
            default:
            alert('Unsupported payment method type')
        }
    }

    render() {
        const {
            addedOfferCodes = [],
            addPromo,
            anonymous,
            fulfillmentGroup,
            itemAdjustmentsValue,
            itemCount,
            orderItem,
            removePromo,
            removeFromCart,
            subTotal,
            totalAdjustmentsValue,
            totalTax,
            totalShipping,
            total
        } = this.props

        const hasOrderItems = itemCount > 0

        return (
            <div styleName='Checkout'>
                <Helmet titleTemplate='Heat Clinic - %s'>
                    <title>Checkout</title>
                    <meta name='description' content='Checkout'/>
                </Helmet>

                <div className='container'>
                    <div className='row'>
                        {!hasOrderItems ? (
                            <div className='col-lg-12'>
                                <div styleName='Checkout__emptyMessage'>
                                    <h1>Your cart is currently empty.</h1>
                                    <Button component={Link} componentProps={{ to: '/' }} primary lg>Continue Shopping</Button>
                                </div>
                            </div>
                        ) : (
                            <div className='col-lg-12'>
                                <h1>Checkout</h1>
                            </div>
                        )}

                        {hasOrderItems && (
                            <div className='col-lg-8'>
                                <CheckoutStages {...this.props} onPerformCheckout={this._onPerformCheckout}/>
                            </div>
                        )}

                        {hasOrderItems && (
                            <div className='col-lg-4'>
                                <CartPricingSummary
                                    anonymous={anonymous}
                                    context={CartContext.Checkout}
                                    fulfillmentGroup={fulfillmentGroup}
                                    itemAdjustmentsValue={itemAdjustmentsValue}
                                    itemCount={itemCount}
                                    onPerformCheckout={this._onPerformCheckout}
                                    orderItem={orderItem}
                                    subTotal={subTotal}
                                    totalAdjustmentsValue={totalAdjustmentsValue}
                                    totalTax={totalTax}
                                    totalShipping={totalShipping}
                                    total={total}/>

                                <CartItemSummary
                                    context={CartContext.Checkout}
                                    orderItem={orderItem}/>

                                {/* <!-- Promotion Codes --> */}
                                <PromoCodes
                                    addedOfferCodes={addedOfferCodes}
                                    addPromo={addPromo}
                                    removePromo={removePromo}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...getCart(state, props),
        anonymous: isAnonymous(state, props),
        authenticationToken: state.auth.authenticationToken,
        customerToken: state.auth.anonymousCustomerToken || state.csr.csrCustomerToken,
        storedPayment: state.storedPayment,
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchCart)
    }
}

export default connect(mapStateToProps, { clearPaymentData, fetchCart, invalidateCart })(
    resolve(dispatchResolve)(Checkout)
)
