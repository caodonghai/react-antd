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

const NoPower = Loadable({
    loader: () => import('./NoPower/NoPower'),
    loading: Loading
})

const Register = Loadable({
    loader: () => import('./Register/Register'),
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

const MessageList = Loadable({
    loader: () => import('./Messages/Messages'),
    loading: Loading
})

const IndividualSettings = Loadable({
    loader: () => import('./IndividualSettings/IndividualSettings'),
    loading: Loading
})

const MapMeaaure = Loadable({
    loader: () => import('./MapMeasures/MapMeasures'),
    loading: Loading
})

const Vision = Loadable({
    loader: () => import('./Vision/Vision'),
    loading: Loading
})

const MoveSearch = Loadable({
    loader: () => import('./MoveSearch/MoveSearch'),
    loading: Loading
})

const Music = Loadable({
    loader: () => import('./Music/Music'),
    loading: Loading
})

const ItemManagement = Loadable({
    loader: () => import('./ItemManagement/ItemManagement'),
    loading: Loading
})

const DataDisplay = Loadable({
    loader: () => import('./DataDisplay'),
    loading: Loading
})


export {
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
    DataDisplay
}