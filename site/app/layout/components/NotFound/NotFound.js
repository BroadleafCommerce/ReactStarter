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
import Button from 'material-kit/components/Button'

const NotFound = ({
    history
}) => (
    <div className='page-header header-small header-filter'>
        <div className='container'>
            <div className='text-center text-uppercase'>
                <h1 className='title'>404</h1>
                <h4>Page Not Found</h4>
                <Button className='btn-white' onClick={e => history.go(-1)} sm simple>
                    <i className='material-icons'>keyboard_arrow_left</i> Back to Civilization
                </Button>
            </div>
        </div>
    </div>
)

export default NotFound
