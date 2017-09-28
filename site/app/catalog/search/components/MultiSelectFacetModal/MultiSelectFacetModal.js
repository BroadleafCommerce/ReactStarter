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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Field, FieldGroup } from 'layout/components/Field'
import FormModal from 'layout/components/FormModal'
import { format } from 'layout/util/moneyUtils'
import './MultiSelectFacetModal.scss'

class MultiSelectFacetModal extends Component {
    getFacetDisplayValue = value => {
        if (value.value) {
            return value.value
        }
        return format(value.minValue) + (!!value.maxValue ? ' to ' + format(value.maxValue) : ' or more')
    }

    render() {
        const { facet: { fieldName, label, values }, isOpened, handleSubmit, onClose } = this.props
        return (
            <FormModal
                isOpened={isOpened}
                onClose={onClose}
                handleSubmit={handleSubmit}>
                <div styleName='MultiSelectFacetModal'>
                    <h2 styleName='MultiSelectFacetModal__header'>
                        Select {label}
                    </h2>
                    {values.filter(value => value.quantity > 0).map(value => (
                        <FieldGroup key={value.valueKey}>
                            <Field type='checkbox' name={value.value || `range${value.minValue}`} label={`${this.getFacetDisplayValue(value)} (${value.quantity})`}/>
                        </FieldGroup>
                    ))}
                    <button
                        styleName='MultiSelectFacetModal__submit'
                        type='submit'>
                        Select
                    </button>
                </div>
            </FormModal>
        )
    }
}

MultiSelectFacetModal = reduxForm({
    form: 'MultiSelectFacetModal',
})(MultiSelectFacetModal)

const mapFacetValuesToInitialValues = values => {
    let initialValues = {}
    values.forEach(value => {
        if (value.value) {
            initialValues[value.value] = value.active
        } else {
            initialValues[`range${value.minValue}`] = value.active
        }
    })
    return initialValues
}

const mapStateToProps = (state, props) => {
    return {
        initialValues: mapFacetValuesToInitialValues(props.facet.values)
    }
}

export default connect(mapStateToProps)(MultiSelectFacetModal)
