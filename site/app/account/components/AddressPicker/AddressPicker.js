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
import { Field } from 'redux-form'
import CheckoutField from 'checkout/components/CheckoutField'
import states from 'layout/util/us-states.json'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'

class AddressPicker extends PureComponent {
    static propTypes = {
        addresses: PropTypes.array,
        excludedFields: PropTypes.array,
        defaultFormVisible: PropTypes.bool,
        name: PropTypes.string,
        stateOptions: PropTypes.array,
    }

    static defaultProps = {
        defaultFormVisible: true,
        excludedFields: [],
        name: 'address',
        stateOptions: states,
    }

    state = {
        formVisible: this.props.defaultFormVisible
    }

    _toggleVisiblity = formVisible => this.setState({ formVisible })

    render() {
        const { addresses, excludedFields, name, stateOptions } = this.props
        const { formVisible } = this.state
        return (
            <div className='address-cards address-cards-primary'>
                <ul>
                    {!formVisible && addresses && (
                        <Field addresses={addresses} component={AddressPickerField} name={name}/>
                    )}
                    {!isEmpty(addresses) && (
                        <li onClick={e => this._toggleVisiblity(!formVisible)}>
                            {!formVisible ? 'Use a different address' : 'Use a saved address'}
                        </li>
                    )}
                </ul>
                {formVisible && (
                    <AddressPickerFormFields excludedFields={excludedFields} name={name} stateOptions={stateOptions}/>
                )}
            </div>
        )
    }
}

const AddressPickerField = ({ addresses, input }) => (
    <div>
        {addresses.map(customerAddress => (
            <li key={customerAddress.id} className={addressEquals(input.value, customerAddress.address) ? 'active' : ''} onClick={e => input.onChange(customerAddress.address)}>
                <div>
                    <strong>{customerAddress.addressName}</strong>{customerAddress.address.default && (<small>&nbsp;&nbsp;(Default)</small>)}<br />
                    {customerAddress.address.firstName}&nbsp;{customerAddress.address.lastName}<br />
                    {customerAddress.address.addressLine1}<br /> {customerAddress.address.addressLine2}{customerAddress.address.addressLine2 && (<br/>)}
                    {customerAddress.address.city},&nbsp;{customerAddress.address.stateProvinceRegion}&nbsp;{customerAddress.address.postalCode}<br />
                    {customerAddress.address.phonePrimary && customerAddress.address.phonePrimary.phoneNumber}
                </div>
            </li>
        ))}
    </div>
)

const addressEquals = (address1, address2) => {
    return isEqual(
        pick(address1, ['firstName', 'lastName', 'addressLine1', 'addressLine2', 'city', 'stateProvinceRegion', 'postalCode', 'phonePrimary.phoneNumber']),
        pick(address2, ['firstName', 'lastName', 'addressLine1', 'addressLine2', 'city', 'stateProvinceRegion', 'postalCode', 'phonePrimary.phoneNumber'])
    )
}

const FormValidators = {
    required: value => value ? undefined : 'Required'
}

const AddressPickerFormFields = ({
    excludedFields,
    name,
    stateOptions,
}) => (
    <div>

        <div className='row'>
            <div className='col-sm-6'>
                {!excludedFields.includes(`firstName`) && (
                    <Field component={CheckoutField} inputGroup={false} label='First Name' name={`${name}.firstName`} type='text' validate={FormValidators.required}/>
                )}
            </div>
            <div className='col-sm-6'>
                {!excludedFields.includes(`lastName`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Last Name' name={`${name}.lastName`} type='text' validate={FormValidators.required}/>
                )}
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-12'>
                {!excludedFields.includes(`addressLine1`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Address' name={`${name}.addressLine1`} type='text' validate={FormValidators.required}/>
                )}
            </div>
            <div className='col-xs-12'>
                {!excludedFields.includes(`addressLine2`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Address 2' name={`${name}.addressLine2`} type='text'/>
                )}
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-5'>
                {!excludedFields.includes(`city`) && (
                    <Field component={CheckoutField} inputGroup={false} label='City' name={`${name}.city`} type='text' validate={FormValidators.required}/>
                )}
            </div>
            <div className='col-sm-3'>
                {!excludedFields.includes(`stateProvinceRegion`) && (
                    <Field component={CheckoutField} inputGroup={false} label='State' name={`${name}.stateProvinceRegion`} type='select' validate={FormValidators.required}>
                        <option value=''></option>
                        {stateOptions.map(option => (
                            <option key={option.abbreviation} value={option.abbreviation}>{option.abbreviation}</option>
                        ))}
                    </Field>
                )}
            </div>
            <div className='col-xs-4'>
                {!excludedFields.includes(`postalCode`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Postal Code' name={`${name}.postalCode`} type='text' validate={FormValidators.required}/>
                )}
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-4'>
                {!excludedFields.includes(`phonePrimary.phoneNumber`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Phone' name={`${name}.phonePrimary.phoneNumber`} type='tel' />
                )}
            </div>
        </div>

        <div className='row'>
            <div className='col-xs-12'>
                {!excludedFields.includes(`isDefault`) && (
                    <Field component={CheckoutField} inputGroup={false} label='Default Shipping' name={`${name}.isDefault`} type='checkbox'/>
                )}
            </div>
        </div>
    </div>
)

export default AddressPicker
