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
/**
 * Example State Structure:
 {
     'Demo Type Ahead': {
         isFetching: false,
         lastFetched: undefined,
         previousSearch: 'gr',
         currentSearch: 'gre',
         suggestionsByQuery: {
             gr: {
                 keywords: [],
                 categories: [],
                 products: []
             },
             gre: {
                 keywords: [],
                 categories: [],
                 products: []
             }
         }
     }
 }
 */

import {TypeAheadActionTypes} from 'catalog/typeahead/actions'


const suggestionsByQuery = (state = {}, action) => {
    switch(action.type) {
        case TypeAheadActionTypes.Success:
        return {
            ...state,
            [action.payload.q]: action.payload.suggestions
        }
        default:
        return state
    }
}

const typeAheadByName = (state = {}, action) => {
    switch(action.type) {
        case TypeAheadActionTypes.Request:
        return {
            ...state,
            isFetching: true,
            previousSearch: state.currentSearch,
            currentSearch: action.payload.q,
        }
        case TypeAheadActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            suggestionsByQuery: suggestionsByQuery(state.suggestionsByQuery, action)
        }
        case TypeAheadActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
            currentSearch: state.previousSearch,
            error: action.payload.error
        }
        case TypeAheadActionTypes.Clear:
        return {
            ...state,
            currentSearch: undefined,
            previousSearch: undefined
        }
        default:
        return state
    }
}

const typeAhead = (state = {}, action) => {
    switch(action.type) {
        case TypeAheadActionTypes.Request:
        case TypeAheadActionTypes.Success:
        case TypeAheadActionTypes.Failure:
        case TypeAheadActionTypes.Clear:
        return {
            ...state,
            [action.payload.name]: typeAheadByName(state[action.payload.name], action)
        }
        default:
        return state
    }
}

export default typeAhead
