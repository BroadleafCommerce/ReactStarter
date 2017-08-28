import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchContentItem } from 'content/actions'
import { isAnonymous } from 'auth/selectors'
import { getContentData } from 'content/selectors'
import { isPreviewing, isShowingDeepLinks } from 'preview/selectors'
import DeepLinks from 'content/components/DeepLinks'
import WidgetManager from 'content/service/WidgetManager'

/**
 * This component is responsible for fetching the content data for a content zone,
 * selecting the correct widget, and rendering that widget with the correct props.
 *
 * There is the option of rendering a ContentZone with children function in order
 * to manually specify what to render with the given props. This would look like
 * the following:
 *
 * <ContentZone name='My Content Zone'>
 *     ({ mcs, sc, scs, component }) => (
 *         <div>{sc['someContentKey']}</div>
 *     )
 * </ContentZone>
 *
 * @type {Component}
 */
class ContentZone extends Component {
    static propTypes = {
        anonymous: React.PropTypes.bool,
        isFetching: React.PropTypes.bool,
        fetchContentItem: React.PropTypes.func,
        name: React.PropTypes.string.isRequired,
        component: React.PropTypes.string,
        showDeepLinks: React.PropTypes.bool,
        sc: React.PropTypes.object,
        scs: React.PropTypes.array,
        mcs: React.PropTypes.array,
        children: React.PropTypes.func,
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching && (this.props.anonymous !== nextProps.anonymous || this.props.showDeepLinks !== nextProps.showDeepLinks)) {
            nextProps.fetchContentItem(nextProps.name)
        }
    }

    render() {
        const { children, component, deepLinks, isFetching, mcs, sc, scs, showDeepLinks, ...rest } = this.props

        if (!sc && !scs && !mcs) return (<div>{/*Loading Content Zone*/}</div>)

        const Widget = !!children ? children : WidgetManager.get(component)

        let deepLinksContainer = null
        if (showDeepLinks && !!deepLinks && !!deepLinks.length) {
            deepLinksContainer = <DeepLinks deepLinks={deepLinks}/>
        }

        return (
            <div className='content-zone-container' style={{ position: 'relative' }}>
                {deepLinksContainer}
                <Widget {...rest} component={component} sc={sc} scs={scs} mcs={mcs}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        anonymous: isAnonymous(state),
        showDeepLinks: isShowingDeepLinks(state),
        ...getContentData(state, props),
    }
}

const resolveData = (resolver, { name, fetchContentItem }) => {
    return resolver.resolve(() => fetchContentItem(name))
}

export default connect(mapStateToProps, { fetchContentItem })(resolve(resolveData)(ContentZone))
