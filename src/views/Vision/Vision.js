import React, { Component } from 'react'
import './vision.less'

import SwiperOne from '../../components/SwiperOne/SwiperOne'
import ImageCard from '../../components/ImageCard/ImageCard'

import { getSwiperOneList, getWorksSHowList } from '../../requests'
//480  836

class Vision extends Component {

    constructor() {
        super()
        this.state = {
            swiperOneList: [],
            worksShowList: [],
        }
    }
    componentDidMount() {
        getSwiperOneList()
            .then(resp => {
                if (!this.updater.isMounted(this)) return//解决路由快速切换时this.setState找不到组件而报错的问题
                this.setState({
                    swiperOneList: resp.list,
                })
            })
        
            
        getWorksSHowList()
            .then(resp => {
                if (!this.updater.isMounted(this)) return//解决路由快速切换时this.setState找不到组件而报错的问题
                this.setState({
                    worksShowList: resp.list
                })
            })
    }
    render() {
        return (
            <div className='HZ_Vision_contener'>
                <SwiperOne swiperOneList = {this.state.swiperOneList} />
                <div className="HZ_display_title">作品展示</div>
                <ImageCard worksShowList={this.state.worksShowList} />
            </div>
        )
    }
}

export default Vision