import { normalize } from 'normalizr'
import {productSchema} from 'catalog/product/schema'
import request from 'core/util/superagent'

export const RelatedProductActionTypes = {
    Request: '@RelatedProduct.Request',
    Success: '@RelatedProduct.Success',
    Failure: '@RelatedProduct.Failure',
}

export const fetchRelatedProducts = ({ categoryKey = null, productKey = null, quantity = null, type = null }) => (dispatch, getState) => {
    return dispatch({
        types: [ RelatedProductActionTypes.Request, RelatedProductActionTypes.Success, RelatedProductActionTypes.Failure, ],
        payload: { categoryKey, productKey, quantity, type },
        options: {
            includeAuthentication: true,
        },
        callAPI: () =>
            request.get('/api/related-products')
                .query({
                    quantity,
                    type,
                    categoryKey,
                    productKey,
                    includePromotionMessages: true,
                }),
        transform: response => {
            if (response.body) {
                const { entities, result } = normalize(response.body, [productSchema])

                return {
                    entities,
                    result,
                    receivedAt: Date.now()
                }
            }
        }
    })
}
