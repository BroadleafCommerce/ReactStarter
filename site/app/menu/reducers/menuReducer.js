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
