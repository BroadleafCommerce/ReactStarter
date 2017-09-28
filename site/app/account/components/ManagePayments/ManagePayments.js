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
import { Field, Form, reduxForm, SubmissionError } from 'redux-form'
import { addCustomerPayment, fetchCustomerAddresses, fetchCustomerPayments, makePaymentDefault, removeCustomerPayment, updateCustomerPayment } from 'account/actions'
import { getCustomerAddresses, getCustomerPayments } from 'account/selectors'
import SamplePaymentService from 'checkout/service/SamplePaymentService'
import { FormattedMessage } from 'react-intl'
import AddressPicker from 'account/components/AddressPicker'
import CheckoutField from 'checkout/components/CheckoutField'
import CreditCardTypes from './CreditCardTypes'
import CreditCardFields from './CreditCardFields'
import SavedPaymentCardField from './SavedPaymentCardField'
import Button from 'material-kit/components/Button'
import isEmpty from 'lodash/isEmpty'

class ManagePayments extends PureComponent {
    state = {
        success: undefined
    }

    _onSubmit = form => {
        const { creditCard, customerPayment } = form
        SamplePaymentService.tokenizeCard(creditCard)
        .then(nonce => {
            if (nonce) {
                if (customerPayment.id) {
                    this.props.updateCustomerPayment({
                        customerPayment,
                        nonce,
                    })
                    .then(() => {
                        this.form.reset()
                        this.setState({
                            success: 'You have succesfully updated your payment method!'
                        })
                    })
                } else {
                    this.props.addCustomerPayment({
                        customerPayment,
                        nonce,
                    })
                    .then(() => {
                        this.form.reset()
                        this.setState({
                            success: 'You have succesfully added a new payment method!'
                        })
                    })
                }
            }
        })
    }

    _onMakeDefault = id => {
        this.props.makePaymentDefault(id)
        .then(() => {
            this.form.reset()
            this.setState({
                success: 'You have successfully selected your default payment!'
            })
        })
    }

    _onRemove = id => {
        this.props.removeCustomerPayment(id)
        .then(() => {
            this.form.reset()
            this.setState({
                success: 'You have successfully deleted a payment method!'
            })
        })
    }

    _clearMessaging = () => {
        this.setState({
            success: undefined
        })
    }

    render() {
        const { customerAddresses, customerPayments } = this.props

        return (
            <div onClick={e => this._clearMessaging()} >
                <ManagePayments.Form onSubmit={this._onSubmit} ref={ref => this.form = ref}>
                    <FormattedMessage
                        defaultMessage='Manage Payment Methods'
                        id='account.payments.managePayments'
                        tagName='h3'/>

                    <hr/>

                    {!isEmpty(customerPayments) ? (
                        <div className='row'>
                            <Field component={SavedPaymentCardField} customerPayments={customerPayments} name='customerPayment' onMakeDefault={this._onMakeDefault} onRemove={this._onRemove}/>
                        </div>
                    ) : (
                        <FormattedMessage
                            defaultMessage='You have no saved payments.'
                            id='account.payments.noSavedPayments'
                            tagName='p'/>
                    )}

                    <hr />

                    {this.state.success && (
                        <span className='text-success'>{this.state.success}</span>
                    )}

                    <div className='row saved-payment-info'>
                        <div className='col-sm-6'>
                            <FormattedMessage
                                defaultMessage='Billing Information'
                                id='cart.billingInformation'
                                tagName='h4'/>

                            <AddressPicker addresses={customerAddresses} excludedFields={['isDefault']} name='customerPayment.billingAddress' />
                        </div>
                        <div className='col-sm-6'>
                            <FormattedMessage
                                defaultMessage='Payment Information'
                                id='account.payments.paymentFormTitle'
                                tagName='h4'
                            />

                            <CreditCardTypes/>

                            <Field component={CheckoutField} inputGroup={false} label='Your Payment Name' name='customerPayment.additionalFieldMap.PAYMENT_NAME' type='text'/>

                            <CreditCardFields/>

                            <Field component={CheckoutField} inputGroup={false} label='Make Default' name='customerPayment.isDefault' type='checkbox'/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 text-right'>
                            <Button primary type='submit'>
                                <FormattedMessage defaultMessage='Save' id='account.payments.save'/>
                            </Button>
                        </div>
                    </div>
                </ManagePayments.Form>
            </div>
        )
    }
}

ManagePayments.Form = reduxForm({
    enableReinitialize: true,
    form: 'ManagePaymentsForm',
    initialValues: {
        creditCard: {
            creditCardNumber: '4111111111111111',
            creditCardName: 'Hotsauce Connoisseur',
            creditCardExpDate: '01/99',
            creditCardCvv: '123'
        },
        customerPayment: {
            billingAddress: {
                isoCountryAlpha2: {
                    alpha2: 'US'
                }
            }
        }
    }
 })(({
    children,
    handleSubmit
}) => (
    <Form onSubmit={handleSubmit}>
        {children}
    </Form>
))

const mapStateToProps = state => {
    return {
        customerAddresses: getCustomerAddresses(state),
        customerPayments: getCustomerPayments(state)
    }
}

const dispatchResolve = (resolver, props) => {
    resolver.resolve(props.fetchCustomerPayments)
    resolver.resolve(props.fetchCustomerAddresses)
}

export default connect(
    mapStateToProps,
    { addCustomerPayment, fetchCustomerAddresses, fetchCustomerPayments, makePaymentDefault, removeCustomerPayment, updateCustomerPayment }
)(resolve(dispatchResolve)(ManagePayments))
