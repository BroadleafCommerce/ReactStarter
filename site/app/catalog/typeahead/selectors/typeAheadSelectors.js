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
