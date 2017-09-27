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
import Portal from 'react-portal'
import './FormModal.scss'

/*
 * This component is meant to be used in conjunction with redux-form, though
 * it can be used without as long as a handleSubmit function is supplied.
 *
 * let MyFormModal = ({isOpened, handleSubmit}) => {
 *     <FormModal
 *       isOpened={isOpened}
 *       handleSubmit={handleSubmit}>
 *       <Field name='myField' type='text' component='input'/>
 *       <button type='submit'>Submit</button>
 *     </FormModal>
 * }
 *
 * MyFormModal = reduxForm({ form: 'myFormModal'})(MyFormModal)
 *
 * <MyFormModal onSubmit={values => console.log(values)}/>
 */
const FormModal = ({
    children,
    isOpened,
    handleSubmit,
    onClose,
    height,
    width,
}) => (
    <Portal
        closeOnEsc
        onClose={onClose}
        isOpened={isOpened}>
        <div styleName='FormModal' onClick={e => onClose()}>
            <div styleName='FormModal__content' style={{ width, height }} onClick={e => e.stopPropagation() && false}>
                <form
                    styleName='FormModal__content__form'
                    onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        </div>
    </Portal>
)

export default FormModal
