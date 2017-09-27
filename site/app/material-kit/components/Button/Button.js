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
import Ink from 'react-ink'

class Button extends PureComponent {
    _getClassName = () => {
        const styles = []

        const { className } = this.props
        if (className) {
            styles.push(className)
        }

        styles.push('btn')

        // Color
        const { danger, info, primary, success, warning } = this.props

        if (primary) {
            styles.push('btn-primary')
        } else if (danger) {
            styles.push('btn-danger')
        } else if (success) {
            styles.push('btn-success')
        } else if (warning) {
            styles.push('btn-warning')
        } else if (info) {
            styles.push('btn-info')
        } else {
            styles.push('btn-default')
        }

        // Size
        const { lg, sm, xs } = this.props

        if (lg) {
            styles.push('btn-lg')
        } else if (sm) {
            styles.push('btn-sm')
        } else if (xs) {
            styles.push('btn-xs')
        }

        // Style
        const { fab, bordered, icon, round, simple } = this.props

        if (bordered) {
            styles.push('btn-bordered')
        }

        if (fab) {
            styles.push('btn-fab')
            styles.push('btn-fab-mini')
        }

        if (icon) {
            styles.push('btn-just-icon')
        }

        if (round) {
            styles.push('btn-round')
        }

        if (simple) {
            styles.push('btn-simple')
        }

        return styles.join(' ')
    }

    render() {
        const { children, component:ButtonComponent = 'button', disabled, onClick, type = 'button', componentProps } = this.props

        const props = {
            ...componentProps,
            className: this._getClassName(),
            type,
            disabled,
            onClick
        }

        return (
            <ButtonComponent {...props}>
                { children }
                { !disabled && <Ink duration={500} opacity={0.05} radius={140}/> }
            </ButtonComponent>
        )
    }
}

export default Button
