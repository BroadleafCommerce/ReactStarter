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
import { ThemeActionTypes } from 'theme/actions'
import reduce from 'lodash/reduce'

const theme = (state = {}, action) => {
    switch(action.type) {
        case ThemeActionTypes.GetFields.Request:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: true,
                    }
                }
            },
            state
        )
        case ThemeActionTypes.GetFields.Success:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: false,
                        lastFetched: action.payload.receivedAt,
                        value: action.payload.fields[fieldName]
                    }
                }
            },
            state
        )
        case ThemeActionTypes.GetFields.Failure:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: false,
                    }
                }
            },
            state
        )
        return
        default:
        return state
    }
}

export default theme
