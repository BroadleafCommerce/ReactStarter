

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
