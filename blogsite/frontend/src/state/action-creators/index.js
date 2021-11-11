export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: user
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "logout",
    })
  }
}

export const updateTokens = (tokens) => {
  return (dispatch) => {
    dispatch({
      type: 'update-tokens',
      payload: tokens
    })
  }
}

export const updateLoading = (loading) => {
  return (dispatch) => {
    dispatch({
      type: 'update-loading',
      payload: loading
    })
  }
}