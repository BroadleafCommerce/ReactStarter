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
import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'
import find from 'lodash/find'

export const getProductForView = createSelector(
    (state, props) => state.product[`${props.match.params.category}/${props.match.params.product}`],
    state => state.entities.products,
    (meta, products) => {
        if (!meta || !meta.id) {
            return { isFetching: true }
        }

        return {
            ...meta,
            ...products[meta.id]
        }
    }
)

export const getConfigureItemRequest = createSelector(
    (state, props) => state.configureItem[props.id],
    (result) => {
        if (!result) {
            return undefined
        }

        return result.configureItemRequest
    },
)

export const isConfiguringItem = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && !!result.configureItemRequest
    }
)

export const isFetchingConfiguration = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && result.isFetchingItem
    }
)
