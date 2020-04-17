import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import Logo from './logo.png'
import './index.less'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Frame extends Component {
    render() {
        return (
            <Layout>
                <Header className="header HZ-header">
                <div className="logo HZ-logo">
                    <img src={Logo} alt="HZXY" title="海子学院" />
                </div>
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu> */}
                </Header>
                <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.props.menus.map(item => {
                            return(
                                <Menu.Item
                                key="item.pathname"
                                >
                                    {item.title}
                                </Menu.Item>
                            )
                        })}
                        {/* <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
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