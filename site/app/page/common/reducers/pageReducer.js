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
import {PageActionTypes} from 'page/common/actions'

const pageByUrl = (state = {}, action) => {
    switch(action.type) {
        case PageActionTypes.Get.Request:
        case PageActionTypes.Get.Success:
        case PageActionTypes.Get.Failure:
        return {
            ...state,
            [action.payload.url] : page(state[action.payload.url], action)
        }
        default:
        return state
    }
}

const page = (state = {
    isFetching: false,
    lastFetched: undefined,
    pageFields: {}
}, action) => {
    switch(action.type) {
        case PageActionTypes.Get.Request:
        return {
            ...state,
            isFetching: true,
        }
        case PageActionTypes.Get.Success:
        return {
            ...state,
            ...action.payload.page,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
        }
        case PageActionTypes.Get.Failure:
        return {
            ...state,
            isFetching: false,
        }
        default:
        return state
    }
}

export default pageByUrl
