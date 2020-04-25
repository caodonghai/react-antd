import actionType from './actionType'
import { userLogin } from '../requests'

import {
    message
} from 'antd'

const startUserLogin = () => {
    return {
        type: actionType.START_USRT_LOGIN
    }
}

const successUserLogin = (userInfo) => {
    return {
        type: actionType.SUCCESS_USRT_LOGIN,
        payload:{
            userLoginInfo:userInfo
        }
    }
}

const failedUserLogin = () => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    return {
        type: actionType.FAILED_USRT_LOGIN
    }
}

const logOut = () => {
    return dispatch => {
        //实际要告诉服务端这里用户已经退出登陆
        dispatch(failedUserLogin())
    }
}

const login = (data) => {
    return dispatch => {
        dispatch(startUserLogin())
        userLogin(data)
            .then(resp => {
                if (resp.status === 200) {
                    message.success('登陆成功...')
                    // dispatch({
                    //     type: actionType.SUCCESS_USRT_LOGIN,
                    //     payload: {
                    //         userLoginInfo: resp.data
                    //     }
                    // })
                    dispatch(successUserLogin(resp.data))
                    if (data.isRemember) {
                        window.localStorage.setItem('userDetail', JSON.stringify(resp.data))
                    } else {
                        window.sessionStorage.setItem('userDetail', JSON.stringify(resp.data))
                    }
                } else {
                    dispatch(failedUserLogin())
                }
            })
            .finally(res => {
                console.log(res)
            })
    }
}


export {login, logOut}