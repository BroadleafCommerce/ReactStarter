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
