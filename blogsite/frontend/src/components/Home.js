import { useState, useEffect } from 'react'
import Posts from './Posts'
import ProfilePage from './ProfilePage'
import AddForm from './AddForm'
import Sidebar from './Sidebar'
import pic from './images/coffeeshop.jpg'
import { TailSpin } from 'react-loading-icons'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const Home = () => {

  const [showAddPost, setShowAddPost] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState()
  
  const auth = useSelector((state) => state.auth)
  const onpage = useSelector((state) => state.onpage)
  const indpost = useSelector((state) => state.indpost)
  const onprofile = useSelector((state) => state.onprofile)
  const posts = useSelector((state) => state.posts)
  const followingliked = useSelector((state) => state.followingliked)
  const dispatch = useDispatch()

  const { logoutUser, clearPost, onPostPage, editIndPost, likeReply, commentReply, deleteReply, onProfilePage, clearProfile, addPosts, clearPosts, addToPosts, clearFromPosts, editInPosts, followingLiked } = bindActionCreators(actionCreators, dispatch)

  // fetch all posts, if on the Home page
  useEffect(() => {
    if (auth.isAuthenticated && !onprofile && !onpage && !followingliked) {
      setIsLoading(true)
      const fetchPosts = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/post-list/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + auth.access_token
          }
        })
        const data = await res.json()
        if(res.status === 200) {
          // check whether the logged in user has liked the post or not
          data.forEach(post => {
            post.user_liked = false
            post.likes_count = post.likes.length
            post.replies_count = post.replies.length
            if (post.likes.length > 0) {
              for (let i = 0; i < post.likes.length; i++) {
                if (post.likes[i].liker === auth.user.pk) {
                  post.user_liked = true
                  break
                }
              }
            }
          })
          setIsLoading(false)
          addPosts(data)
        } else {
          logoutUser()
        }
      }
      fetchPosts()
      console.log('This runs!')
    } else {
      
      // if not authenticated, add the date information to the front page
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const date = new Date()
      let day = date.getDate()
      let month = months[date.getMonth()]
      let year = date.getFullYear()

      setCurrentDate(`${day} ${month} ${year}`)
    }
  }, [(!onprofile && !onpage && !followingliked)])

  // clears the posts if user is on a profile or a post page
  useEffect(() => {
    clearPosts()
  }, [(onprofile || onpage || followingliked)])

  // fetch individual post
  const fetchPost = async (id) => {
    var url = `http://localhost:8000/api/post-detail/${id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      }
    })
    const data = await res.json()
    data.likes_count = data.likes.length
    data.replies_count = data.replies.length
    
    data.user_liked = false
    
    if (data.likes.length > 0) {
      for (let i = 0; i < data.likes.length; i++) {
        if (data.likes[i].liker === auth.user.pk) {
          data.user_liked = true
          break
        }
      }
    }
    return data
  }

  // add a new post or edit an existing one
  const addPost = async (post) => {
    setShowAddPost(false)
    const poster = auth.user.pk

    const newPost = {
      poster: poster,
      content: post.content,
      last_updated: null,
      replies_to: null,
      replies: [],
      likes: []
    }

    const url = 'http://127.0.0.1:8000/api/create-post/'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      },
      body:JSON.stringify(newPost) 
    })

    const data = await res.json()
    
    if(res.status === 200) {
      addToPosts(data)
    } else {
      logoutUser()
    }
  }

  // like/unlike a post depending on which one has been done before by the user 
  const likePost = async (id, user_liked, e) => {
    e.stopPropagation()

    const liker = auth.user.pk
    
    const likePost = {
      liker: liker, 
      post: id
    }
   
    // if user hasn't already liked the post, like it
    if (user_liked) {
      var url = `http://localhost:8000/api/unlike-post/`
      var method = 'DELETE'
    } else {
      var url = `http://localhost:8000/api/like-post/`
      var method = 'POST'
    }
    
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      },
      body:JSON.stringify(likePost)
    })

    const postLiked = await fetchPost(id)
    postLiked.user_liked = !user_liked

    // if post is included in the posts state, update the post
    if (postLiked.replies_to === null) {
      editInPosts(postLiked)
    }

    // if post in individual post page, update accordingly
    if (onpage === true && indpost.id === postLiked.id) {
      editIndPost(postLiked)
    } else if (onpage === true && indpost.id !== postLiked.id) {
      likeReply(postLiked)
    } else {
      postLiked.user_liked = !user_liked
      return postLiked 
    }
  }


  // reply to a post
  const replyPost = async (reply) => {

    const poster = auth.user.pk

    const newReply = {
      poster: poster,
      content: reply.reply,
      last_updated: null,
      replies_to: reply.post_id,
      replies: [],
      likes: []
    }

    const url = 'http://127.0.0.1:8000/api/create-post/'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      },
      body:JSON.stringify(newReply) 
    })

    const data = await res.json()

    const postReplied = await fetchPost(reply.post_id)

    if(res.status === 200) {
      editInPosts(postReplied)

      if (onpage === true && indpost.id === postReplied.id) {
        editIndPost(postReplied)
      } else if (onpage === true && indpost.id !== postReplied.id) {
        commentReply(postReplied)
      }
      return data
    } else {
      logoutUser()
    }
  }

  // delete a post
  const deletePost = async (id, e) => {
    
    e.stopPropagation()

    const url = `http://localhost:8000/api/delete-post/${id}`

    fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      },
    })

    if (!onpage) {
      clearFromPosts(id)
    } else if (onpage && id === indpost.id) {
      onPostPage(false)
      clearPost()
      clearFromPosts(id)
    } else if (onpage && id !== indpost.id) {
      deleteReply(id)
      const postToState = await fetchPost(indpost.id)
      editIndPost(postToState)
      editInPosts(postToState)
    }
  }

  
  // edit a post
  const editPost = (id, e) => {
    e.stopPropagation()
    setShowAddPost(true)
  }


  // show or hide addPost form
  const showAddForm = () => {
    if (showAddPost) {
      setShowAddPost(false)
    } else {
      setShowAddPost(true)
    }
  }

  return (
    <>
      { auth.isAuthenticated ?
        <div className='container home'>
          <div className="row">
              <div className="col-md-3">
                <Sidebar onAdd={showAddForm} showAdd={showAddPost} />
              </div>
              <div className="col-md">
                { showAddPost && <AddForm onAdd={addPost} showAdd={showAddForm} /> }
                { onprofile ?
                  <ProfilePage likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
                  :
                  isLoading ? 
                    <>
                      <div className='row justify-content-center'>
                        <TailSpin stroke="#ff8d73" strokeWidth={2} />
                        <p style={{color: "whitesmoke", textAlign: "center", marginTop: "15px"}}>Loading...</p>
                      </div>
                    </>
                    :
                    <Posts posts={posts} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
                }
              </div>
          </div>
        </div>
        :
        <div className='container-fluid'> 
          <div className="row align-items-center">
            <div className="col-md-6">
                <img src={pic} alt="People in a cafe" className="cover-pic" />
            </div>
            <div className="col-md-6 landing-text">
              <h2>Zero insurrections caused as of</h2>
              <h2>{currentDate}.</h2>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Home;