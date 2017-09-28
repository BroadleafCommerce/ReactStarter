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
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import find from 'lodash/find'
import queryString from 'query-string'
import { isPreviewing, getCurrentSandbox } from 'preview/selectors'
import { fetchSandboxes, changeSandboxDate, clearSandbox, selectSandbox, toggleDeepLinks, toggleSearchScore } from 'preview/actions'
import Color from 'color'
import './SandboxRibbon.scss'

const SandboxRibbon = ({
    availableSandboxes = [],
    changeSandboxDate,
    children,
    clearSandbox,
    isEnabled,
    handleLogout,
    history,
    location,
    sandbox,
    sandboxDateTime,
    selectSandbox,
    showDeepLinks = true,
    showSearchScore = false,
    toggleDeepLinks,
    toggleSearchScore,
}) => {

    if (!isEnabled || !sandbox) {
        return null
    }

    const backgroundColor = !!sandbox && Color(sandbox.color)
    const textColor = !!sandbox && (backgroundColor.luminosity() > .7 ? Color('#000000') : Color('#FFFFFF'))

    return (
        <div styleName='SandboxRibbonContainer'>
            <div styleName='SandboxRibbon' style={{ backgroundColor: backgroundColor.hex(), color: `${textColor.hex()}` }}>
                <div styleName='SandboxRibbon__name'>
                    {sandbox.name}
                </div>
                <div styleName='SandboxRibbon__menu'>
                    <div styleName='SandboxRibbon__menu__title'>Preview Options</div>
                    <div styleName='SandboxRibbon__menu__items' style={{ backgroundColor: backgroundColor.hex() }}>
                        <div>
                            <Link to='#' styleName='SandboxRibbon__menu__items__link'>View in Admin</Link>
                        </div>
                        <div>
                            <input type='checkbox' checked={showDeepLinks} onChange={e => toggleDeepLinks()}/> View Deep Links
                        </div>
                        <div>
                            <input type='checkbox' checked={showSearchScore} onChange={e => toggleSearchScore()}/> Show Search Score
                        </div>
                    </div>
                </div>
                <div styleName='SandboxRibbon__menu'>
                    <div styleName='SandboxRibbon__menu__title'>Select Sandbox</div>
                    <div styleName='SandboxRibbon__menu__items' style={{ backgroundColor: backgroundColor.hex() }}>
                        {availableSandboxes.map(availableSandbox => (
                            <div key={availableSandbox.id}>
                                <a
                                    onClick={e => {
                                        e.preventDefault()
                                        selectSandbox(availableSandbox.id)
                                        history.go(0)
                                    }}
                                    href='#'
                                    styleName={`SandboxRibbon__menu__items__link${sandbox === availableSandbox ? '--active' : ''}`}>
                                    {availableSandbox.name}
                                </a>
                            </div>
                        ))}
                        <div>
                            <a  href='#'
                                onClick={e => {
                                    e.preventDefault()
                                    clearSandbox()
                                    history.go(0)
                                }}
                                styleName='SandboxRibbon__menu__items__link'>
                                Clear Sandbox
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Viewing:&nbsp; */}
                    {/* TODO: reimplement since this brings in bulky momentjs
                        <DateTime
                        styleName='SandboxRibbon__DateTime'
                        dateFormat='M/D/Y'
                        timeFormat='HH:mm'
                        defaultValue={sandboxDateTime || Date.now()}
                        onBlur={onChangeSandboxDateTime}/> */}
                </div>
            </div>
            <div styleName='SandboxRibbonBorder' style={{ boxShadowColor: `inset 0 0 10px ${backgroundColor.hex()}` }}/>
        </div>
    )
}

const mapStateToProps = state => {
    const { availableSandboxes, showDeepLinks, showSearchScore } = state.preview

    return {
        availableSandboxes,
        isEnabled: isPreviewing(state),
        sandbox: getCurrentSandbox(state),
        sandboxDateTime: state.preview.sandboxDateTime,
        showDeepLinks,
        showSearchScore,
    }
}

const resolveData = (resolver, props) => {
    if (props.isEnabled) {
        return resolver.resolve(() => props.fetchSandboxes())
    }
}

export default withRouter(connect(mapStateToProps, { changeSandboxDate, clearSandbox, fetchSandboxes, selectSandbox, toggleDeepLinks, toggleSearchScore })(resolve(resolveData)(SandboxRibbon)))
