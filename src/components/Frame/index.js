import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import Logo from './logo.png'
import './index.less'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
    onMenuClick = ({key}) => {
        this.props.history.push(key, {})
        // console.log(this.props)
    }
    
    render() {
        return (
            <Layout style={{minHeight: '100%'}}>
                <Header className="header HZ-header">
                    <div className="logo HZ-logo">
                        <img src={Logo} alt="HZXY" title="海子学院" />
                    </div>
                </Header>
                <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        selectedKeys={[this.props.location.pathname]}
                        onClick={this.onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.props.menus.map(item => {
                            return(
                                <Menu.Item
                                key={item.pathname}
                                >
                                    {item.icon}
                                    {item.title}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 8,
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