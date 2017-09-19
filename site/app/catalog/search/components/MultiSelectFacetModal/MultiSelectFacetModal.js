/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
