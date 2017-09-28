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
