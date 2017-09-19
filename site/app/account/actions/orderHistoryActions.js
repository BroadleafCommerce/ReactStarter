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
import { normalize, schema } from 'normalizr'
import request from 'core/util/superagent'
import { isAnonymous } from 'auth/selectors'

export const OrderHistoryActionTypes = {
    Request: '@OrderHistory.Request',
    Success: '@OrderHistory.Success',
    Failure: '@OrderHistory.Failure',
}

const Order = new schema.Entity('orders', { idAttribute : 'orderNumber'})

export const fetchOrderHistory = () => (dispatch, getState) => {
    if (isAnonymous(getState())) {
        return Promise.resolve()
    }
    return dispatch({
        types: [OrderHistoryActionTypes.Request, OrderHistoryActionTypes.Success, OrderHistoryActionTypes.Failure],
        payload: {},
        callAPI: () =>
            request.get('/api/orders')
                .set('Content-Type', 'application/json'),
        transform: response => {
            if (response.body) {
                const { entities, result } = normalize(response.body, [Order])

                return {
                    entities,
                    result,
                    receivedAt : Date.now(),
                }
            }
        }
    })
}
