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
