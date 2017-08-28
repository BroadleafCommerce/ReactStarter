

export const StoredPaymentActionTypes = {
    Store: '@StoredPayment.Store',
    Clear: '@StoredPayment.Clear'
}

export const storePaymentData = (creditCard) => ({
    type: StoredPaymentActionTypes.Store,
    payload: {
        creditCard
    }
})

export const clearPaymentData = () => ({
    type: StoredPaymentActionTypes.Clear
})
