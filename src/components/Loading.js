import React, { Component } from 'react';
import LoadingSvg from '../../src/static/svg/loading.svg'

class loading extends Component {
    render() {
        return (
            <>
                <div style={{width:  '100%',height: '100%',backgroundColor:'#FFF0F5',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img style={{width:'10%'}} src={LoadingSvg} alt='loading...' />
                </div>
            </>
        );
    }
}

export default loading;