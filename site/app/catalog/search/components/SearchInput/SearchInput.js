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
import React from 'react'
import classNames from 'classnames'
import Button from 'material-kit/components/Button'

const SearchInput = ({
    focused,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onSubmit,
    value,
}) => (
    <div className={classNames({
        'form-group': true,
        'is-empty': !value,
        'is-focused': focused,
    })}>
        <div className='input-group'>
            <input
                className='form-control'
                autoComplete='off'
                type="text"
                name="search"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}/>
            <span className='input-group-btn'>
                <Button
                    primary
                    simple
                    round
                    type="button"
                    onClick={onSubmit}>
                    <i className='material-icons'>search</i>
                </Button>
            </span>
        </div>
    </div>
)

export default SearchInput
