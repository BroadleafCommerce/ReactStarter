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
                <p>Broadleaf Commerce</p>
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
