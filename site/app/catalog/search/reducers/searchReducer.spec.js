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
import {
    SearchActionTypes
} from 'catalog/search/actions'
import reducer, {buildKey} from 'catalog/search/reducers'
import {expect} from 'chai'

const createSearchRequest = (criteria) => ({
    type : SearchActionTypes.Request,
    payload : {criteria}
})

const createSearchSuccess = (criteria, result, metadata, receivedAt) => ({
    type : SearchActionTypes.Success,
    payload : {criteria, result, metadata, receivedAt}
})

const createSearchFailure = (criteria, error) => ({
    type : SearchActionTypes.Failure,
    payload : {criteria, error}
})

describe('search reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal({})
    })

    it('should handle a request', () => {
        expect(
            reducer({}, createSearchRequest({q : 'hot'}))
        ).to.deep.equal({
            'hot' : {
                isFetching : true,
                ids : [],
                metadata : {},
                lastFetched : undefined,
            }
        })
    })

    it('should handle a request and then success', () => {
        const result = [1, 2]
        const metadata = {
            page : 1,
            pageSize : 15,
            totalResults : 0,
            totalPages : 0,
            searchFacet : [],
        }

        const receivedAt = Date.now()

        expect(
            reducer(
                reducer({}, createSearchRequest({q : 'hot'})),
                createSearchSuccess({q : 'hot'}, result, metadata, receivedAt)
            )
        ).to.deep.equal({
            'hot' : {
                isFetching : false,
                lastFetched : receivedAt,
                ids : result,
                metadata,
            }
        })
    })

    it('should handle a request and then failure', () => {
        const error =  new Error('Error')

        expect(
            reducer(
                reducer({}, createSearchRequest({q : 'hot'})),
                createSearchFailure({q : 'hot'}, error)
            )
        ).to.deep.equal({
            'hot' : {
                isFetching : false,
                lastFetched : undefined,
                ids : [],
                metadata : {},
                error,
            }
        })
    })
})

describe('search buildKey', () => {
    it('should build the key for searching "hot"', () => {
        expect(buildKey({q : 'hot'})).to.equal('hot')
    })

    it('should build the key for category "hot-sauces"', () => {
        expect(buildKey({category : 'hot-sauces'})).to.equal('category=hot-sauces')
    })

    it('should build the key for category "merchandise" page 2', () => {
        expect(buildKey({page : 2, category : 'merchandise'})).to.equal('2_category=merchandise')
    })

    it('should build the key for searching "hot" page 3, with sort "price asc"', () => {
        expect(buildKey({q : 'hot', page : 3, sort : 'price asc'})).to.equal('hot_3_price_asc')
    })
})
