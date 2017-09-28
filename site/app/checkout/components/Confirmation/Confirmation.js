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
import { isAnonymous } from 'auth/selectors'
import request from 'core/util/superagent'
import { CartContext } from 'cart/constants'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'
import { ReadOnlyShippingInfoForm } from 'checkout/components/ShippingInfoForm'
import ReadOnlyPaymentConfirmation from './ReadOnlyPaymentConfirmation'
import CartPricingSummary from 'cart/components/CartPricingSummary'
import CartItemSummary from 'cart/components/CartItemSummary'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import './Confirmation.scss'

class Confirmation extends Component {
    state = {
        order: {}
    }

    componentDidMount() {
        const { authenticationToken, customerToken, match } = this.props
        const { orderNumber } = match.params
        request.get('/api/orders')
            .set('Content-Type', 'application/json')
            .set('Authorization', authenticationToken || null)
            .set('X-Customer-Token', customerToken || null)
            .query({ orderNumber })
            .end((err, response) => {
                if (err) this.props.history.push('/')

                if (response.body && response.body.length) {
                    this.setState({
                        order: response.body[0]
                    })
                }
            })
    }

    render() {
        const { anonymous, match } = this.props
        const { orderNumber } = match.params
        const { order } = this.state

        const shippableFulfillmentGroup = find(order.fulfillmentGroup || [], fg => !['DIGITAL', 'GIFT_CARD', 'PHYSICAL_PICKUP'].includes(fg.fulfillmentType))
        const payment = find(order.payment || [], p => ['CREDIT_CARD', 'COD'].includes(p.type) && p.isActive && !isEmpty(p.transactions))

        return (
            <div styleName='Confirmation'>
                <Helmet titleTemplate='Heat Clinic - %s'>
                    <title>Confirmation</title>
                    <meta name='description' content='Confirmation'/>
                </Helmet>

                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='card'>
                                <div className='card-content'>
                                    <div className='card-title text-center'>
                                        <FormattedMessage defaultMessage='Thank You!' id='confirmation.success' tagName='h2'/>
                                        <h3>
                                            <FormattedMessage defaultMessage='Order Confirmation #' id='confirmation.orderNum'/> - {orderNumber}
                                        </h3>
                                    </div>
                                    <div className='footer'>
                                        {order.customer && (
                                            <FormattedMessage
                                                id='confirmation.confirmEmail.toBeSent'
                                                values={{
                                                    '0': order.emailAddress || order.customer.emailAddress
                                                }}>
                                                {formattedMessage => (
                                                    <p className='text-center' dangerouslySetInnerHTML={{ __html: formattedMessage }}/>
                                                )}
                                            </FormattedMessage>
                                        )}
                                    </div>
                                    {/* Demo Disclaimer */}
                                    <div className="alert alert-danger payment-alert">
                                        <div className="container-fluid">
                                            <div className="alert-icon">
                                                <i className="material-icons">error_outline</i>
                                            </div>
                                            <b>Alert:</b> <FormattedMessage id='demoDisclaimer'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-8'>
                            {!isEmpty(shippableFulfillmentGroup) && (
                                <div className='card'>
                                    <div styleName='Confirmation__stageTitle'>
                                        <FormattedMessage
                                            defaultMessage='Shipping'
                                            id='checkout.stages.shipping'
                                            tagName='h4'/>
                                    </div>
                                    <div className='card-content'>
                                        <ReadOnlyShippingInfoForm {...shippableFulfillmentGroup}/>
                                    </div>
                                </div>
                            )}
                            {!isEmpty(payment) && (
                                <div className='card'>
                                    <div styleName='Confirmation__stageTitle'>
                                        <FormattedMessage
                                            defaultMessage='Payment'
                                            id='checkout.stages.payment'
                                            tagName='h4'/>
                                    </div>
                                    <div className='card-content'>
                                        <ReadOnlyPaymentConfirmation {...payment}/>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isEmpty(order) && (
                            <div className='col-lg-4'>
                                <CartPricingSummary
                                    anonymous={anonymous}
                                    context={CartContext.Confirmation}
                                    {...order}/>

                                <CartItemSummary
                                    context={CartContext.Confirmation}
                                    orderItem={order.orderItem}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        anonymous: isAnonymous(state),
        authenticationToken: state.auth.authenticationToken,
        customerToken: state.auth.anonymousCustomerToken || state.csr.csrCustomerToken
    }
}

export default connect(mapStateToProps)(Confirmation)
