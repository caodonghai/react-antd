import actionType from '../action/actionType'

const isLogin = Boolean(window.localStorage.getItem('userDetail')) || Boolean(window.sessionStorage.getItem('userDetail'))
const userDetail = JSON.parse(window.localStorage.getItem('userDetail')) || JSON.parse(window.sessionStorage.getItem('userDetail'))

const initData = {
    ...userDetail,
    isLogin,
    isLoginLoading: false,
}


export default (state = initData, action) => {
    switch (action.type) {
        case actionType.START_USRT_LOGIN:
            return {
                ...state,
                isLoginLoading: true
            }
        case actionType.SUCCESS_USRT_LOGIN:
        return {
            ...state,
            ...action.payload.userLoginInfo,
            isLoginLoading: false,
            isLogin: true
        }
        case actionType.FAILED_USRT_LOGIN:
            return {
                // ...state,//因为状态一开始就已经存起来了，所以不能这样写
                id: '',
                userName: '',
                avatoar: '',
                nikeName: '',
                isLoginLoading: false,
                isLogin: false,
                role: ''
            }
        default:
            return state
    }
}