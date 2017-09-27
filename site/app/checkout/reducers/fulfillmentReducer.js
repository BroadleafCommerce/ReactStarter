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
import { FulfillmentActionTypes } from 'checkout/actions'

const fulfillment = (state = {
    isFetching: false,
    lastFetched: undefined,
    estimations: [],
}, action) => {
    switch(action.type) {
        case FulfillmentActionTypes.Estimate.Request:
        return {
            ...state,
            isFetching: true,
        }
        case FulfillmentActionTypes.Estimate.Success:
        return {
            ...state,
            isFetching: false,
            estimations: action.payload.estimations,
            lastFetched: action.payload.receivedAt,
        }
        case FulfillmentActionTypes.Estimate.Failure:
        return {
            ...state,
            isFetching: false,
            error: action.payload.error,
        }
        default:
        return state
    }
}

export default fulfillment
