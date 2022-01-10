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

// on individual post page or not
export const onPostPage = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'on-page',
      payload: data
    })
  }
}

// post on individual page
export const addPost = (post) => {
  return (dispatch) => {
    dispatch({
      type: 'add-post',
      payload: post
    })
  }
}

export const clearPost = () => {
  return (dispatch) => {
    dispatch({
      type: 'clear-post',
    })
  }
}

export const editPost = (edit) => {
  return (dispatch) => {
    dispatch({
      type: 'edit-post',
      payload: edit
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

export const clearAllReplies = () => {
  return (dispatch) => {
    dispatch({
      type: 'clear-replies'
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

export const deleteReply = (reply) => {
  return (dispatch) => {
    dispatch({
      type: 'delete-reply',
      payload: reply
    })
  }
}

export const likeReply = (reply) => {
  return (dispatch) => {
    dispatch({
      type: 'like-reply',
      payload: reply
    })
  }
}