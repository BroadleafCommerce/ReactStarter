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
import { NavLink, withRouter } from 'react-router-dom'
import filter from 'lodash/filter'
import queryString from 'query-string'
import Accordion from 'material-kit/components/Accordion'
import Checkbox from 'material-kit/components/Checkbox'
import MultiSelectFacetModal from 'catalog/search/components/MultiSelectFacetModal'
import classNames from 'classnames'
import { format } from 'layout/util/moneyUtils'

export const Facet = ({
    active,
    fieldName,
    label,
    index,
    onFacetSelect,
    onFacetRemove,
    values,
}) => {
    return (
        <Accordion collapsed={!active}>
            <FacetWrapper
                active={active}
                fieldName={fieldName}
                label={label}
                index={index}>
                {values
                    .filter(value => !!value.quantity)
                    .map(value => (
                        <Checkbox
                            key={value.valueKey}
                            checked={value.active}
                            name={`${fieldName}-${value.valueKey}`}
                            onChange={e => {
                                if (e.target.checked) {
                                    onFacetSelect(fieldName, value.valueKey)
                                } else {
                                    onFacetRemove(fieldName, value.valueKey)
                                }
                            }}>
                            {
                                value.value ? (
                                    <small>{`${value.value} (${value.quantity})`}</small>
                                ) : (

                                    <small>
                                        {/*TODO: swap out for global currency later*/}
                                        {format(value.minValue, 'USD')} {value.maxValue ? ' - ' + format(value.maxValue, 'USD') : ' or more'} ({value.quantity})
                                    </small>
                                )
                            }
                        </Checkbox>
                    ))}
            </FacetWrapper>
        </Accordion>
    )
}

export const FacetWrapper = ({ active, children, collapsed, fieldName, label, index, toggle }) => (
    <div key={fieldName} className='panel panel-default filter-panel'>
        <div className='panel-heading' style={{ paddingTop: index === 0 ? '.7em' : undefined }}>
            <a href='#'
                role='button'
                onClick={e => {
                    e.preventDefault()
                    toggle()
                }}
                aria-expanded={!collapsed}>
                <h4 className='panel-title'>
                    {label}
                </h4>
                <i className='material-icons'>keyboard_arrow_down</i>
            </a>
        </div>
        <div className={classNames({
            'panel-collapse': true,
            'collapse in': !collapsed,
            'collapse': collapsed
        })}>
            <div className='panel-body'>
                {children}
            </div>
        </div>
    </div>
)

class FacetContainer extends PureComponent {
    _onFacetSelect = (fieldName, key) => {
        const { location, history } = this.props

        const search = queryString.parse(location.search)

        search.page = undefined

        if (search[fieldName] === undefined) {
            search[fieldName] = [key]
        } else if (!Array.isArray(search[fieldName])) {
            search[fieldName] = [key, search[fieldName]]
        } else {
            search[fieldName] = [key, ...search[fieldName]]
        }

        history.push({
            ...location,
            search : queryString.stringify(search)
        })
    }

    _onFacetRemove = (fieldName, key) => {
        const { location, history } = this.props

        const search = queryString.parse(location.search)

        search.page = undefined

        if (!Array.isArray(search[fieldName])) {
            search[fieldName] = undefined
        } else {
            search[fieldName] = search[fieldName].filter(value => value !== key)
        }

        history.push({
            ...location,
            search : queryString.stringify(search)
        })
    }

    render() {
        return (
            <Facet
                onFacetSelect={this._onFacetSelect}
                onFacetRemove={this._onFacetRemove}
                {...this.props}/>
        )
    }
}

export default withRouter(FacetContainer)
