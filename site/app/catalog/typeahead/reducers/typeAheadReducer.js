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
