const indPostReducer = (state = [], action) => {
  switch (action.type) {
    case "add-post":
      state = action.payload
      return state
    case "clear-post":
      state = []
      return state
    case "edit-post":
      console.log(action.payload)
      return state
    default:
      return state
    }
}

export default indPostReducer