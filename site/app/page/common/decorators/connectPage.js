import React, {Component} from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import {connect} from 'react-redux'
import {resolve} from 'core/decorator/reduxResolve'
import {fetchPageByUrl} from 'page/common/actions'
import {getPage} from 'page/common/selectors'
import {fetchSeoProperties} from 'seo/actions'
import {getPageSeoProperties} from 'seo/selectors'

/**
 * Decorator connects page data to this component. This component MUST have a
 * location property with a pathname.
 *
 * Typically this would decorate a Route component:
 *
 * <Route path='/' component={connectPage(Home)}/>
 *
 * @param  {Component} DecoratingComponent Component to be decorated
 * @return {Component}                     the Decorated Component
 */
const connectPage = DecoratingComponent => {

    class DecoratedComponent extends Component {
        static propTypes = {
            pageFields: React.PropTypes.object,
            id: React.PropTypes.number,
            url: React.PropTypes.string,
            location: React.PropTypes.shape({
                pathname: React.PropTypes.string
            })
        }

        componentWillReceiveProps(nextProps) {
            const {location:oldLocation} = this.props
            const {location:newLocation} = nextProps
            if (newLocation.pathname !== oldLocation.pathname) {
                nextProps.fetchPageByUrl(newlocation.pathname)
                nextProps.fetchSeoProperties({ entityType: 'PAGE', entityURI: newLocation.pathname })
            }
        }

        shouldComponentUpdate(nextProps) {
            return !isEqual(this.props.pageFields, nextProps.pageFields)
        }

        render() {
            return <DecoratingComponent {...this.props}/>
        }
    }

    const mapStateToProps = (state, props) => {
        return {
            ...getPage(state, props),
            seoProperties: getPageSeoProperties(state, props)
        }
    }

    const dispatchResolve = (resolver, props) => {
        resolver.resolve(props.fetchPageByUrl, props.location.pathname)
        resolver.resolve(props.fetchSeoProperties, { entityType: 'PAGE', entityURI: props.location.pathname })
    }

    return connect(mapStateToProps, {fetchPageByUrl, fetchSeoProperties})(
        resolve(dispatchResolve)(DecoratedComponent)
    )
}

export default connectPage
