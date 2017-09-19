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
