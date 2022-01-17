const onProfileReducer = (state = false, action) => {
  switch (action.type) {
    case "on-profile":
      state = action.payload
      return state
    default:
      return state
    }
}

export default onProfileReducer