import React, { Component } from 'react';

import { Button } from 'antd'

const testHOC = (WrappedComponent) => {
    return class HOCComponrnt extends Component {
        render() {
            return (
                <>
                    <WrappedComponent />
                    <div>这是高阶组件</div>
                </>
            )
        }
    }
}


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


@testHOC//装饰器模式写法

class App extends Component {
    render() {
        return (
            <div>
                app
                <Button type="primary">测试按钮</Button>
            </div>
        );
    }
}

export default App;