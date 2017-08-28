import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import HeaderLogo from 'layout/components/HeaderLogo'
import HeaderControls from 'layout/components/HeaderControls'
import HeaderSearchInput from './HeaderSearchInput'
import './Header.scss'

export const Header = ({
    className,
}) => (
    <header className={className}>
        <div className='col-md-10 col-md-offset-1' styleName='Header'>

            <div styleName='Header__left'>
                <HeaderSearchInput />
            </div>

            <HeaderLogo styleName='Header__logo'/>

            <div styleName='Header__right'>
                <HeaderControls/>
            </div>
        </div>
    </header>
)

export default Header
