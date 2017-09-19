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
import { CustomerActionTypes } from 'account/actions'

const customer = (state = {
    isFetching: false,
    emailAddress: undefined,
    firstName: undefined,
    lastName: undefined,
    lastFetched: undefined,
}, action) => {
    switch(action.type) {
        case CustomerActionTypes.Request:
        return {
            ...state,
            isFetching: true
        }
        case CustomerActionTypes.Failure:
        return {
            ...state,
            isFetching: false
        }
        case CustomerActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            ...action.payload.customer
        }
        default:
        if (action.payload && action.payload.cart && action.payload.cart.customer) {
            return {
                ...state,
                ...action.payload.cart.customer,
                isFetching: false,
                lastFetched: action.payload.receivedAt
            }
        }
        return state
    }
}

export default customer
