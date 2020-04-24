import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Badge  } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, SettingOutlined, WhatsAppOutlined } from '@ant-design/icons'
import Logo from './logo.png'
import './index.less'
import { getMessagesList } from '../../action/messadesActions'

import { connect } from 'react-redux'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const mapState = state => {
    const {
        list,
    } = state.messagesReducers
    return {
        listLength: list.filter(item => !item.type).length
    }
}

@connect(mapState, { getMessagesList })
@withRouter
class Frame extends Component {

    componentDidMount() {
        this.props.getMessagesList()
    }

    onMenuClick = ({key}) => {
        this.props.history.push(key)
    }

    onHeaderMenuClick = ({key}) => {
        this.props.history.push(key)
    }
    
    render() {
        //处理路由跳转后侧边栏高亮效果消失的问题
        const selectedKeys = this.props.location.pathname.split('/');
        selectedKeys.length = 3;
        const menu = (
            <Menu
                onClick={this.onHeaderMenuClick}
            >
                <Menu.Item
                    key='/admin/messageList'
                >
                    <Badge dot={this.props.listLength > 0}>
                        <WhatsAppOutlined />
                        个人通知
                    </Badge>
                </Menu.Item>
                <Menu.Item
                    key='/admin/settings'
                >
                    <SettingOutlined />
                    个人设置
                </Menu.Item>
                <Menu.Item
                    key='/login'
                >
                    <LogoutOutlined />
                    退出登陆
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{minHeight: '100%'}}>
                <Header className="header HZ-header">
                    <div className="logo HZ-logo">
                            <img src={Logo} alt="HZXY" title="海子学院" />
                    </div>
                    <div>
                    <Dropdown overlay={menu}  placement="bottomRight">
                        <div onClick={e => e.preventDefault()} style={{display: 'inline-block'}}>
                            欢迎您：菜徐坤
                        <DownOutlined />
                        </div>
                    </Dropdown>
                        <Badge count={this.props.listLength}>
                            <Avatar size="large" style={{marginLeft: '8px'}} icon={<UserOutlined />} />
                        </Badge>
                    </div>
                </Header>
                <Layout>
                <Sider
                    width={200}
                    className="site-layout-background" 
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        // console.log({broken});
                    }}
                    onCollapse={(collapsed, type) => {
                        // collapsed === false && window.location.reload()
                        // console.log({collapsed}, {type});
                    }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={selectedKeys.join('/')}
                        onClick={this.onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.props.menus.map(item => {
                            return(
                                <Menu.Item
                                    // style={{background: '#'+Math.random().toString(16).slice(2,8)}}
                                    key={item.pathname}
                                >
                                    {item.icon}
                                    {item.title}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px',paddingBottom: 0 }}>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        paddingBottom: 0,
                        margin: 0,
                        height: '100%',
                    }}
                    >
                    { this.props.children }
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Frame;