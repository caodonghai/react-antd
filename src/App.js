import React, { Component } from 'react';


import { adminRouter } from './routers/Router'
import { Route, Switch, Redirect } from 'react-router-dom';

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


class App extends Component {
    render() {
        return (
            <div>
                这里是公共部分（导航、顶部。。。。）
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
            </div>
        );
    }
}

export default App;