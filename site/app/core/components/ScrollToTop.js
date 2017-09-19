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
import {withRouter} from 'react-router-dom'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export const withScroll = DecoratingComponent => {

    class ScrollComponent extends Component {
        componentDidMount() {
            window.scrollTo(0, 0)
        }

        render() {
            return <DecoratingComponent {...this.props}/>
        }
    }

    return withRouter(ScrollComponent)
}

export const withScrollOnUpdate = DecoratingComponent => {

    class ScrollComponent extends Component {
        componentDidMount() {
            window.scrollTo(0, 0)
        }
        
        componentDidUpdate(prevProps) {
            if (this.props.location !== prevProps.location) {
                window.scrollTo(0, 0)
            }
        }

        render() {
            return <DecoratingComponent {...this.props}/>
        }
    }

    return withRouter(ScrollComponent)
}

export default withRouter(ScrollToTop)
