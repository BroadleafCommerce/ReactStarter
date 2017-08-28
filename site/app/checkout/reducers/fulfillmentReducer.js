import { FulfillmentActionTypes } from 'checkout/actions'

const fulfillment = (state = {
    isFetching: false,
    lastFetched: undefined,
    estimations: [],
}, action) => {
    switch(action.type) {
        case FulfillmentActionTypes.Estimate.Request:
        return {
            ...state,
            isFetching: true,
        }
        case FulfillmentActionTypes.Estimate.Success:
        return {
            ...state,
            isFetching: false,
            estimations: action.payload.estimations,
            lastFetched: action.payload.receivedAt,
        }
        case FulfillmentActionTypes.Estimate.Failure:
        return {
            ...state,
            isFetching: false,
            error: action.payload.error,
        }
        default:
        return state
    }
}

export default fulfillment
