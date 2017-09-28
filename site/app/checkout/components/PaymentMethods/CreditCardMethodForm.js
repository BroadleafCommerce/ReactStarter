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
import { fetchCustomerAddresses } from 'account/actions'
import { isAnonymous } from 'auth/selectors'
import { getCustomerAddresses } from 'account/selectors'
import { getInitialCreditCardValues } from 'checkout/selectors'
import { Field, Form, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import AddressPicker from 'account/components/AddressPicker'
import CheckoutField from 'checkout/components/CheckoutField'
import Button from 'material-kit/components/Button'
import states from 'layout/util/us-states.json'
import isEmpty from 'lodash/isEmpty'

/**
 * This is the form that is used to render the billing address and credit card fields.
 * Be aware when making changes and adding/removing fields that this form is populated
 * by `getInitialCreditCardValues`. Be sure to add your field to the list of reinitialized fields.
 */
class CreditCardMethodForm extends Component {
    static propTypes = {
        anonymous: PropTypes.bool,
        customerAddresses: PropTypes.array,
        initialValues: PropTypes.object,
        onSubmit: PropTypes.func,
        stateOptions: PropTypes.array,
        toggleSavedPayments: PropTypes.func,
    }

    static defaultProps = {
        stateOptions: states
    }

    _onSubmitForm = form => {
        this.props.onSubmit(form)
    }

    render() {
        return (
            <CreditCardMethodForm.Form
                anonymous={this.props.anonymous}
                customerAddresses={this.props.customerAddresses}
                initialValues={this.props.initialValues}
                onSubmit={this._onSubmitForm}
                stateOptions={this.props.stateOptions}
                toggleSavedPayments={this.props.toggleSavedPayments}
            />
        )
    }
}

CreditCardMethodForm.Form = ({
    anonymous,
    customerAddresses,
    handleSubmit,
    stateOptions,
    toggleSavedPayments
}) => (
    <Form onSubmit={handleSubmit}>
        {!anonymous && (
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='card saved-payment-card' onClick={e => toggleSavedPayments(true)}>
                        <div className='card-content'>
                            <span>Choose a saved card</span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className='row'>
            <div className='col-sm-6'>
                <FormattedMessage
                    defaultMessage='Billing Information'
                    description='Billing information form heading'
                    id='cart.billingInformation'
                    tagName='h4'
                />

                <div className='row'>
                    <div className='col-xs-12'>
                        <Field component={CheckoutField} inputGroup={false} label='Same as my shipping address' name='shouldUseShippingAddress' type='checkbox'/>
                    </div>
                </div>

                <AddressPicker addresses={customerAddresses} defaultFormVisible={isEmpty(customerAddresses)} excludedFields={['isDefault']}/>
            </div>

            <div className='col-sm-6'>
                <FormattedMessage
                    defaultMessage='Payment Information'
                    description='Payment information form heading'
                    id='account.payments.paymentFormTitle'
                    tagName='h4'
                />

                <div className='row' style={{ marginBottom: 20 }}>
                    <div className='col-sm-12'>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li className='col-xs-3'><img src='/img/payment/american-express-curved-32px.png'/></li>
                            <li className='col-xs-3'><img src='/img/payment/mastercard-curved-32px.png'/></li>
                            <li className='col-xs-3'><img src='/img/payment/visa-curved-32px.png'/></li>
                            <li className='col-xs-3'><img src='/img/payment/discover-curved-32px.png'/></li>
                        </ul>
                    </div>
                </div>

                <CreditCardMethodForm.CreditCardFields />

                {!anonymous && (
                    <Field
                        component={CheckoutField}
                        inputGroup={false}
                        label='Save this card for future purchases'
                        name='shouldSaveNewPayment'
                        type='checkbox'/>
                )}
            </div>
        </div>

        <div>
            <Button className='pull-right' primary type='submit'>
                Continue <i className='material-icons'>keyboard_arrow_right</i>
            </Button>
        </div>
    </Form>
)

const FormValidators = {
    required: value => value ? undefined : 'Required'
}

CreditCardMethodForm.CreditCardFields = () => (
    <div className='row'>
        <div className='col-sm-12'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='Credit Card Number' name='creditCard.creditCardNumber' type='text' validate={FormValidators.required}/>
        </div>
        <div className='col-sm-5'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='Exp. Date' name='creditCard.creditCardExpDate' type='text' validate={FormValidators.required}/>
        </div>
        <div className='col-sm-3'>
            <Field autoComplete={false} component={CheckoutField} inputGroup={false} label='CVV' name='creditCard.creditCardCvv' type='text' validate={FormValidators.required}/>
        </div>
    </div>
)

CreditCardMethodForm.Form = reduxForm({
    enableReinitialize: true,
    form: 'CreditCardMethodForm'
})(CreditCardMethodForm.Form)


const mapStateToProps = (state) => {
    return {
        anonymous: isAnonymous(state),
        customerAddresses: getCustomerAddresses(state),
        initialValues: getInitialCreditCardValues(state)
    }
}


const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchCustomerAddresses)
    }
}

export default connect(mapStateToProps, { fetchCustomerAddresses })(
    resolve(dispatchResolve)(CreditCardMethodForm)
)
