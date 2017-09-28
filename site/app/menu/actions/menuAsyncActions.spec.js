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
