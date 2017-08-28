import { CustomerActionTypes } from 'account/actions'

const customer = (state = {
    isFetching: false,
    emailAddress: undefined,
    firstName: undefined,
    lastName: undefined,
    lastFetched: undefined,
}, action) => {
    switch(action.type) {
        case CustomerActionTypes.Request:
        return {
            ...state,
            isFetching: true
        }
        case CustomerActionTypes.Failure:
        return {
            ...state,
            isFetching: false
        }
        case CustomerActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            ...action.payload.customer
        }
        default:
        if (action.payload && action.payload.cart && action.payload.cart.customer) {
            return {
                ...state,
                ...action.payload.cart.customer,
                isFetching: false,
                lastFetched: action.payload.receivedAt
            }
        }
        return state
    }
}

export default customer
