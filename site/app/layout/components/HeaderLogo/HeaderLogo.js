import React from 'react'
import {NavLink} from 'react-router-dom'
import './HeaderLogo.scss'

export const HeaderLogo = ({
    className,
    logoImage
}) => (
    <div className={className} styleName='HeaderLogo'>
        <NavLink styleName='HeaderLogo__link' className='navbar-brand' to="/">
            <img styleName='HeaderLogo__image' src={'/img/the-heat-clinic-logo-internal.png'}/>
        </NavLink>
    </div>
)

export default HeaderLogo
