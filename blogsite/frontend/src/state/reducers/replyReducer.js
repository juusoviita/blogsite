const replyReducer = (state = [], action) => {
  switch (action.type) {
    case "post-new-reply":
      const newState = [action.payload, ...state]
      return newState
    case "add-all-replies":
      state = action.payload
      return state
    case "clear-replies":
      state = []
      return state
    default:
      return state
    }
}

export default replyReducer