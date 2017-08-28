import request from 'core/util/superagent'
import isEmpty from 'lodash/isEmpty'

export const FulfillmentActionTypes = {
    Estimate: {
        Request: '@Fulfillment.Estimate.Request',
        Success: '@Fulfillment.Estimate.Success',
        Failure: '@Fulfillment.Estimate.Failure',
    }
}

export const fetchFulfillmentEstimations = () => (dispatch, getState) => {
    const { cart, fulfillment } = getState()
    if (!isEmpty(fulfillment.estimations) || cart.isFetching) {
        return Promise.resolve()
    }

    return dispatch({
        types: [ FulfillmentActionTypes.Estimate.Request, FulfillmentActionTypes.Estimate.Success, FulfillmentActionTypes.Estimate.Failure ],
        callAPI: () => request.get(`/api/shipping/${cart.id}/estimate`).set('Content-Type', 'application/json'),
        transform: response => {
            if (!isEmpty(response.body)) {
                return {
                    estimations: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}
