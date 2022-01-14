const replyReducer = (state = null, action) => {
  switch (action.type) {
    case "add-all-replies":
      state = action.payload
      return state
    case "clear-replies":
      state = []
      return state
    case "post-new-reply":
      const newState = [action.payload, ...state]
      return newState
    case "delete-reply":
      return state.filter(reply => reply.id !== action.payload.id)
    case "like-reply":
      const likeState = state.map(reply => reply.id === action.payload.id ? {...reply, likes_count: action.payload.likes_count, user_liked: action.payload.user_liked} : reply)
      return likeState
    default:
      return state
    }
}

export default replyReducer