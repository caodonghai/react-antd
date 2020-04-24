import actionType from './actionType'
import { getMessages } from '../requests'

const startIsMessageLoading = () => {
    return {
        type: actionType.START_CHANGE_MESSADE_LOADING
    }
}

const finishIsMessageLoading = () => {
    return {
        type: actionType.FINISH_CHANGE_MESSADE_LOADING
    }
}

const changeMessagesType = (id) => {
    return dispatch => {
        dispatch(startIsMessageLoading())
        //这里是模拟一个服务端的请求
        setTimeout(() => {
            dispatch({
                type: actionType.CHANGE_MESSAGES_TYPE,
                payload: {
                    id
                }
            })
        dispatch(finishIsMessageLoading())
        }, 500)
    }
}

const changeAllMessagesType = () => {
    return dispatch => {
        dispatch(startIsMessageLoading())
        //这里是模拟一个服务端的请求
        setTimeout(() => {
            dispatch({
                type: actionType.CHANGE_ALL_MESSAGES_TYPE,
                // payload: {}
            })
            dispatch(finishIsMessageLoading())
        }, 500)
    }
}

const getMessagesList = () => {
    return dispatch => {
        dispatch(startIsMessageLoading())
        getMessages()
            .then(resp => {
                dispatch({
                    type: actionType.RECIVERD_MESSAGES,
                    payload: {
                        list: resp.list
                    }
                })
                dispatch(finishIsMessageLoading())
            })
    }
}

export { changeMessagesType, changeAllMessagesType, getMessagesList }