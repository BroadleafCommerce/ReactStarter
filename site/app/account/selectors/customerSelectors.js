import { createSelector } from 'reselect'

export const getCustomer = createSelector(
    state => state.customer,
    customer => customer
)

export const getCustomerAddresses = createSelector(
    state => state.customerAddresses.customerAddresses,
    customerAddresses => customerAddresses
)

export const getCustomerPayments = createSelector(
    state => state.customerPayments.customerPayments,
    customerPayments => customerPayments
)
