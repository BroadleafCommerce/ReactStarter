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
import { addCustomerAddress, fetchCustomerAddresses, removeCustomerAddress, updateCustomerAddress } from 'account/actions'
import AccountField from 'account/components/AccountField'
import Button from 'material-kit/components/Button'
import states from 'layout/util/us-states.json'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

class ManageAddresses extends PureComponent {

    static defaultProps = {
        addresses: [],
        stateOptions: states
    }

    state = {
        selectedAddressId: undefined
    }

    _onRemoveAddress = addressId => {
        return this.props.removeCustomerAddress(addressId)
            .then(action => {
                if (!action.payload.error && this.state.selectedAddressId === addressId) {
                    this._onSelectAddress(undefined)
                }
            })
    }

    _onSelectAddress = id => {
        this.setState({
            selectedAddressId: id
        })
    }

    _onSubmitForm = form => {
        return (!this.state.selectedAddressId ? this.props.addCustomerAddress(form) : this.props.updateCustomerAddress(form))
        .then(action => {
            if (action.payload.error) {
                throw new SubmissionError({ _error: 'Error submitting the address' })
            } else {
                this.addressForm.reset()
                this.props.fetchCustomerAddresses()
            }
        })
    }

    render() {
        const currentAddress = find(this.props.addresses, { id: this.state.selectedAddressId })
        return (
            <div>
                <h3>Address Book</h3>
                <hr />

                <div className='row'>
                    <div className='col-sm-6' >
                        <ManageAddresses.Manage
                            addresses={this.props.addresses}
                            onRemoveAddress={this._onRemoveAddress}
                            onSelectAddress={this._onSelectAddress}
                            selectedAddressId={this.state.selectedAddressId}/>
                    </div>
                    <div className='col-sm-6'>
                        <ManageAddresses.Form
                            initialValues={currentAddress}
                            onSubmit={this._onSubmitForm}
                            ref={ref => this.addressForm = ref}
                            stateOptions={this.props.stateOptions}/>
                    </div>
                </div>
            </div>
        )
    }
}

ManageAddresses.Manage = ({
    addresses,
    onRemoveAddress,
    onSelectAddress,
    selectedAddressId
}) => (
    <div className='address-cards address-cards-primary'>
        <ul>
            <li className={selectedAddressId === undefined ? 'active' : ''} onClick={e => onSelectAddress(undefined)}>
                <div>
                    Add a new address
                </div>
            </li>
            {addresses.map(({id, addressName, address}) => (
                <li key={id} className={selectedAddressId === id ? 'active' : ''} onClick={e => onSelectAddress(id)}>
                    <div>
                        <strong>{addressName}</strong>{address.default && (<small>&nbsp;&nbsp;(Default)</small>)}<br />
                        {address.firstName}&nbsp;{address.lastName}<br />
                        {address.addressLine1}<br /> {address.addressLine2}{address.addressLine2 && (<br/>)}
                        {address.city},&nbsp;{address.stateProvinceRegion}&nbsp;{address.postalCode}<br />
                        {address.phonePrimary && address.phonePrimary.phoneNumber}

                        <Button
                            danger
                            simple
                            sm
                            onClick={e => {
                                e.stopPropagation()
                                onRemoveAddress(id)
                            }}>Remove</Button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

const FormValidators = {
    required: value => value ? undefined : 'Required'
}

ManageAddresses.Form = reduxForm({
    enableReinitialize: true,
    form: 'ManageAddressesForm',
    initialValues: {
        address: {
            isoCountryAlpha2: {
                alpha2: 'US'
            }
        }
    }
})(
    ({ initialValues, error, handleSubmit, stateOptions, submitSucceeded }) => (
        <Form onSubmit={handleSubmit}>
            {!error && submitSucceeded && <span className='text-success'>You successfully {isEmpty(initialValues) ? 'added' : 'modified'} the address!</span>}

            <div className='row'>
                <div className='col-xs-6'>
                    <Field autoComplete='off' component={AccountField} inputGroup={false} label='Address Name' name='addressName' type='text' validate={FormValidators.required}/>
                </div>
            </div>

            <div className='row'>
                <div className='col-sm-6'>
                    <Field component={AccountField} inputGroup={false} label='First Name' name='address.firstName' type='text' validate={FormValidators.required}/>
                </div>
                <div className='col-sm-6'>
                    <Field component={AccountField} inputGroup={false} label='Last Name' name='address.lastName' type='text' validate={FormValidators.required}/>
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-12'>
                    <Field component={AccountField} inputGroup={false} label='Address' name='address.addressLine1' type='text' validate={FormValidators.required}/>
                </div>
                <div className='col-xs-12'>
                    <Field component={AccountField} inputGroup={false} label='Address 2' name='address.addressLine2' type='text'/>
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-5'>
                    <Field component={AccountField} inputGroup={false} label='City' name='address.city' type='text' validate={FormValidators.required}/>
                </div>
                <div className='col-sm-3'>
                    <Field component={AccountField} inputGroup={false} label='State' name='address.stateProvinceRegion' type='select' validate={FormValidators.required}>
                        <option value=''></option>
                        {stateOptions.map(option => (
                            <option key={option.abbreviation} value={option.abbreviation}>{option.abbreviation}</option>
                        ))}
                    </Field>
                </div>
                <div className='col-xs-4'>
                    <Field component={AccountField} inputGroup={false} label='Postal Code' name='address.postalCode' type='text' validate={FormValidators.required}/>
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-4'>
                    <Field component={AccountField} inputGroup={false} label='Phone' name='address.phonePrimary.phoneNumber' type='tel' />
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-12'>
                    <Field component={AccountField} inputGroup={false} label='Default Shipping' name='address.isDefault' type='checkbox'/>
                </div>
            </div>

            <div className='text-right'>
                {error && <div className='text-danger'>{error}</div>}
                <Button type='submit' primary>Save</Button>
            </div>
        </Form>
    )
)

const mapStateToProps = (state) => {
    return {
        isFetching: state.customerAddresses.isFetching,
        addresses: state.customerAddresses.customerAddresses
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchCustomerAddresses)
    }
}

export default connect(mapStateToProps, { addCustomerAddress, fetchCustomerAddresses, removeCustomerAddress, updateCustomerAddress })(resolve(dispatchResolve)(ManageAddresses))
