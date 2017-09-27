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
