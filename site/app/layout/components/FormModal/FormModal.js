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
