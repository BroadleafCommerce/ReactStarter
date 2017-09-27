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
import React, { Component } from 'react'
import classNames from 'classnames'
import './ColorField.scss'

class ColorField extends Component {

    _renderColor = optionValue => {
        const { input: { value, onChange } } = this.props
        const { attributeValue } = optionValue
        const active = value === attributeValue

        return (
            <a  key={attributeValue}
                href='#'
                onClick={e => {
                    e.preventDefault()
                    onChange(attributeValue)
                }}
                ref='tooltip'
                styleName={`ColorField__option${active ? '--active' : ''}`}
                style={{
                    borderColor: active ? attributeValue.toLowerCase() : 'none'
                }}>
                <div styleName='ColorField__option__inner' style={{ background: attributeValue.toLowerCase() }}>{attributeValue}</div>
            </a>
        )
    }

    render() {
        const { allowedValue, label, meta: { touched, error } } = this.props

        return (
            <div styleName='ColorField'>
                {allowedValue.map(this._renderColor)}
                {touched && error && (<span className='text-danger text-right'>{error}</span>)}
            </div>
        )
    }
}

export default ColorField
