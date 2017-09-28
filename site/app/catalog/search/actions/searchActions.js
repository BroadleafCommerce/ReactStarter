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
import isEmpty from 'lodash/isEmpty'
import { normalize } from 'normalizr'
import request from 'core/util/superagent'
import {productSchema} from 'catalog/product/schema'
import {buildKey} from 'catalog/search/reducers'

export const SearchActionTypes = {
    Request : '@Search.Request',
    Success : '@Search.Success',
    Failure : '@Search.Failure',
}

export const fetchSearch = (uri, criteria = {
    q : '*',
    page : undefined,
    sort : undefined,
}) => {
    return (dispatch, getState) => {
        const {search} = getState()

        const searchKey = buildKey(criteria)

        if (!!search[searchKey]) {
            return undefined
        }
        return dispatch({
            types : [SearchActionTypes.Request, SearchActionTypes.Success, SearchActionTypes.Failure],
            payload : {criteria},
            options : {
                includeAuthentication: true
            },
            callAPI : () => getSearch(uri, criteria),
            transform : response => {
                if (response.body) {
                    const { product, ...metadata } = response.body

                    const {entities, result} = !isEmpty(product) ? normalize(product, [productSchema]) : {entities : {}, result : []}

                    return {
                        metadata,
                        entities,
                        result,
                        receivedAt : Date.now(),
                    }
                }
            },
        })
    }
}

const getSearch = (uri, criteria) => {
    const {
        q = '*:*',
        page = undefined,
        sort = undefined,
        ...filters,
    } = criteria
    return request.get(uri)
        .query({
            includePromotionMessages: true,
            q,
            page,
            sort,
            ...filters,
        })
}
