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
    SearchActionTypes,
    fetchSearch,
} from 'catalog/search/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import middleware from 'core/middleware'
import {expect} from 'chai'
import nock from 'nock'
import omit from 'lodash/omit'

const mockStore = configureMockStore([...middleware, thunk])

describe('Search async actions', () => {

    afterEach(() => nock.cleanAll())

    process.env.API_HOST = 'http://127.0.0.1'
    process.env.API_CONTEXT_PATH = '/api/'

    it('creates @Search.Success when fetching a search', () => {
        const body = {
            product : [],
            page : 1,
            pageSize : 15,
            totalResults : 0,
            totalPages : 0,
            searchFacet : [],
        }

        nock('http://127.0.0.1')
            .get('/api/catalog/search?q=hot')
            .reply(200, body)

        const store = mockStore({search : {}, entities : {}})

        const expectedActions = [
            {
                type : SearchActionTypes.Request,
                payload : {
                    criteria : {
                        q : 'hot',
                    }
                }
            },
            {
                type : SearchActionTypes.Success,
                payload : {
                    criteria : {
                        q : 'hot',
                    },
                    entities : {},
                    result : [],
                    metadata : {
                        page : 1,
                        pageSize : 15,
                        totalResults : 0,
                        totalPages : 0,
                        searchFacet : [],
                    }
                }
            }
        ]

        return store.dispatch(fetchSearch('/api/catalog/search', {q : 'hot'}))
            .then(() => {
                expect(
                    store.getActions()
                        .map(action => omit(action, 'payload.receivedAt'))
                ).to.deep.equal(expectedActions)
            })
    })

    it('creates entities and result when searching "hot"', () => {
        const body = {
            product : [{
                id: 1,
                name: 'Sudden Death Sauce',
                description: null,
                longDescription: 'As my Chilipals know, I am never one to be satisfied. Hence, the creation of Sudden Death. When you need to go beyond... Sudden Death will deliver! ',
                url: '/hot-sauces/sudden_death_sauce',
            }],
            page : 1,
            pageSize : 15,
            totalResults : 1,
            totalPages : 1,
            searchFacet : [],
        }

        nock('http://127.0.0.1:80')
            .get('/api/catalog/search?q=hot')
            .reply(200, body)

        const store = mockStore({search : {}, entities : {}})

        const expectedActions = [
            {
                type : SearchActionTypes.Request,
                payload : {
                    criteria : {
                        q : 'hot',
                    }
                }
            },
            {
                type : SearchActionTypes.Success,
                payload : {
                    criteria : {
                        q : 'hot',
                    },
                    entities : {
                        products : {
                            '1' : {
                                id: 1,
                                name: 'Sudden Death Sauce',
                                description: null,
                                longDescription: 'As my Chilipals know, I am never one to be satisfied. Hence, the creation of Sudden Death. When you need to go beyond... Sudden Death will deliver! ',
                                url: '/hot-sauces/sudden_death_sauce',
                            }
                        }
                    },
                    result : [1],
                    metadata : {
                        page : 1,
                        pageSize : 15,
                        totalResults : 1,
                        totalPages : 1,
                        searchFacet : [],
                    }
                }
            }
        ]

        return store.dispatch(fetchSearch('/api/catalog/search', {q : 'hot'}))
            .then(() => {
                expect(
                    store.getActions()
                        .map(action => omit(action, 'payload.receivedAt'))
                ).to.deep.equal(expectedActions)
            })
    })
})
