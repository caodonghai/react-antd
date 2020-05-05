import axios from 'axios'
import { message } from 'antd'
const isDev = process.env.NODE_ENV === 'development'//判断是否为生产环境

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/251246' : ''
})



//请求拦截
service.interceptors.request.use((config) => {
    config.data = Object.assign({}, config.data, {
        // authToken: window.localStorage.getItem('authToken')//本地存贮获取token
        authToken: 'fhusfheiuhruehgui'
    })
    // console.log(config)
    return config
})

//响应拦截
service.interceptors.response.use((resp) => {
    if (resp.data.code === 200) {
        return resp.data.data
    } else {
        //全局处理错误
        message.error(resp.data.errMsg)
    }
})

const serviceLogin = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/251246' : ''
})

//响应拦截
serviceLogin.interceptors.response.use((resp) => {
    if (resp.data.code === 200) {
        return resp.data.data
    } else {
        //全局处理错误
        message.error(resp.data.errMsg)
    }
})

//获取文章列表
export const getArticals = (pageSize = 10, pageNumber = 1) => {
    return service.post('/api/v1/articalList', {
        pageNumber,
        pageSize
    })
}

//文章删除
export const deleteArticalItem = (id) => {
    return service.post(`/api/v1/articalDelete${id}`)
}

//通过id获取文章详情
export const getArticalDetail = (id) => {
    return service.post(`/api/v1/artical/${id}`)
}

//通过id修改并提交保存至服务器
export const saveArticalByid = (id, data) => {
    return service.post(`/api/v1/articalUpdate/${id}`, data)
}

//获取文章可视化数据
export const getArticalReaded = () => {
    return service.post('/api/v1/articalReaded')
}

//获取用户消息列表
export const getMessages = () => {
    return service.post('/api/v1/messageList/:id',{})
}

//用户登陆
export const userLogin = (data) => {
    return serviceLogin.post('/api/v1/login', data)
}

//获取地图点位信息
export const getMapMarker = () => {
    return service.post('/api/v1/mapMarker')
}

//获取SwiperOne数据
export const getSwiperOneList = () => {
    return service.post('/api/v1/swiperOne')
}

//获取作品
export const getWorksSHowList = () => {
    return service.post('/api/v1/worksShow')
}
