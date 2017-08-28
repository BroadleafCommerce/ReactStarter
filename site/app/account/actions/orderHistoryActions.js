import { normalize, schema } from 'normalizr'
import request from 'core/util/superagent'
import { isAnonymous } from 'auth/selectors'

export const OrderHistoryActionTypes = {
    Request: '@OrderHistory.Request',
    Success: '@OrderHistory.Success',
    Failure: '@OrderHistory.Failure',
}

const Order = new schema.Entity('orders', { idAttribute : 'orderNumber'})

export const fetchOrderHistory = () => (dispatch, getState) => {
    if (isAnonymous(getState())) {
        return Promise.resolve()
    }
    return dispatch({
        types: [OrderHistoryActionTypes.Request, OrderHistoryActionTypes.Success, OrderHistoryActionTypes.Failure],
        payload: {},
        callAPI: () =>
            request.get('/api/orders')
                .set('Content-Type', 'application/json'),
        transform: response => {
            if (response.body) {
                const { entities, result } = normalize(response.body, [Order])

                return {
                    entities,
                    result,
                    receivedAt : Date.now(),
                }
            }
        }
    })
}
