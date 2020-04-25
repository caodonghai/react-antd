import React, { Component, createRef } from 'react';
import './dashboard.less'
import { getArticalReaded } from '../../requests'
import echarts from 'echarts'
import {
    Card,
    Col,
    Row,
} from 'antd'

window.onresize = () => {
    window.location.reload()
}

class DashBoard extends Component {
    constructor() {
        super()
        this.state = {
            isSpin: false,
            dashBoardDate: [
                {
                    color: '#921AFF',
                    name: '李白',
                }, {
                    color: '#66B3FF',
                    name: '韩信',
                }, {
                    color: '#FF5809',
                    name: '云中君',
                }, {
                    color: '#5CADAD',
                    name: '孙悟空',
                }
            ],
            appCurrentIndex: -1,
        }
        this.readedRef = createRef()
    }
    componentDidMount() {
        this.getData();
        this.timeOuter = setInterval(() => {
            this.getData();
            this.changeDashboardData();
        }, 3000);
        this.myChart = echarts.init(this.readedRef.current);
    }
    UNSAFE_componentWillMount() {
        clearInterval(this.timeOuter)
    }

    changeDashboardData = () => {
        const otherDashBoardDate = this.state.dashBoardDate;
        otherDashBoardDate.unshift(otherDashBoardDate.pop());
        this.setState({
            dashBoardDate: otherDashBoardDate
        })
    }

    getData = () => {
        this.setState({
            isSpin: true,
        })
        getArticalReaded()
            .then(resp => {
                if (resp.list.length > 0) {
                    const dataSource = {
                        legendData: Object.keys(resp.list[0]),
                        xAxisDatas: resp.list.map(item => item.name),
                        seriesData: [resp.list.map(item => item.amount), resp.list.map(item => item.contribution)],
                    }
                    const app = {}
                    app.config = {
                        rotate: 90,
                        align: 'left',
                        verticalAlign: 'middle',
                        position: 'insideBottom',
                        distance: 15,
                        onChange: function () {
                            var labelOption = {
                                normal: {
                                    rotate: app.config.rotate,
                                    align: app.config.align,
                                    verticalAlign: app.config.verticalAlign,
                                    position: app.config.position,
                                    distance: app.config.distance
                                }
                            };
                            this.myChart.setOption({
                                series: [{
                                    label: labelOption
                                }, {
                                    label: labelOption
                                }]
                            });
                        }
                    };
                    const optionColor = []
                    for (let i = 1; i < 5; i++) {
                        optionColor.push('#'+Math.random().toString(16).slice(2,8))
                    }
                    const labelOption = {
                        show: true,
                        position: app.config.position,
                        distance: app.config.distance,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        rotate: app.config.rotate,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    };
                    const option = {
                        color: optionColor,//['#4cabce', '#e5323e'],
                        animationDuration: 5000,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        areaStyle: {},
                        grid: {
                            top: '8%',
                            left: '0%',
                            right: '0%',
                            bottom: '0%',
                            containLabel: true
                        },
                        legend: {
                            data: dataSource.legendData.slice(1,3),//[ 'Desert', 'Wetland']
                        },
                        toolbox: {
                        
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {show: false},
                                data: dataSource.xAxisDatas//['2012', '2013', '2014', '2015', '2016']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: dataSource.legendData[1],
                                type: 'bar',
                                label: labelOption,
                                data: dataSource.seriesData[0],//[150, 232, 201, 154, 190],
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 50,
                                    },
                                },
                            },
                            {
                                name: dataSource.legendData[2],//'Wetland',
                                type: 'bar',
                                label: labelOption,
                                data: dataSource.seriesData[1],//[98, 77, 101, 99, 40],
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 50,
                                    },
                                },
                            }
                        ],
                    };

                    this.myChart.setOption(option);
                    
                    const dataLen = option.series[0].data.length;
                    // 取消之前高亮的图形
                    this.myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: this.state.appCurrentIndex
                    });
                    // this.setState({
                    //     appCurrentIndex: (this.state.appCurrentIndex + 1) % dataLen
                    // })
                    this.setState(state => {
                        return {
                            appCurrentIndex: (state.appCurrentIndex + 1) % dataLen
                        }
                    })
                    // 高亮当前图形
                    this.myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: this.state.appCurrentIndex,
                    });
                    // 显示 tooltip
                    this.myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: this.state.appCurrentIndex
                    });
                }
            })
            .finally(res => {
                this.setState({
                    isSpin: false,
                })
            })
    }

    render() {
        const dashBoardMap = this.state.dashBoardDate.map(item => {
            return (
                <Col key={item.color} className="gutter-col" span={6}>
                    <div className="gutter-row" style={{background: item.color}} >{item.name}</div>
                </Col>
            )
        })
        return (
            <Card style={{minHeight: '100%',padding: '0px',margin: 0}} bodyStyle={{minHeight: '100%',padding: '0px',margin: 0}}>
                <Card
                    title='概览'
                    bordered={false}
                >
                    <Row gutter={32}>{dashBoardMap}</Row>
                </Card>
                <Card
                    title='最新浏览量'
                    bordered={false}
                    style={{minHeight: '100%',height: '100%'}}
                    bodyStyle={{minHeight: '100%',height: '100%'}}
                >
                    <div style={{height: '470px'}} ref={this.readedRef} />
                </Card>
            </Card>
        );
    }
}

export default DashBoard;