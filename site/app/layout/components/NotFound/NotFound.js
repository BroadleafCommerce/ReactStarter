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
