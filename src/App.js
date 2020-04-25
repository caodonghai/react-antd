import React, { Component } from 'react';

import { adminRouter } from './routers/Router'
import { Route, Switch, Redirect } from 'react-router-dom';

import { Frame } from './components'

import { connect } from 'react-redux'

// const testHOC = (WrappedComponent) => {
//     return class HOCComponrnt extends Component {
//         render() {
//             return (
//                 <>
//                     <WrappedComponent />
//                     <div>这是高阶组件</div>
//                 </>
//             )
//         }
//     }
// }

/* 
 *高阶组件一般写法
*/
// class App extends Component {
//     render() {
//         return (
//             <div>
//                 app
//                 <Button type="primary">测试按钮</Button>
//             </div>
//         );
//     }
// }

// export default testHOC(App);


/* 
 *高阶组件装饰器模式写法
*/
// @testHOC
// class App extends Component {
//     render() {
//         return (
//             <div>
//                 app
//                 <Button type="primary">测试按钮</Button>
//             </div>
//         );
//     }
// }


const menus = adminRouter.filter(route => route.isNav === true );

const mapSrtate = state => {
    return {
        isLogin: state.loginReducer.isLogin
    }
}

@connect(mapSrtate,)
class App extends Component {
    render() {
        return (
            this.props.isLogin
            ?
            <Frame menus={menus}>
                <Switch>
                    {
                        adminRouter.map(route => {
                            return (
                                <Route
                                    exact={route.exact}
                                    key={route.pathname}
                                    path={route.pathname}
                                    render={(reuteprops) => {
                                        return <route.components {...reuteprops} />
                                    }}
                                />
                            )
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from="/admin" exact />
                    <Redirect to="/404" />
                </Switch>
            </Frame>
            :
            <Redirect to='/login' />
        );
    }
}

export default App;