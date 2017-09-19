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

export const TypeAheadActionTypes = {
    Request: '@TypeAhead.Request',
    Success: '@TypeAhead.Success',
    Failure: '@TypeAhead.Failure',
    Clear: '@TypeAhead.Clear',
}

export const fetchSuggestions = (name, q, contributor) => (dispatch, getState) => {
    const {typeAhead} = getState()
    if (!!typeAhead[name] && !!typeAhead[name][q] && typeAhead[name][q].isFetching) {
        return Promise.resolve()
    }
    return dispatch({
        types: [ TypeAheadActionTypes.Request, TypeAheadActionTypes.Success, TypeAheadActionTypes.Failure ],
        payload: {
            name,
            q,
        },
        options: {
            includeAuthentication: true,
        },
        callAPI: () =>
            request.get(`/api/typeahead`)
                .query({
                    name,
                    q,
                    contributor,
                }),
        transform: response => {
            if (response.body) {
                return {
                    suggestions: response.body,
                    receivedAt: Date.now()
                }
            }
        }
    })
}

export const clearCurrentSearch = (name) => ({
    type: TypeAheadActionTypes.Clear,
    payload: {
        name
    }
})
