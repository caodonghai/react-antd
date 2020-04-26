//自己实现路由懒加载组件

import React, { Component } from 'react';

const Loadable = ({//是一个高阶组件
    loader,
    loading: Loading
}) => {
    return class Myloadable extends Component {
        state = {
            LoadedComponent: null
        }

        componentDidMount () {
            //以下语句相当于执行：import('./dashboard')
            loader()
                .then(resp => {
                    this.setState({
                        LoadedComponent: resp.default,
                    })
                    // console.log(resp.default)
                })
        }

        render() {
        const { LoadedComponent } = this.state;
            return (
                LoadedComponent
                ?
                <LoadedComponent />
                :
                <Loading />
            );
        }
    }
}

export default Loadable;