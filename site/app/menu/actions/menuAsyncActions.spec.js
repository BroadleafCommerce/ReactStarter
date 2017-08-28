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
