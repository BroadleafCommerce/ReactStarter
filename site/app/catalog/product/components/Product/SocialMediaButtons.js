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
