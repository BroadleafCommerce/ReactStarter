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
    MenuActionTypes,
    fetchMenu,
} from 'menu/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import middleware from 'core/middleware'
import {expect} from 'chai'
import nock from 'nock'
import omit from 'lodash/omit'

const mockStore = configureMockStore([...middleware, thunk])

describe('Menu async actions', () => {

    afterEach(() => nock.cleanAll())

    process.env.API_HOST = 'http://127.0.0.1'
    process.env.API_CONTEXT_PATH = '/api/'

    it('creates @Menu.Success when fetching a menu', () => {
        const name = 'Header Nav'
        const menuItems = [
            {
                label : 'Item',
                url : '/item'
            }
        ]

        nock('http://127.0.0.1')
            .get('/api/menu?name=' + encodeURIComponent(name))
            .reply(200, menuItems)

        const store = mockStore({menu : {}})

        const expectedActions = [
            {
                type : MenuActionTypes.Request,
                payload : {
                    name,
                }
            },
            {
                type : MenuActionTypes.Success,
                payload : {
                    name,
                    menuItems,
                }
            }
        ]

        return store.dispatch(fetchMenu(name))
            .then(() => {
                expect(
                    store.getActions()
                        .map(action => omit(action, 'payload.receivedAt'))
                ).to.deep.equal(expectedActions)
            })
    })
})
