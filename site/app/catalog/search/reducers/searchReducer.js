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
import map from 'lodash/map'
import snakeCase from 'lodash/snakeCase'
import isEmpty from 'lodash/isEmpty'
import {SearchActionTypes, fetchSearch} from 'catalog/search/actions'

export const buildKey = ({q, page, sort, ...filters}) => {
    let components = []

    if (!isEmpty(q) && q !== "*:*") {
        components = [snakeCase(q)]
    }

    if (page !== undefined && page !== null) {
        components.push(page)
    }

    if (sort !== undefined && sort !== null) {
        components.push(snakeCase(sort))
    }

    if (!isEmpty(filters)) {
        const filterKey =
            map(filters, (value, key) => `${key}=${value}`)
            .sort()
            .join('_')

        components.push(filterKey)
    }

    return components.join('_')
}

const searchByKey = (state = {}, action) => {
    switch(action.type) {
        case SearchActionTypes.Request:
        case SearchActionTypes.Success:
        case SearchActionTypes.Failure:
        return {
            ...state,
            [buildKey(action.payload.criteria)] : search(state[action.payload.name], action)
        }
        default:
        return state
    }
}

const search = (state = {
    isFetching : false,
    ids : [],
    metadata : {},
    lastFetched : undefined,
}, action) => {
    switch(action.type) {
        case SearchActionTypes.Request:
        return {
            ...state,
            isFetching : true,
        }
        case SearchActionTypes.Success:
        return {
            ...state,
            ids : Array.isArray(action.payload.result) ? action.payload.result : [action.payload.result],
            metadata : action.payload.metadata,
            isFetching : false,
            lastFetched : action.payload.receivedAt,
        }
        case SearchActionTypes.Failure:
        return {
            ...state,
            isFetching : false,
            error : action.payload.error,
        }
        default:
        return state
    }
}

export default searchByKey
