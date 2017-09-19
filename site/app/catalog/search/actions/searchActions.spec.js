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
