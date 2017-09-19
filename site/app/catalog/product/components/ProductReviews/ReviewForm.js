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
import React from 'react'
import { Field, Form, reduxForm } from 'redux-form'
import Button from 'material-kit/components/Button'
import classNames from 'classnames'
import range from 'lodash/range'

const validators = {
    mustSelectRating: value => value ? undefined : 'You must select a rating',
    required: value => value ? undefined : 'Required'
}

const ReviewForm = ({ handleSubmit }) => (
    <div>
        <h4 className='title'>Share Your Opinion</h4>
        <Form id='new-rating-form' onSubmit={handleSubmit}>
            <Field component={StarRatingField} name='ratingDetail.rating' validate={validators.mustSelectRating} />
            <Field component={TextAreaField} label='Review' name='reviewText' rows={4} validate={validators.required}/>
            <Button primary type='submit'>
                Submit Review
            </Button>
        </Form>
    </div>
)

const StarRatingField = ({
    input, label, meta: { active, touched, error }
}) => (
    <div className='rate-product input-group'>
        <label className='control-label'>Rating {touched && error && (<span className='text-danger'>&nbsp;{error}</span>)}</label>
        <div>
            {range(1, 6).map(value => (
                <span key={value}>
                    <input {...input} className='star-radio' id={`rating-${value}`} type='radio' value={value}/>
                    <label htmlFor={`rating-${value}`}>
                        <i className='material-icons'>{value > input.value ? 'star_border' : 'star'}</i>
                    </label>
                </span>
            ))}

        </div>
    </div>
)

const TextAreaField = ({
    input, label, meta: { active, touched, error }, rows
}) => (
    <div className={classNames({
            'form-group label-floating': true,
            'is-empty': !input.value,
            'is-focused': active,
            'has-error': touched && error
        })}>
        <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
        <textarea
            className='form-control'
            rows={rows}
            {...input}></textarea>
    </div>
)

export default reduxForm({ form: 'ReviewForm' })(ReviewForm)
