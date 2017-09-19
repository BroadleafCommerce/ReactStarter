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
import isEmpty from 'lodash/isEmpty'

export const FulfillmentActionTypes = {
    Estimate: {
        Request: '@Fulfillment.Estimate.Request',
        Success: '@Fulfillment.Estimate.Success',
        Failure: '@Fulfillment.Estimate.Failure',
    }
}

export const fetchFulfillmentEstimations = () => (dispatch, getState) => {
    const { cart, fulfillment } = getState()
    if (!isEmpty(fulfillment.estimations) || cart.isFetching) {
        return Promise.resolve()
    }

    return dispatch({
        types: [ FulfillmentActionTypes.Estimate.Request, FulfillmentActionTypes.Estimate.Success, FulfillmentActionTypes.Estimate.Failure ],
        callAPI: () => request.get(`/api/shipping/${cart.id}/estimate`).set('Content-Type', 'application/json'),
        transform: response => {
            if (!isEmpty(response.body)) {
                return {
                    estimations: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}
