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
