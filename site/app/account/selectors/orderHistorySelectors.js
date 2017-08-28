import { createSelector } from 'reselect'

export const getOrders = createSelector(
    state => state.orderHistory.orderNumbers,
    state => state.entities.orders,
    (orderNumbers, orders) => {
        if (!orderNumbers || !orderNumbers.length) {
            return []
        }

        return orderNumbers.filter(orderNumber => orders.hasOwnProperty(orderNumber))
                           .map(orderNumber => orders[orderNumber])
    }
)
