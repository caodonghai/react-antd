import React, { Component } from 'react'
import './imageCard.less'


import { 
    Card,
    Row,
    Col,
 } from 'antd'


function ImageCardItem(props) {
    return (
        <Col span={6}>
            <Card
                hoverable
                cover={<img alt="example" src={require('../../static/jpg/1.jpg')} />}
            >
                <Card.Meta title={props.item.title} description={props.item.desc} />
            </Card>
        </Col>
    )
}


export default class ImageCard extends Component {

    componentDidMount() {
    }

    render() {
        const worksShowList = this.props.worksShowList
        const worksShowListitems = worksShowList.map((item, index) => <ImageCardItem item={item} key={index} />)
        return (
            <div className="site-card-wrapper">
                <Row gutter={[24, 24]}>
                    {worksShowListitems}
                </Row>
            </div>
        )
    }
}
