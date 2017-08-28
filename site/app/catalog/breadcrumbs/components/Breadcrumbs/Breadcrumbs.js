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
