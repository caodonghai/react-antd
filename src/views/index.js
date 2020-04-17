import Loadable from 'react-loadable'

/* 下面注释的是一个简易的loadable的原理 */
// import Loadable from './Myloadable'
import { Loading } from '../components'

// import DashBoard from './DashBoard/DashBoard'
// import Login from './Login/Login'
// import Artical from './Artical'
// import NotFound from './NotFound/NotFound'
// import Settings from './Settings/Settings'
// import ArticalEdit from './Artical/Edit'

/* 
 *使用react-loadable按需加载路由
*/
const DashBoard = Loadable({
    loader: () => import('./DashBoard/DashBoard'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login/Login'),
    loading: Loading
})

const Artical = Loadable({
    loader: () => import('./Artical'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound/NotFound'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings/Settings'),
    loading: Loading
})

const ArticalEdit = Loadable({
    loader: () => import('./Artical/Edit'),
    loading: Loading
})


export {
    DashBoard,
    Login,
    NotFound,
    Artical,
    Settings,
    ArticalEdit
}