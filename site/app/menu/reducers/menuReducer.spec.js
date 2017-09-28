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
