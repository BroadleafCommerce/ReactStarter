import {OrderHistoryActionTypes} from 'account/actions'

const orderHistory = (state = {
    orderNumbers: [],
    isFetching: false,
    lastFetched: undefined,
}, action) => {
    switch(action.type) {
        case OrderHistoryActionTypes.Request:
        return {
            ...state,
            isFetching: true,
        }
        case OrderHistoryActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            orderNumbers: Array.isArray(action.payload.result) ? action.payload.result : [action.payload.result]
        }
        case OrderHistoryActionTypes.Failure:
        return {
            ...state,
            isFetching: false
        }
        default:
        return state
    }
}

export default orderHistory
