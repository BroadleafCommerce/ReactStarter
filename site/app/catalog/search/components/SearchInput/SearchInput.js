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
