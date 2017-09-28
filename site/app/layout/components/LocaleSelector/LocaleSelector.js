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
import { setLocale } from 'layout/actions'
import { withToggleControls } from 'material-kit/components/Accordion'
import classNames from 'classnames'
import find from 'lodash/find'

class LocaleSelector extends PureComponent {
    static defaultLocales = [
        { altText: 'United States', imageSrc: '/img/flags/United-States.png', localeCode: 'en-US', title: 'English' },
        { altText: 'United Kingdom', imageSrc: '/img/flags/United-Kingdom.png', localeCode: 'en-GB', title: 'English (UK)' },
        { altText: 'Mexico', imageSrc: '/img/flags/Mexico.png', localeCode: 'es-MX', title: 'Spanish (Mexico)' },
        { altText: 'Spain', imageSrc: '/img/flags/Spain.png', localeCode: 'es-ES', title: 'Spanish (Spain)' },
        { altText: 'France', imageSrc: '/img/flags/France.png', localeCode: 'fr-FR', title: 'French (France)' }
    ]

    render() {
        const { collapsed, localeCode, setLocale, toggle } = this.props
        const currentLocaleSelection = find(LocaleSelector.defaultLocales, { localeCode })

        return (
            <li className={classNames({
                'dropdown languages': true,
                'open': !collapsed,
            })}>
                <a href="#" className='dropdown-toggle' onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    <img alt={currentLocaleSelection.altText} src={currentLocaleSelection.imageSrc} title={currentLocaleSelection.title}/>
                </a>
                <ul className='dropdown-menu'>
                    {LocaleSelector.defaultLocales.map(({ altText, imageSrc, localeCode, title }) => (
                        <li key={localeCode}>
                            <a href='#' onClick={e => {
                                e.preventDefault()
                                setLocale(localeCode)
                            }}>
                                <img alt={altText} id={localeCode} src={imageSrc} title={title}/> {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        localeCode: state.locale.localeCode
    }
}

export default connect(mapStateToProps, { setLocale })(withToggleControls(LocaleSelector))
