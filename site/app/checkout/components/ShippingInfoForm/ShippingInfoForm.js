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
import { fetchFulfillmentEstimations, saveFulfillmentGroup } from 'checkout/actions'
import { getInitialShippingValues, getFulfillmentEstimations } from 'checkout/selectors'
import { Field, Form, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import AddressPicker from 'account/components/AddressPicker'
import CheckoutField from 'checkout/components/CheckoutField'
import Button from 'material-kit/components/Button'
import { format } from 'layout/util/moneyUtils'
import states from 'layout/util/us-states.json'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import './ShippingInfoForm.scss'

class ShippingInfoForm extends Component {
    static propTypes = {
        initialValues: PropTypes.object, // populated by mapStateToProps
        stateOptions: PropTypes.array,
    }

    static defaultProps = {
        stateOptions: states
    }

    _onSubmit = form => {
        let submission = {
            ...form,
            address: omit(form.address, ['id', 'phonePrimary.id', 'isoCountryAlpha2'])
        }

        this.props.saveFulfillmentGroup(submission)
        .then(
            action => {
                if (!action.payload.error) {
                    this.props.afterSubmit()
                }
            }
        )
    }

    render() {
        return (
            <ShippingInfoForm.Form
                customerAddresses={this.props.customerAddresses}
                fulfillmentEstimations={this.props.fulfillmentEstimations}
                ref={ref => this.form = ref}
                initialValues={this.props.initialValues}
                onSubmit={this._onSubmit}
            />
        )
    }
}

const FormValidators = {
    required: value => value ? undefined : 'Required'
}

ShippingInfoForm.Form = ({
    customerAddresses, error, fulfillmentEstimations, handleSubmit,
}) => (
    <Form onSubmit={handleSubmit} styleName='ShippingInfoForm'>
        {/*
        Shipping Flow:
        There are two things the user needs to choose, a shipping address, and the shipping method.
        Shipping address is on the left and shipping method on the right. The user
        has two methods of choosing an address, selecting a saved address, or filling
        out the form for a new address. Whether you select saved or not is toggleable.
        */}

        <div className='row'>
            <div className='col-sm-6'>
                <FormattedMessage
                    defaultMessage='Shipping Information'
                    description='Shipping information form heading'
                    id='cart.shippingInformation'
                    tagName='h4'
                />

                <AddressPicker addresses={customerAddresses} defaultFormVisible={isEmpty(customerAddresses)}/>
            </div>
            <div className='col-sm-6'>
                <FormattedMessage
                    defaultMessage='Shipping Method'
                    description='Shipping Method form heading'
                    id='cart.shippingMethod'
                    tagName='h4'
                />

                <span className='form-group error-group'>
                    <Field
                        name='fulfillmentOption.id'
                        component={({ meta: { touched, error }}) => touched && error && (
                            <span className='text-danger'>{error}</span>
                        ) || false}
                    />
                </span>
                {fulfillmentEstimations.map(estimation => (
                    <Field
                        key={estimation.fulfillmentOption.id}
                        id={`fulfillmentOption.id.${estimation.fulfillmentOption.id}`}
                        component={CheckoutField}
                        label={`${estimation.fulfillmentOption.name} (${estimation.fulfillmentOption.description}) ${format(estimation.price)}`}
                        name='fulfillmentOption.id'
                        value={`${estimation.fulfillmentOption.id}`}
                        validate={FormValidators.required}
                        type='radio'/>
                ))}
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-12'>
                <Button type='submit' className='pull-right' primary>
                    Continue <i className='material-icons'>keyboard_arrow_right</i>
                </Button>
            </div>
        </div>
    </Form>
)

ShippingInfoForm.Form = reduxForm({
    enableReinitialize: true,
    form: 'ShippingInfoForm'
})(ShippingInfoForm.Form)

const mapStateToProps = (state, props) => {
    return {
        isFetching: state.customerAddresses.isFetching || state.fulfillment.isFetching,
        customerAddresses: state.customerAddresses.customerAddresses || [],
        fulfillmentEstimations: getFulfillmentEstimations(state, props),
        initialValues: getInitialShippingValues(state)
    }
}

const dispatchResolve = (resolver, props) => {
    resolver.resolve(props.fetchCustomerAddresses)
    resolver.resolve(props.fetchFulfillmentEstimations)
}

export default connect(mapStateToProps, { fetchCustomerAddresses, fetchFulfillmentEstimations, saveFulfillmentGroup })(
    resolve(dispatchResolve)(
        ShippingInfoForm
    )
)

// ======= READ ONLY ========

export const ReadOnlyShippingInfoForm = ({
    address,
    fulfillmentOption
}) => (
    <div className='row'>
        <div className='col-sm-6'>
            <FormattedMessage
                defaultMessage='Shipping Information'
                description='Shipping information form heading'
                id='cart.shippingInformation'
                tagName='h4'
            />

            <div>
                {address.firstName}&nbsp;{address.lastName}<br />
                {address.addressLine1}<br /> {address.addressLine2}{address.addressLine2 && (<br/>)}
                {address.city},&nbsp;{address.stateProvinceRegion}&nbsp;{address.postalCode}<br />
                {address.phonePrimary && address.phonePrimary.phoneNumber}
            </div>
        </div>
        <div className='col-sm-6'>
            <FormattedMessage
                defaultMessage='Shipping Method'
                description='Shipping Method form heading'
                id='cart.shippingMethod'
                tagName='h4'
            />

            <b>{fulfillmentOption.name}</b><br /> ({fulfillmentOption.description})
        </div>
    </div>
)
