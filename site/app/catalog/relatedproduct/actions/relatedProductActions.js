/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
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
