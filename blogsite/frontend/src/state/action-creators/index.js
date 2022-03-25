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

export const editIndPost = (post) => {
  return (dispatch) => {
    dispatch({
      type: 'edit-post',
      payload: post
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

export const deleteReply = (reply_id) => {
  return (dispatch) => {
    dispatch({
      type: 'delete-reply',
      payload: reply_id
    })
  }
}

export const commentReply = (reply) => {
  return (dispatch) => {
    dispatch({
      type: 'comment-reply',
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


// user page related action creators
export const onProfilePage = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'on-profile',
      payload: data
    })
  }
}

// individual profile action creators
export const addProfile = (user) => {
  return(dispatch) => {
    dispatch({
      type: 'add-profile',
      payload: user
    })
  }
}

export const clearProfile = () => {
  return(dispatch) => {
    dispatch({
      type: 'clear-profile'
    })
  }
}

export const editProfile = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'edit-profile',
      payload: data
    })
  }
}


// All posts
export const addPosts = (posts) => {
  return(dispatch) => {
    dispatch({
      type: 'add-posts',
      payload: posts
    })
  }
}

export const clearPosts = () => {
  return(dispatch) => {
    dispatch({
      type: 'clear-posts'
    })
  }
}

export const addToPosts = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'add-to-posts',
      payload: data
    })
  }
}

export const clearFromPosts = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'clear-from-posts',
      payload: data
    })
  }
}

export const editInPosts = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'edit-in-posts',
      payload: data
    })
  }
}


export const followingLiked = (data) => {
  return(dispatch) => {
    dispatch({
      type: 'following-liked',
      payload: data
    })
  }
}