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
