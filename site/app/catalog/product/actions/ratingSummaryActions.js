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
