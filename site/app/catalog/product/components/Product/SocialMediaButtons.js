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

const SocialMediaButtons = () => (
    <div className='text-center-mobile'>
        <div className='product-social-media'>
            <span className='share-label'><span>Share</span>:</span>
            <Button simple xs className='btn-facebook'>
                <i className='fa fa-facebook-square'></i>
            </Button>
            <Button simple xs className='btn-instagram'>
                <i className='fa fa-instagram'></i>
            </Button>
            <Button simple xs className='btn-google'>
                <i className='fa fa-google-plus-square'></i>
            </Button>
            <Button simple xs className='btn-pinterest'>
                <i className='fa fa-pinterest-square'></i>
            </Button>
            <Button simple xs className='btn-twitter'>
                <i className='fa fa-twitter-square'></i>
            </Button>
        </div>
    </div>
)

export default SocialMediaButtons
