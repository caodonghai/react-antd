import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Badge, Affix } from 'antd';
import { DownOutlined, LogoutOutlined, SettingOutlined, WhatsAppOutlined } from '@ant-design/icons'
import Logo from './logo.png'
import './index.less'
import { getMessagesList } from '../../action/messadesActions'
import { logOut } from '../../action/loginActions'

import { connect } from 'react-redux'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const mapState = state => {
    const {
        list,
    } = state.messagesReducers
    return {
        listLength: list.filter(item => !item.type).length,
        loginReducer: state.loginReducer
    }
}

@connect(mapState, { getMessagesList, logOut })
@withRouter
class Frame extends Component {

    componentDidMount () {
        this.props.getMessagesList()
    }

    onMenuClick = ({key}) => {
        this.props.history.push(key)
    }

    onHeaderMenuClick = ({key}) => {
        if (key === '/login') {
            this.props.logOut()
            window.localStorage.clear()
            window.sessionStorage.clear()
        } else {
           this.props.history.push(key) 
        }
    }
    
    render() {
        // console.log(this.props)
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
                    key='/admin/IndividualSettings'
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
                <Affix>
                    <Header className="header HZ-header">
                        <div className="logo HZ-logo">
                                <img src={Logo} alt="HZXY" title="海子学院" />
                        </div>
                        <div>
                        <Dropdown overlay={menu}  placement="bottomRight">
                            <div onClick={e => e.preventDefault()} style={{display: 'inline-block'}}>
                                欢迎您：{this.props.loginReducer.uaerName}
                            <DownOutlined />
                            </div>
                        </Dropdown>
                            <Badge count={this.props.listLength}>
                                <Avatar size="large" style={{marginLeft: '8px'}} src={this.props.loginReducer.avatar} />
                            </Badge>
                        </div>
                    </Header>
                </Affix>
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