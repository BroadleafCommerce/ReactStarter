import { StoredPaymentActionTypes } from 'checkout/actions'

const storedPayment = (state = {}, action) => {
    switch(action.type) {
        case StoredPaymentActionTypes.Store:
        return {
            ...state,
            ...action.payload.creditCard
        }
        case StoredPaymentActionTypes.Clear:
        return {}
        default:
        return state
    }
}

export default storedPayment
