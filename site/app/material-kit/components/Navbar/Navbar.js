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

class Navbar extends PureComponent {
    state = {
        smallHeader: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll)
    }

    _handleScroll = e => {
        const scrollTop = e.srcElement.body.scrollTop

        if (scrollTop > 100 && !this.state.smallHeader) {
            this.setState({
                smallHeader: true
            })
        } else if (scrollTop < 100 && this.state.smallHeader) {
            this.setState({
                smallHeader: false
            })
        }
    }

    _getClassName = () => {
        const styles = [ 'navbar', 'navbar-default' ]

        // Position
        const { className, top, bottom, fixed } = this.props

        if (fixed) {
            if (top) {
                styles.push('navbar-fixed-top')
            } else if (bottom) {
                styles.push('navbar-fixed-bottom')
            }
        }

        if (className) {
            styles.push(className)
        }

        if (this.state.smallHeader) {
            styles.push('small-header')
        }

        return styles.join(' ')
    }

    render() {
        const { className, children, top, bottom, fixed, ...passthroughProps } = this.props

        return (
            <nav className={this._getClassName()} {...passthroughProps}>
                { children }
            </nav>
        )
    }
}

class Nav extends PureComponent {
    _getClassName = () => {
        const styles = [ 'nav', 'navbar-nav' ]

        const { className, left, right } = this.props

        if (left) {
            styles.push('navbar-left')
        } else if (right) {
            styles.push('navbar-right')
        }

        if (className) {
            styles.push(className)
        }

        return styles.join(' ');
    }

    render() {
        const { className, children, left, right, ...passthroughProps } = this.props
        return (
            <ul className={this._getClassName()} {...passthroughProps}>
                {children}
            </ul>
        )
    }
}

Navbar.Nav = Nav
export default Navbar
