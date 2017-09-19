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
