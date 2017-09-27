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
import SavedPaymentCard from './SavedPaymentCard'
import pick from 'lodash/pick'

class SavedPaymentCardField extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.customerPayments !== nextProps.customerPayments || this.props.input.value.id !== nextProps.input.value.id
    }

    render() {
        const { customerPayments, input } = this.props

        return (
            <div>
                {customerPayments.map(customerPayment => (
                    <div className='col-sm-4' key={customerPayment.id}>
                        <SavedPaymentCard
                            active={+input.value.id === customerPayment.id}
                            onClick={e => {
                                input.onChange(
                                    pick(customerPayment, ['additionalFieldMap', 'billingAddress', 'id', 'isDefault'])
                                )
                            }}
                            onMakeDefault={this.props.onMakeDefault}
                            onRemove={this.props.onRemove}
                            {...customerPayment}
                        />
                    </div>
                ))}
                <div className='col-sm-4'>
                    <SavedPaymentCard
                        active={!input.value.id}
                        empty
                        onClick={e => input.onChange({})}
                    />
                </div>
            </div>
        )
    }
}

export default SavedPaymentCardField
