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
