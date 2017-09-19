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
