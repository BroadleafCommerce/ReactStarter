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
