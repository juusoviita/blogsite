const onPageReducer = (state = false, action) => {
  switch (action.type) {
    case "on-page":
      state = action.payload
      return state
    default:
      return state
    }
}

export default onPageReducer