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
