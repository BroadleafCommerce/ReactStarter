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
import { createFetchAction } from 'core/util/refetch'

export const ThemeActionTypes = {
    GetFields: {
        Request: '@Theme.GetFields.Request',
        Success: '@Theme.GetFields.Success',
        Failure: '@Theme.GetFields.Failure'
    }
}

const fetchThemeFieldsAction = (...fieldNames) => ({
    types: [ ThemeActionTypes.GetFields.Request, ThemeActionTypes.GetFields.Success, ThemeActionTypes.GetFields.Failure ],
    payload: { fieldNames },
    callAPI: () => request.get('/api/theme/fields').query({ fieldNames }),
    transform: response => ({
        fields: response.body,
        receivedAt: Date.now()
    })
})

export const fetchThemeFields = (...fieldNames) => (dispatch, getState) => {
    if (!fieldNames.length) {
        throw new Error('No fields provided to fetchThemeFields');
    }

    const { theme } = getState()

    const missingFieldNames = fieldNames.filter(fieldName => !theme[fieldName])
    if (!missingFieldNames.length) {
        return Promise.resolve({})
    }
    
    return dispatch(fetchThemeFieldsAction(...missingFieldNames))
}
