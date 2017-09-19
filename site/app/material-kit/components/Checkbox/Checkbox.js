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
import React, { PureComponent } from 'react'

class Checkbox extends PureComponent {
    _onClick = e => {
        this.checkbox.click()
    }

    render() {
        const { checked, children, name, onChange } = this.props
        return (
            <div className='checkbox' style={{ marginTop: 0}}>
                <input type='checkbox' ref={ref => this.checkbox = ref} name={name} onChange={onChange} checked={checked}/>
                <span className='checkbox-material'>
                    <span className='check' onClick={this._onClick}/>
                </span>
                {children}
            </div>
        )
    }
}

export default Checkbox
