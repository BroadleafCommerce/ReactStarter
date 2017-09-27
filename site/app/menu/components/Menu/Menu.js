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
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { NavLink } from 'react-router-dom'
import Navbar from 'material-kit/components/Navbar'
import { fetchMenu } from 'menu/actions'
import { getMenu } from 'menu/selectors'
import isEmpty from 'lodash/isEmpty'
import './Menu.scss'

const Menu = ({
    menuItems
}) => (
    <div className='collapse main-menu-wrapper' styleName='MenuWrapper'>
        <Navbar.Nav className='main-menu' styleName='Menu'>
            {menuItems.map(menuItem => {

                if (isEmpty(menuItem.submenu)) {
                    return (
                        <li key={menuItem.label}>
                            <NavLink styleName='Menu__link' to={getMenuItemUrl(menuItem.url)}>
                                {menuItem.label}
                            </NavLink>
                        </li>
                    )
                }

                if (menuItem.categoryId) {
                    return (
                        <li key={menuItem.label} className='dropdown'>
                            <NavLink styleName='Menu__link' to={getMenuItemUrl(menuItem.url)}>
                                {menuItem.label}
                            </NavLink>
                            <ul className='dropdown-menu dropdown-with-icons'>
                                {menuItem.submenu.map(submenuItem => (
                                    <li key={submenuItem.label}>
                                        <NavLink styleName='Menu__link' to={getMenuItemUrl(submenuItem.url)}>{submenuItem.label}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                }

                return (<NavMegaMenu key={menuItem.label} menuItem={menuItem}/>)
            })}
        </Navbar.Nav>
    </div>
)

const NavMegaMenu = ({
    menuItem
}) => {
    const numSections = menuItem.submenu.length
    return (
        <li className='dropdown' styleName='NavMegaDropdown'>
            <NavLink styleName='Menu__link' to={getMenuItemUrl(menuItem.url)}>
                {menuItem.label}
            </NavLink>
            <ul className='dropdown-menu row' styleName='NavMegaMenu'>
                {menuItem.submenu.map(submenu => {

                    if (submenu.categoryId) {
                        return (
                            <li key={submenu.label} className={'col-sm-' + (12 / numSections)}>
                                <ul>
                                    <li styleName='Menu__title'>
                                        <NavLink styleName='Menu__link' to={getMenuItemUrl(submenu.url)}>{submenu.label}</NavLink>
                                    </li>
                                    {submenu.submenu.map(submenuItem => (
                                        <li key={submenuItem.label}>
                                            <NavLink styleName='Menu__link' to={getMenuItemUrl(submenuItem.url)}>{submenuItem.label}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )
                    }

                    return (
                        <li key={submenu.label} className={'col-sm-' + (12 / numSections)}>
                            <ul>
                                <li className='menu-title'>{submenu.label}</li>
                                {submenu.submenu.map(subSubMenu => (
                                    <li key={subSubMenu.label}>
                                        <NavLink styleName='Menu__link' to={getMenuItemUrl(subSubMenu.url)}>{subSubMenu.label}</NavLink>
                                        <ul>
                                            {subSubMenu.submenu.map(subSubMenuItem => (
                                                <li key={subSubMenuItem.label}>
                                                    <NavLink styleName='Menu__link' to={getMenuItemUrl(subSubMenuItem.url)}>{subSubMenuItem.label}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

const getMenuItemUrl = url => url !== '/' ? `/browse${url}` : '/'

class MenuContainer extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFetching && this.props.menuName !== nextProps.menuName) {
            nextProps.fetchMenu(nextProps.menuName)
        }
    }

    render() {
        if (isEmpty(this.props.menuItems)) {
            return false
        }

        return <Menu {...this.props}/>
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchMenu, props.menuName)
    }
}

export default connect(getMenu, { fetchMenu })(resolve(dispatchResolve)(MenuContainer))
