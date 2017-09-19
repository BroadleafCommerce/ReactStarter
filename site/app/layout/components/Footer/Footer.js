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
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import './Footer.scss'

const Footer = () => (
    <footer className='group row' styleName='Footer'>
        <div className='col-md-4'>
            <nav>
                <ul>
                    <li><Link to='/about_us'><FormattedMessage defaultMessage='About Us' id='footer.aboutUs'/></Link></li>
                    <li><Link to='/contactus'><FormattedMessage defaultMessage='Contact Us' id='footer.contact'/></Link></li>
                    <li><Link to='#'><FormattedMessage defaultMessage='Privacy Policy' id='footer.privacyPolicy'/></Link></li>
                </ul>
            </nav>
        </div>
        <div className='col-md-4'>
            <div styleName='Brand'>
                <p>Powered by&nbsp;</p>
                <img src='/img/broadleaf-seal.png' alt='Broadleaf Commerce' />
                <p>&copy; Copyright 2013</p>
            </div>
        </div>
        <div className='col-md-4'>
            <div styleName='SocialMedia'>
                <a href='https://www.facebook.com/BroadleafCommerce' className='btn btn-simple btn-facebook'>
                    <i className='fa fa-facebook-official'></i>
                </a>
                <a href='https://www.instagram.com/broadleaf_commerce/' className='btn btn-simple btn-instagram'>
                    <i className='fa fa-instagram'></i>
                </a>
                <a href='https://plus.google.com/111305785891011992695/posts' className='btn btn-simple btn-google'>
                    <i className='fa fa-google-plus'></i>
                </a>
                <a href='https://www.linkedin.com/company/broadleaf-commerce' className='btn btn-simple btn-linkedin'>
                    <i className='fa fa-linkedin'></i>
                </a>
                <a href='https://twitter.com/broadleaf' className='btn btn-simple btn-twitter'>
                    <i className='fa fa-twitter'></i>
                </a>
                <a href='https://www.youtube.com/user/broadleafopensource' className='btn btn-simple btn-youtube'>
                    <i className='fa fa-youtube-play'></i>
                </a>
            </div>
        </div>
    </footer>
)

export default Footer
