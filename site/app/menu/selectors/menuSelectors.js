import { createSelector } from 'reselect'

export const getMenu = createSelector(
    (state, props) => state.menu[props.menuName],
    (menu) => {
        return menu || {}
    }
)
