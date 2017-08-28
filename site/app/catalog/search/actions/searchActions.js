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
