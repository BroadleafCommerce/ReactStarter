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
import {OrderHistoryActionTypes} from 'account/actions'

const orderHistory = (state = {
    orderNumbers: [],
    isFetching: false,
    lastFetched: undefined,
}, action) => {
    switch(action.type) {
        case OrderHistoryActionTypes.Request:
        return {
            ...state,
            isFetching: true,
        }
        case OrderHistoryActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            orderNumbers: Array.isArray(action.payload.result) ? action.payload.result : [action.payload.result]
        }
        case OrderHistoryActionTypes.Failure:
        return {
            ...state,
            isFetching: false
        }
        default:
        return state
    }
}

export default orderHistory
