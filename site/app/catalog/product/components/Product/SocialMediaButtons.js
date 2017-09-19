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
