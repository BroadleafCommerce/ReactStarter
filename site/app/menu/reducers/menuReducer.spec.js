import {
    MenuActionTypes
} from 'menu/actions'
import reducer from 'menu/reducers'
import {expect} from 'chai'

const createMenuRequest = (name) => ({
    type : MenuActionTypes.Request,
    payload : {name}
})

const createMenuSuccess = (name, menuItems, receivedAt) => ({
    type : MenuActionTypes.Success,
    payload : {name, menuItems, receivedAt}
})

const createMenuFailure = (name) => ({
    type : MenuActionTypes.Failure,
    payload : {name}
})

describe('menu reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal({})
    })

    it('should handle a request', () => {
        expect(
            reducer({}, createMenuRequest("Header Nav"))
        ).to.deep.equal({
            'Header Nav' : {
                isFetching : true,
                menuItems : [],
                lastFetched : undefined,
            }
        })
    })

    it('should handle a request and then success', () => {
        const menuItems = [{
            label : 'Item',
            url : '/item'
        }]

        const receivedAt = Date.now()

        expect(
            reducer(
                reducer({}, createMenuRequest("Header Nav")),
                createMenuSuccess("Header Nav", menuItems, receivedAt)
            )
        ).to.deep.equal({
            'Header Nav' : {
                isFetching : false,
                lastFetched : receivedAt,
                menuItems,
            }
        })
    })

    it('should handle a request and then failure', () => {
        expect(
            reducer(
                reducer({}, createMenuRequest("Header Nav")),
                createMenuFailure("Header Nav")
            )
        ).to.deep.equal({
            'Header Nav' : {
                isFetching : false,
                lastFetched : undefined,
                menuItems : []
            }
        })
    })
})
