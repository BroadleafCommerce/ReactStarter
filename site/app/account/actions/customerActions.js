import request from 'core/util/superagent'

export const CustomerActionTypes = {
    Request: '@Customer.Request',
    Success: '@Customer.Success',
    Failure: '@Customer.Failure'
}


export const fetchCustomer = (ignoreCache = false) => (dispatch, getState) => {
    const { customer } = getState()

    if (customer.isFetching || (!ignoreCache && customer.emailAddress)) {
        return Promise.resolve()
    }

    return dispatch({
        types: [ CustomerActionTypes.Request, CustomerActionTypes.Success, CustomerActionTypes.Failure ],
        callAPI: () => request.get('/api/customer/current'),
        transform: response => {
            if (response.body) {
                return {
                    customer: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}
