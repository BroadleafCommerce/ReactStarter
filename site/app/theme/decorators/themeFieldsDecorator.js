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
