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
