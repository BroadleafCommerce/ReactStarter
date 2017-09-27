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
