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
