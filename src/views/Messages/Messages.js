import React, { Component } from 'react';
import './messages.less'
import { 
    Card,
    Button,
    // message,
    List,
    Avatar,
    Skeleton,
    Badge,
    Spin,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { changeMessagesType, changeAllMessagesType } from '../../action/messadesActions'

// import { getMessages } from '../../requests'

const mapState = state => {
    const {
        list,
        isLoading
    } = state.messagesReducers
    return {
        list,
        isLoading
    }
}

// const count = 10;//每次请求的数据

@connect(mapState,{ changeMessagesType, changeAllMessagesType })
class Messages extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         initLoading: true,
    //         loading: false,
    //         data: [],
    //         list: [],
    //       };
    // }
    componentDidMount () {
        // this.getData();
    }

    // getData = () => {
    //     getMessages()
    //         .then(resp => {
    //             this.setState({
    //                 initLoading: false,
    //                 data: resp.list,
    //                 list: resp.list,
    //             });
    //         })
    // };

    // onLoadMore = () => {
    //     this.setState({
    //       loading: true,
    //       list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    //     });
    //     getMessages()
    //         .then(resp => {
    //             const data = this.state.data.concat(resp.list);
    //             this.setState(
    //                 {
    //                 data,
    //                 list: data,
    //                 loading: false,
    //                 },
    //                 () => {
    //                 window.dispatchEvent(new Event('resize'));
    //                 },
    //             );
    //         })
    //   };

    // readedAll = () => {
    //     message.success('全部已读')
    // }
    render() {
        // const { initLoading, loading, list } = this.state;
        // const loadMore =
        // !loading ? (
        //     <div
        //     style={{
        //         textAlign: 'center',
        //         marginTop: 12,
        //         height: 32,
        //         lineHeight: '32px',
        //     }}
        //     >
        //     <Button onClick={this.onLoadMore}>加载更多 ···</Button>
        //     </div>
        // ) : null;
        return (
            <Spin spinning={this.props.isLoading} >
                <Card
                    title='消息通知'
                    extra={
                        <Button disabled={this.props.list.every(item => item.type )}
                            onClick={this.props.changeAllMessagesType.bind(this)}
                            type="primary" shape="round"
                            icon={<CheckCircleOutlined />}
                        > 全部标为已读 </Button>
                    }
                >
                    <List
                        className="demo-loadmore-list"
                        // loading={initLoading}
                        itemLayout="horizontal"
                        // loadMore={loadMore}
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={
                                    [item.type !== 1 && <span onClick={this.props.changeMessagesType.bind(this, item.id)} key={item.id}>标为已读</span>, <span key={item.id}>详细信息</span>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                    <Avatar
                                        style={{
                                            backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16),
                                            verticalAlign: 'middle',
                                        }}
                                        size="large"
                                        >
                                        {item.from}
                                    </Avatar>
                                    }
                                    title={<span style={{color: '#'+Math.floor(Math.random()*16777215).toString(16),fontSize:'1.05rem'}} ><Badge dot={!item.type}>{item.title}</Badge></span>}
                                    description={item.content}
                                />
                                <div style={{color: '#'+Math.floor(Math.random()*16777215).toString(16)}} >{item.type === 1 ? '已读' : '未读'}</div>
                                </Skeleton>
                            </List.Item>
                            )}
                        />
                </Card>
            </Spin>
        );
    }
}

export default Messages;