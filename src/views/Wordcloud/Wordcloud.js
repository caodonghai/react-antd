import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import 'echarts-wordcloud'
import { getWordcloud } from '../../requests'

class Wordcloud extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(prop){
        super(prop)
        this.state={

        }
        this.kpiRef = createRef()
    }

    componentDidMount() {
        this.kpiEcharts = echarts.init(this.kpiRef.current);
        this.kpiEcharts.on('click', (params) => {
            this.props.onCkick(params.data)
        });
        let _this = this
        window.addEventListener("resize",function (){
            _this.kpiEcharts.resize();
        });
        this.setState({
            keyWordsList: this.props.keyWordsList
        })
        this.getData()
    }

    getData() {
        getWordcloud().then(resp => {
            if(resp && resp.list){
                this.initChartOption(resp.list)
            }
        })
    }


    initChartOption(dataList) {
        // var maskImage = new Image();//可以根据图片形状生成有形状的词云图
        // maskImage.src=require('@/static/jpg/5.jpg')
        let option = {
            backgroundColor: '#F7F7F7',
            tooltip: {
                trigger: 'item',
                axisPointer: {
                type: 'none'
                },
                position: "top",
                formatter: function({name, value}) {
                return `${name}:${value.toFixed(2)}`
                }
            },
            series: [{
                name: '搜索指数',
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                right: null,
                bottom: null,
                type: 'wordCloud',
                size: ['9%', '99%'],
                sizeRange: [10, 100],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                // gridSize: 10,
                
                // shape: 'triangle',
                // maskImage: maskImage,
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#FF6A00'
                    }
                },
                data: dataList
            }]
        };
        // this.kpiEcharts.setOption(option, true);
        let _this = this
        // maskImage.onload = function() {
            _this.kpiEcharts.setOption(option, true);
        // };
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}} ref={this.kpiRef}>
                
            </div>
        )
    }
}

export default Wordcloud