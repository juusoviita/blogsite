import { combineReducers } from 'redux'
import authReducer from './authReducer'
import replyReducer from './replyReducer'
import onPageReducer from './onPageReducer'
import indPostReducer from './indPostReducer'
import onProfileReducer from './onProfileReducer'
import indProfileReducer from './indProfileReducer'
import postsReducer from './postsReducer'
import followingLikedReducer from './followingLikedReducer'

const reducers = combineReducers({
  auth: authReducer,
  replies: replyReducer,
  onpage: onPageReducer,
  indpost: indPostReducer,
  onprofile: onProfileReducer,
  indprofile: indProfileReducer,
  posts: postsReducer,
  followingliked: followingLikedReducer
})

export default reducers