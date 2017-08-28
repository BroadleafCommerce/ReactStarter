import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import './SuggestionDropdown.scss'

const CategorySuggestion = ({
    active,
    count,
    suggestion,
    url,
    onSubmitSuggestion
}) => (
    <li styleName='Suggestion'>
        <NavLink
            styleName={active ? 'Suggestion__link--active' : 'Suggestion__link'}
            className={classNames({
                'btn': true,
                'btn-primary': true,
                'btn-simple': !active
            })}
            onClick={e => {
                e.preventDefault()
                onSubmitSuggestion(url)
                return false
            }}
            to={`/browse${url}`}>
            {suggestion} ({count})
        </NavLink>
    </li>
)

export default CategorySuggestion
