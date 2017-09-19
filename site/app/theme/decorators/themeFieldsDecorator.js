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
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchThemeFields } from 'theme/actions'
import { getThemeFields } from 'theme/selectors'

/**
 * This decorator is used to inject theme fields into a component. This handles
 * the fetching and caching of the theme fields in the redux state, as well as
 * selecting those theme fields from the redux state.
 *
 * This can be used by wrapping a component like so:
 *
 * export default ThemeFields('logoImage')(HeaderLogo);
 *
 * HeaderLogo will now have a prop named `logoImage` that it can use.
 *
 * @param {Array} fieldNames the field names to inject
 */
const ThemeFields = (...fieldNames) => DecoratingComponent => {
    class DecoratedComponent extends PureComponent {
        render() {
            return (<DecoratingComponent {...this.props}/>)
        }
    }

    const mapStateToProps = (state, props) => {
        return getThemeFields(state, { fieldNames })
    }

    const dispatchResolve = (resolver, props) => {
        resolver.resolve(props.fetchThemeFields, ...fieldNames)
    }

    return connect(mapStateToProps, { fetchThemeFields })(resolve(dispatchResolve)(DecoratedComponent))
}

export default ThemeFields
