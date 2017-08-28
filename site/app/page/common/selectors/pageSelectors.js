import { createSelector } from 'reselect'

export const getPage = createSelector(
    state => state.page,
    (_, props) => props.location.pathname,
    (page, pathname) => {
        if (!page[pathname]) {
            return {}
        }

        return page[pathname]
    }
)
