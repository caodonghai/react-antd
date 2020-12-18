import {
    DashBoard,
    Login,
    Register,
    NotFound,
    Artical,
    Settings,
    ArticalEdit,
    MessageList,
    NoPower,
    IndividualSettings,
    MapMeaaure,
    Vision,
    MoveSearch,
    Music,
    ItemManagement,
    DataDisplay,
    Wordcloud
} from '../views'

import React from 'react';
import {
    DashboardOutlined,
    UnorderedListOutlined,
    EditOutlined,
    SettingOutlined,
    SlackOutlined,
    GlobalOutlined,
    PlayCircleOutlined,
    AudioOutlined,
    BulbOutlined
} from '@ant-design/icons';

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
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/noPower',
    components: NoPower,
    title: '没有权限',
    roles: ['001', '002', '003'],
    icon: '',
    isNav: false
},{
    pathname: '/admin/artical',
    components: Artical,
    title: '文章管理',
    icon: <UnorderedListOutlined />,
    isNav: true,
    exact: true,
    roles: ['001', '002']
    // children: {
    //     ...//二级菜单
    // }
}, {
    pathname: '/admin/artical/edit/:id',
    components: ArticalEdit,
    title: '文章编辑',
    icon: <EditOutlined />,
    isNav: false,
    roles: ['001', '002']
}, {
    pathname: '/admin/mapMeaaure',
    components: MapMeaaure,
    title: '高控天网',
    icon: <SlackOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/vision',
    components: Vision,
    title: '视界',
    icon: <GlobalOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/moveSearch',
    components: MoveSearch,
    title: '影视大全',
    icon: <PlayCircleOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/music',
    components: Music,
    title: '音乐伴娘',
    icon: <AudioOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/itemManagement',
    components: ItemManagement,
    title: '物品管理',
    icon: <BulbOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
},  {
    pathname: '/admin/dataDisplay',
    components: DataDisplay,
    title: 'BizCharts',
    icon: <BulbOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/settings',
    components: Settings,
    title: '设置',
    icon: <SettingOutlined />,
    isNav: true,
    roles: ['001']
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
    icon: <SettingOutlined />,
    isNav: false,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/wordcloud',
    components: Wordcloud,
    title: '词韵',
    icon: <SettingOutlined />,
    isNav: true,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/IndividualSettings',
    components: IndividualSettings,
    title: '个人设置',
    icon: '',
    isNav: true,
    roles: ['001', '002', '003']
},]