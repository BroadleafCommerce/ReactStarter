import { RatingSummaryActionTypes } from 'catalog/product/actions'

const ratingSummary = (state = {
    isFetching: false,
    id: undefined,
    lastFetched: undefined
}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        return {
            ...state,
            isFetching: true
        }
        case RatingSummaryActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            id: action.payload.result,
            lastFetched: action.payload.receivedAt
        }
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
            error: action.payload.error
        }
        default:
        return state
    }
}

export const ratingSummaryByProduct = (state = {}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        case RatingSummaryActionTypes.Success:
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            [action.payload.productId]: ratingSummary(state[action.payload.productId], action)
        }
        default:
        return state
    }
}
