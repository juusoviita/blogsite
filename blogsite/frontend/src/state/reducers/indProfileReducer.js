const indProfileReducer = (state = [], action) => {
  switch (action.type) {
    case "add-profile":
      state = action.payload
      return state
    case "clear-profile":
      state = []
      return state
    case "edit-profile":
      state = action.payload
      return state
    default:
      return state
    }
}

export default indProfileReducer