import React, {Component} from 'react'

// Figure out how to handle dynamic height
class Image extends Component {
    render() {
        const { placeholder: Placeholder, ...rest } = this.props
        return (
            <div {...rest} style={{position: 'relative'}}>
                <img {...rest}
                    ref={ref => this.image = ref}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                    }}/>
                <Placeholder
                    {...rest}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}/>
            </div>
        )
    }
}

export default Image
