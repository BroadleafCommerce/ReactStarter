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
