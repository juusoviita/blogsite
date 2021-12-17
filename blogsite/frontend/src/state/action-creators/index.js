// auth-related actionCreators
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


// replies-related actionCreators
export const addAllReplies = (replies) => {
  return (dispatch) => {
    dispatch({
      type: 'add-all-replies',
      payload: replies
    })
  }
}

export const postNewReply = (reply) => {
  return (dispatch) => {
    dispatch({
      type: 'post-new-reply',
      payload: reply
    })
  }
}

export const clearAllReplies = () => {
  return (dispatch) => {
    dispatch({
      type: 'clear-replies'
    })
  }
}