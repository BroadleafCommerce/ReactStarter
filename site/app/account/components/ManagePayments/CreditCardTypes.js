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

const CreditCardTypes = () => (
    <div className='row' style={{ marginBottom: 20 }}>
        <div className='col-sm-12'>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className='col-xs-3'><img src='/img/payment/american-express-curved-32px.png'/></li>
                <li className='col-xs-3'><img src='/img/payment/mastercard-curved-32px.png'/></li>
                <li className='col-xs-3'><img src='/img/payment/visa-curved-32px.png'/></li>
                <li className='col-xs-3'><img src='/img/payment/discover-curved-32px.png'/></li>
            </ul>
        </div>
    </div>
)

export default CreditCardTypes
