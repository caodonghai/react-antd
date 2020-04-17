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
    components: DashBoard
}, {
    pathname: '/admin/settings',
    components: Settings
}, {
    pathname: '/admin/artical',
    components: Artical,
    exact: true
}, {
    pathname: '/admin/artical/edit/:id',
    components: ArticalEdit
}]