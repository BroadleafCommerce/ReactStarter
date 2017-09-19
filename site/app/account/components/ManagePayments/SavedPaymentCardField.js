/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
