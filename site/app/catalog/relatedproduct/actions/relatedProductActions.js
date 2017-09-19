/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
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
