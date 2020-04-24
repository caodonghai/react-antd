import React, { Component } from 'react';
import NotFoundSvg from '../../static/svg/404.svg'

class NotFound extends Component {
    render() {
        return (
            <>
                <div style={{width:  '100%',height: '100%',backgroundColor:'#FFF0F5',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img style={{width:'20%'}} src={NotFoundSvg} alt='notfound...' />
                </div>
            </>
        );
    }
}

export default NotFound;