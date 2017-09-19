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
import request from 'core/util/superagent'

export const CustomerActionTypes = {
    Request: '@Customer.Request',
    Success: '@Customer.Success',
    Failure: '@Customer.Failure'
}


export const fetchCustomer = (ignoreCache = false) => (dispatch, getState) => {
    const { customer } = getState()

    if (customer.isFetching || (!ignoreCache && customer.emailAddress)) {
        return Promise.resolve()
    }

    return dispatch({
        types: [ CustomerActionTypes.Request, CustomerActionTypes.Success, CustomerActionTypes.Failure ],
        callAPI: () => request.get('/api/customer/current'),
        transform: response => {
            if (response.body) {
                return {
                    customer: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}
