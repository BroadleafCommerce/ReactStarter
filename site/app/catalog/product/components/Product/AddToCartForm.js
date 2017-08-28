import React from 'react'
import { reduxForm } from 'redux-form'

const AddToCartForm = reduxForm({ form: 'product', enableReinitialize: true })(({ handleSubmit, children }) => (
    <form onSubmit={handleSubmit}>
        {children({ handleSubmit })}
    </form>
))

export default AddToCartForm
