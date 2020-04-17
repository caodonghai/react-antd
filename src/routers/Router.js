import {
    DashBoard,
    Login,
    NotFound,
    Artical,
    Settings,
    ArticalEdit
} from '../views'

export const mainRouter = [{
    pathname: '/login',
    components: Login
}, {
    pathname: '/404',
    components: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    components: DashBoard,
    title: '仪表盘',
    isNav: true
}, {
    pathname: '/admin/artical',
    components: Artical,
    title: '文章管理',
    isNav: true,
    exact: true,
    // children: {
    //     ...//二级菜单
    // }
}, {
    pathname: '/admin/artical/edit/:id',
    components: ArticalEdit,
    title: '文章编辑',
    isNav: true
}, {
    pathname: '/admin/settings',
    components: Settings,
    title: '设置',
    isNav: true
}]