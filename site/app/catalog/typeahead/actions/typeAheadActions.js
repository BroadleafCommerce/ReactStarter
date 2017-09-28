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
