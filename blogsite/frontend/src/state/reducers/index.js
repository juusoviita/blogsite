import { combineReducers } from 'redux'
import authReducer from './authReducer'
import replyReducer from './replyReducer'
import onPageReducer from './onPageReducer'
import indPostReducer from './indPostReducer'

const reducers = combineReducers({
  auth: authReducer,
  replies: replyReducer,
  onpage: onPageReducer,
  indpost: indPostReducer
})

export default reducers