const initialState = []

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add-posts":
      state = action.payload
      return state
    case "clear-posts":
      state = initialState
      return state
    case "add-to-posts":
      const newState = [action.payload, ...state]
      return newState
    case "clear-from-posts":
      return state.filter(post => post.id !== action.payload)
    case "edit-in-posts":
      const editState = state.map(post => post.id === action.payload.id ? {...post, replies_count: action.payload.replies_count, likes_count: action.payload.likes_count, user_liked: action.payload.user_liked} : post)
      return editState
    default:
      return state
    }
}

export default authReducer