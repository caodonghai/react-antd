import React, { Component } from 'react'
import Swiper from 'swiper'
import './swiperOne.less'

function SwiperOneItems(props) {
    const SwiperOneItem = props.swiperOneList
    const SwiperOnes = SwiperOneItem.map((item,index) => 
        <div  key={index} className="swiper-slide">
            <img style={{width: '100%', height: '100%'}} key={index} src={item.imgSrc} alt={item.title} />
        </div>
    )
    return (
        <>
            {SwiperOnes}
        </>
    )
  }

export default class SwperOne extends Component {
    componentDidMount() {
    }
    
    componentDidUpdate() {
        this.initSwiper()

    }
    initSwiper = () => {
        let _this = this
        _this.mySwiper = new Swiper (_this.refs.myswiper, {
            autoplay: true,//可选选项，自动滑动
            effect: 'coverflow',
            slidesPerView: 2,
            centeredSlides: true,
            centeredSlidesBounds:true,
            coverflow: {
                rotate: 0,
                stretch: 100,
                depth: 300,
                modifier: 2,
                slideShadows : true
            },
            loop: true,//无缝轮播

            pagination: {//小圆点分页
                el: '.swiper-pagination',
            },
            navigation: {//左右分页
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {//下划线分页
                el: '.swiper-scrollbar',
            },
        }) 
    }

    render() {
        return (
            <div>
                <div className="swiper-container" ref='myswiper'>
                    <div className="swiper-wrapper">
                        <SwiperOneItems swiperOneList={this.props.swiperOneList} />
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div>
                    {/* <div className="swiper-scrollbar"></div> */}
                </div>
            </div>
        )
    }
}
