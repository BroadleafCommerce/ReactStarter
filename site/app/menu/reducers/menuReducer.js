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
import {connect} from 'react-redux'
import {MenuActionTypes, fetchMenu} from 'menu/actions'

const menuByName = (state = {}, action) => {
    switch(action.type) {
        case MenuActionTypes.Request:
        case MenuActionTypes.Success:
        case MenuActionTypes.Failure:
        return {
            ...state,
            [action.payload.name] : menu(state[action.payload.name], action)
        }
        default:
        return state
    }
}

const menu = (state = {
    isFetching : false,
    menuItems : [],
    lastFetched : undefined,
}, action) => {
    switch(action.type) {
        case MenuActionTypes.Request:
        return {
            ...state,
            isFetching : true,
        }
        case MenuActionTypes.Success:
        return {
            ...state,
            menuItems : action.payload.menuItems,
            isFetching : false,
            lastFetched : action.payload.receivedAt,
        }
        case MenuActionTypes.Failure:
        return {
            ...state,
            isFetching : false,
        }
        default:
        return state
    }
}

export function connectMenu(Component) {
    return connect(({menu}, {menuName}) => {
        return menu[menuName] || {}
    }, {fetchMenu})(Component)
};

export default menuByName
