import React from 'react'
import { render } from 'react-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'

import store from './store'

import { mainRouter } from './routers/Router'

import './index.less'//用于测试less和less-loader

render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" render={(routerProps)=>{
                        //TODO:权限，需要登录才能登录/admin
                        return <App {...routerProps} />
                    }} />
                    {
                        mainRouter.map(route => {
                            return <Route key={route.pathname} path={route.pathname} component={route.components} />
                        })
                    }
                    <Redirect to="/admin" from="/" exact />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
)