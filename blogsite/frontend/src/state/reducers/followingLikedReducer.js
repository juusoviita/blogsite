const followingLikedReducer = (state = false, action) => {
  switch (action.type) {
    case "following-liked":
      state = action.payload
      return state
    default:
      return state
    }
}

export default followingLikedReducer