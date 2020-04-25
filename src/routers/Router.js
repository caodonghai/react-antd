import {
    DashBoard,
    Login,
    Register,
    NotFound,
    Artical,
    Settings,
    ArticalEdit,
    MessageList
} from '../views'

import React from 'react';
import { DashboardOutlined, UnorderedListOutlined, EditOutlined,SettingOutlined } from '@ant-design/icons';

export const mainRouter = [{
    pathname: '/login',
    components: Login
}, {
    pathname: '/Register',
    components: Register,
    title: '注册',
    icon: '',
    isNav: false
}, {
    pathname: '/404',
    components: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    components: DashBoard,
    title: '仪表盘',
    icon: <DashboardOutlined />,
    isNav: true
}, {
    pathname: '/admin/artical',
    components: Artical,
    title: '文章管理',
    icon: <UnorderedListOutlined />,
    isNav: true,
    exact: true,
    // children: {
    //     ...//二级菜单
    // }
}, {
    pathname: '/admin/artical/edit/:id',
    components: ArticalEdit,
    title: '文章编辑',
    icon: <EditOutlined />,
    isNav: false
}, {
    pathname: '/admin/settings',
    components: Settings,
    title: '设置',
    icon: <SettingOutlined />,
    isNav: true
// }, {
//     pathname: '/alibaba/home',
//     components: Settings,
//     title: '阿里招聘首页 ',
//     icon: <SettingOutlined />,
//     isNav: true
}, {
    pathname: '/admin/messageList',
    components: MessageList,
    title: '消息列表',
    icon: '',
    isNav: false
}, ]