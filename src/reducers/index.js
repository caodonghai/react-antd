import { combineReducers } from 'redux'
import messagesReducers from './messages-reducer'
import loginReducer from './login-reducer'

export default combineReducers({
    messagesReducers,
    loginReducer
})