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
