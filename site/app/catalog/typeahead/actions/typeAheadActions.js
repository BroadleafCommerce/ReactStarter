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
