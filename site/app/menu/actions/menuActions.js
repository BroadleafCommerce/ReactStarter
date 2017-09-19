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
