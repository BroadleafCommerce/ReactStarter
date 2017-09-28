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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchCustomerPayments } from 'account/actions'
import { clearPaymentData, removeExistingPayment, saveBillingAddressForNewPayment, saveNewCustomerPaymentForOrder, selectExistingCustomerPaymentForOrder, storePaymentData } from 'checkout/actions'
import { isAnonymous } from 'auth/selectors'
import SamplePaymentService from 'checkout/service/SamplePaymentService'
import { FormattedMessage } from 'react-intl'
import CreditCardMethodForm from './CreditCardMethodForm'
import SavedPaymentCards from './SavedPaymentCards'
import Button from 'material-kit/components/Button'
import classNames from 'classnames'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import './PaymentMethods.scss'

class PaymentMethods extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentMethodType: SamplePaymentService.Type.CreditCard,

            selectedPaymentId: undefined,

            // we should show saved payments by default based on these conditions
            showSavedPayments: false
        }
    }

    _setStateFromProps = props => {
        const { customerPayments, storedPayment } = props
        const hasSavedPayments = !isEmpty(customerPayments)
        const currentlyUsedPayment = find(customerPayments, { usedByCurrentCart: true })

        this.setState({
            selectedPaymentId: this.state.selectedPaymentId || currentlyUsedPayment && currentlyUsedPayment.id,
            showSavedPayments: isEmpty(storedPayment) && (currentlyUsedPayment || hasSavedPayments)
        })
    }

    componentWillReceiveProps(nextProps) {
        this._setStateFromProps(nextProps)
    }

    _onSelectMethodType = paymentMethodType => this.setState({ paymentMethodType })

    _toggleSavedPayments = showSavedPayments => {
        this.setState({
            showSavedPayments: showSavedPayments === undefined ? !this.state.showSavedPayments : showSavedPayments
        })
    }

    _onSelectCustomerPayment = selectedPaymentId => {
        this.setState({
            selectedPaymentId
        })
    }

    _onSubmitCreditCardForm = form => {
        const { address, shouldSaveNewPayment } = form

        const creditCardPaymentData = {
           ...form.creditCard,
           creditCardName: `${address.firstName} ${address.lastName}`
        }

        if (shouldSaveNewPayment) {
            SamplePaymentService.tokenizeCard(creditCardPaymentData)
            .then(nonce => {
                this.props.saveNewCustomerPaymentForOrder(address, nonce)
                .then(action => {
                    if (!action.payload.error) {
                        return this.props.fetchCustomerPayments()
                    }
                })
                .then(action => {
                    if (!action.payload.error) {
                        this.props.clearPaymentData()
                        return this.props.afterSubmit(SamplePaymentService.Type.CreditCard)
                    }
                })
            })
        } else {
            this.props.storePaymentData(creditCardPaymentData)
            // save the billing address only
            this.props.saveBillingAddressForNewPayment(address)
            .then(action => {
                // if there wasn't an error and the user is non anonymous, fetch customer payments
                if (!action.payload.error && !this.props.anonymous) {
                    return this.props.fetchCustomerPayments()
                }
                return action
            })
            .then(action => {
                if (!action.payload.error) {
                    return this.props.afterSubmit(SamplePaymentService.Type.CreditCard)
                }
            })
        }
    }

    _onSubmitSavedPayment = () => {
        const { selectedPaymentId } = this.state
        if (selectedPaymentId) {
            this.props.selectExistingCustomerPaymentForOrder(selectedPaymentId)
            .then(action => {
                if (!action.payload.error) {
                    return this.props.fetchCustomerPayments()
                }
            })
            .then(action => {
                if (!action.payload.error) {
                    this.props.clearPaymentData()
                    return this.props.afterSubmit(SamplePaymentService.Type.CreditCard)
                }
            })
        }
    }

    _onSubmitCollectOnDelivery = () => {
        this.props.afterSubmit(SamplePaymentService.Type.CollectOnDelivery)
    }

    render() {
        const { paymentMethodType, showSavedPayments } = this.state

        return (
            <div styleName='PaymentMethods' style={{ display: !this.props.active ? 'none' : 'block' }}>
                <div styleName='PaymentMethods__selectors'>
                    <div className='nav-align-center'>
                        <ul className='nav nav-pills nav-pills-primary nav-pills-icons text-center'>
                            <PaymentMethods.TypePill
                                active={paymentMethodType === SamplePaymentService.Type.CreditCard}
                                defaultMessage='Credit Card'
                                icon='credit_card'
                                message='checkout.paymentMethod.creditCard'
                                onSelect={this._onSelectMethodType}
                                type={SamplePaymentService.Type.CreditCard}
                            />

                            <PaymentMethods.TypePill
                                active={paymentMethodType === SamplePaymentService.Type.PayPal}
                                defaultMessage='PayPal'
                                message='checkout.paymentMethod.payPal'
                                onSelect={this._onSelectMethodType}
                                type={SamplePaymentService.Type.PayPal}
                            />

                            <PaymentMethods.TypePill
                                active={paymentMethodType === SamplePaymentService.Type.CollectOnDelivery}
                                defaultMessage='Collect On Delivery'
                                icon='local_shipping'
                                message='checkout.paymentMethod.cod'
                                onSelect={this._onSelectMethodType}
                                type={SamplePaymentService.Type.CollectOnDelivery}
                            />

                        </ul>
                    </div>
                </div>

                <div className='payment-method-content'>
                    <div className='payment_info js-paymentInfoForm'>
                        <div className='tab-content'>
                            <PaymentMethods.TypePane
                                active={paymentMethodType === SamplePaymentService.Type.CreditCard}
                                type={SamplePaymentService.Type.CreditCard}>
                                {showSavedPayments ? (
                                    <SavedPaymentCards
                                        customerPayments={this.props.customerPayments}
                                        selectedPaymentId={this.state.selectedPaymentId}
                                        onSelectCustomerPayment={this._onSelectCustomerPayment}
                                        onSubmitSavedPayment={this._onSubmitSavedPayment}
                                        toggleSavedPayments={this._toggleSavedPayments}
                                    />
                                ) : (
                                    <CreditCardMethodForm toggleSavedPayments={this._toggleSavedPayments} onSubmit={this._onSubmitCreditCardForm}/>
                                )}
                            </PaymentMethods.TypePane>

                            <PaymentMethods.TypePane
                                active={paymentMethodType === SamplePaymentService.Type.PayPal}
                                type={SamplePaymentService.Type.PayPal}>

                            </PaymentMethods.TypePane>

                            <PaymentMethods.TypePane
                                active={paymentMethodType === SamplePaymentService.Type.CollectOnDelivery}
                                type={SamplePaymentService.Type.CollectOnDelivery}>
                                <div>
                                    <p>Payment will be collected upon item's delivery.</p>
                                    <Button className='pull-right' primary type='submit' onClick={this._onSubmitCollectOnDelivery}>
                                        Continue <i className='material-icons'>keyboard_arrow_right</i>
                                    </Button>
                                </div>
                            </PaymentMethods.TypePane>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

PaymentMethods.TypePill = ({
    active,
    defaultMessage,
    icon,
    message,
    onSelect,
    type,
}) => (
    <li className={classNames({
            'center-pill': true,
            'active': active
        })}
        styleName='TypePill'
        onClick={e => {
            e.preventDefault()
            onSelect(type)
        }}>
        <FormattedMessage defaultMessage={defaultMessage} id={message}>
            {formattedMessage => (
                <a href={`#${type}`}><i className='material-icons'>{icon}</i>{formattedMessage}</a>
            )}
        </FormattedMessage>
    </li>
)

PaymentMethods.TypePane = ({
    active,
    children,
    type
}) => (
    <div
        id={type}
        className={classNames({
            'tab-pane': true,
            'active': active
        })}>
        {children}
    </div>
)

const mapStateToProps = (state) => {
    return {
        anonymous: isAnonymous(state),
        customerPayments: state.customerPayments.customerPayments,
        storedPayment: state.storedPayment
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.anonymous) {
        resolver.resolve(props.fetchCustomerPayments)
    }
}

export default connect(mapStateToProps, { clearPaymentData, fetchCustomerPayments, removeExistingPayment, saveBillingAddressForNewPayment, saveNewCustomerPaymentForOrder, selectExistingCustomerPaymentForOrder, storePaymentData })(
    resolve(dispatchResolve)(PaymentMethods)
)

export const ReadOnlyPaymentMethods = () => (
    <div>
        Read Only Payment Methods
    </div>
)
