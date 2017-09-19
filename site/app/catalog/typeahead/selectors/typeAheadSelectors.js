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

const getCurrentSearch = (state, props) => state.typeAhead[props.name] ? state.typeAhead[props.name].currentSearch : undefined
const getPreviousSearch = (state, props) => state.typeAhead[props.name] ? state.typeAhead[props.name].previousSearch : undefined
const getSuggestionsByQuery = (state, props) => state.typeAhead[props.name] ? state.typeAhead[props.name].suggestionsByQuery : undefined
const isFetching = (state, props) => state.typeAhead[props.name] ? state.typeAhead[props.name].isFetching : false

export const getSuggestions = createSelector(
    [ getCurrentSearch, getPreviousSearch, getSuggestionsByQuery, isFetching ],
    (currentSearch, previousSearch, suggestionsByQuery, fetching) => {
        if (!currentSearch && !previousSearch) {
            return []
        }

        if (fetching) {
            if (previousSearch) {
                return suggestionsByQuery[previousSearch]
            } else {
                return {}
            }
        }

        return suggestionsByQuery[currentSearch]
    }
)

export const getKeywords = createSelector(
    getSuggestions,
    suggestions => suggestions.keywords
)

export const getCategories = createSelector(
    getSuggestions,
    suggestions => suggestions.categories
)

export const getProducts = createSelector(
    getSuggestions,
    suggestions => suggestions.products
)
