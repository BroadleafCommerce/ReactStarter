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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBreadcrumbs } from 'catalog/breadcrumbs/actions'
import { getBreadcrumbs } from 'catalog/breadcrumbs/selectors'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import './Breadcrumbs.scss'

class Breadcrumbs extends PureComponent {
    static propTypes = {
        breadcrumbs: PropTypes.array,
        entityURI: PropTypes.string,
        entityType: PropTypes.string
    }

    componentDidMount() {
        const { entityURI, entityType } = this.props
        this.props.fetchBreadcrumbs({ entityURI, entityType })
    }

    componentWillReceiveProps(nextProps) {
        const { entityURI, entityType } = nextProps
        const { entityURI: oldEntityURI } = this.props
        if (oldEntityURI !== entityURI) {
            nextProps.fetchBreadcrumbs({ entityURI, entityType })
        }
    }

    render() {
        const { breadcrumbs } = this.props
        return (
            <div styleName='Breadcrumbs'>
                <FormattedMessage id='home.home'>
                    {formattedMessage => (
                        <Link to='/'>{formattedMessage}</Link>
                    )}
                </FormattedMessage>

                {breadcrumbs.map(breadcrumb => (
                    <span key={breadcrumb.text}>
                        &nbsp;/&nbsp;<Link to={breadcrumb.link}>{breadcrumb.text}</Link>
                    </span>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        breadcrumbs: getBreadcrumbs(state, props)
    }
}

export default connect(mapStateToProps, { fetchBreadcrumbs })(Breadcrumbs)
