import { normalize } from 'normalizr'
import request from 'core/util/superagent'
import { ratingSummarySchema } from 'catalog/product/schema'

export const RatingSummaryActionTypes = {
    Request: '@RatingSummary.Request',
    Success: '@RatingSummary.Success',
    Failure: '@RatingSummary.Failure',
}

export const fetchRatingSummaryForProduct = productId => ({
    types: [ RatingSummaryActionTypes.Request, RatingSummaryActionTypes.Success, RatingSummaryActionTypes.Failure ],
    payload: { productId },
    callAPI: () =>
        request.get(`/api/ratings/${productId}`)
            .query({ ratingType: 'PRODUCT' }),
    transform: response => {
        if (response.body) {
            const { entities, result } = normalize(response.body, ratingSummarySchema)

            return {
                entities,
                result,
                receivedAt: Date.now()
            }
        }
    }
})

export const addReviewForProduct = (productId, review) => ({
    types: [ RatingSummaryActionTypes.Request, RatingSummaryActionTypes.Success, RatingSummaryActionTypes.Failure ],
    payload: { productId },
    callAPI: () =>
        request.post(`/api/ratings/${productId}`)
            .query({ ratingType: 'PRODUCT' })
            .send(review),
    transform: response => {
        if (response.body) {
            const { entities, result } = normalize(response.body, ratingSummarySchema)

            return {
                entities,
                result,
                receivedAt: Date.now()
            }
        }
    }
})
