import { combineReducers } from 'redux'
import authReducer from './authReducer'
import replyReducer from './replyReducer'

const reducers = combineReducers({
  auth: authReducer,
  replies: replyReducer
})

export default reducers