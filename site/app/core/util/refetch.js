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


const REQUIRED_INITIAL_STATE = {
    isFetching: false,
    lastFetched: false
}

export const createFetchReducer = (name, initialState = {}) => {
    const [REQUEST, SUCCESS, FAILURE] = createFetchConstants(name)
    const mergedInitialState = { ...REQUIRED_INITIAL_STATE, ...initialState }
    return (state = mergedInitialState, action) => {
        switch(action.type) {
            case REQUEST:
            return {
                ...state,
                isFetching: true
            }
            case SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastFetched: action.payload.receivedAt,
                [name]: action.payload[name] || state[name]
            }
            case FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error
            }
            default:
            return state
        }
    }
}

export const createPagedFetchReducer = (name, getKey, initialState = {}) => {
    const [REQUEST, SUCCESS, FAILURE] = createFetchConstants(name)
    const reducer = createFetchReducer(name, initialState)
    return (state = {}, action) => {
        switch(action.type) {
            case REQUEST:
            case SUCCESS:
            case FAILURE:
            const key = getKey(action.payload)
            return {
                ...state,
                [key]: reducer(state[key], action)
            }
            default:
            return state
        }
    }
}

export const createFetchConstants = (name) => [
    `@${name.toUpperCase()}.REQUEST`,
    `@${name.toUpperCase()}.SUCCESS`,
    `@${name.toUpperCase()}.FAILURE`
]

export const createFetchAction = (name, makeRequest, transformResponseBody) => {
    const actions = createFetchConstants(name)
    return payload => (dispatch, getState) => {
        return dispatch({
            types: actions,
            payload,
            callAPI: () => makeRequest(payload),
            transform: response => {
                if (response.body) {
                    return {
                        [name]: transformResponseBody ? transformResponseBody(response.body, getState()[name], payload) : response.body,
                        receivedAt: Date.now()
                    }
                }
            }
        })
    }
}
