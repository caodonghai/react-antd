import React from 'react'
import './dataDisplay.less'
import { Row, Col } from 'antd';
import  BarCharts  from './components/BarCharts'
import  LineCharts  from './components/LineCharts'
import  PointCharts  from './components/PointCharts'
import  RadarCharts  from './components/RadarCharts'

function DataDisplay() {
    const layout = {
        xs: 24,
        sm: 8
    }
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col {...layout}>
                <div  className='colContener'>
                    <BarCharts />
                </div>
            </Col>
            <Col xs={12} {...layout}>
                <div  className='colContener'>
                    <LineCharts />
                </div>
            </Col>
            <Col xs={12} {...layout}>
                <div  className='colContener'>
                    <PointCharts />
                </div>
            </Col>
            <Col xs={12} {...layout}>
                <div  className='colContener'>
                    <RadarCharts />
                </div>
            </Col>
        </Row>
        </>
    )
}

export default DataDisplay