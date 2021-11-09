export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: user
    })
  }
}

export const logoutUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "logout",
      payload: user
    })
  }
}