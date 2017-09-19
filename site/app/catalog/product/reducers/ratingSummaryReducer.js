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
import { RatingSummaryActionTypes } from 'catalog/product/actions'

const ratingSummary = (state = {
    isFetching: false,
    id: undefined,
    lastFetched: undefined
}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        return {
            ...state,
            isFetching: true
        }
        case RatingSummaryActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            id: action.payload.result,
            lastFetched: action.payload.receivedAt
        }
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
            error: action.payload.error
        }
        default:
        return state
    }
}

export const ratingSummaryByProduct = (state = {}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        case RatingSummaryActionTypes.Success:
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            [action.payload.productId]: ratingSummary(state[action.payload.productId], action)
        }
        default:
        return state
    }
}
