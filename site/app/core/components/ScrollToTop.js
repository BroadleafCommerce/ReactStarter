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
