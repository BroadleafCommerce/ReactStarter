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
