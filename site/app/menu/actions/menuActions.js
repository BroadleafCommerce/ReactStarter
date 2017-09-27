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
import request from 'core/util/superagent'

export const MenuActionTypes = {
    Request : '@Menu.Request',
    Success : '@Menu.Success',
    Failure : '@Menu.Failure',
}

function getMenu(name) {
    return request.get(`/api/menu`)
        .query({
            name,
        })
}

const CACHE_TIME = 1000*60*15 // 15 minutes

function shouldFetchMenu({menu}) {
    if (!menu) {
        return true
    }

    if (menu.isFetching) {
        return false
    }

    if (!menu.lastFetched) {
        return true
    }

    const time = Date.now()

    return (time - menu.lastFetched > CACHE_TIME)
}

export function fetchMenu(name) {
    return (dispatch, getState) => {
        if (!shouldFetchMenu(getState())) {
            return undefined
        }

        return dispatch({
            types : [MenuActionTypes.Request, MenuActionTypes.Success, MenuActionTypes.Failure],
            payload : {name},
            options : { includeAuthentication: true },
            callAPI : () => getMenu(name),
            transform: response => {
                if (response.body) {
                    return {
                        menuItems : response.body,
                        receivedAt : Date.now(),
                    }
                }
            }
        })
    }
}
