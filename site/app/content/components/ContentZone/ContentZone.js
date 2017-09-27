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
import PropTypes from 'prop-types';

import React, { Component } from 'react';
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
        anonymous: PropTypes.bool,
        isFetching: PropTypes.bool,
        fetchContentItem: PropTypes.func,
        name: PropTypes.string.isRequired,
        component: PropTypes.string,
        showDeepLinks: PropTypes.bool,
        sc: PropTypes.object,
        scs: PropTypes.array,
        mcs: PropTypes.array,
        children: PropTypes.func,
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
