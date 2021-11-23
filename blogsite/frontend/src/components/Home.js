import { useState, useEffect } from 'react'
import Posts from './Posts'
import AddForm from './AddForm'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const Home = () => {

  const [showAddPost, setShowAddPost] = useState(false)
  const [posts, setPosts] = useState([])
  
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)
  
  // Fetch all posts
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated', true)) {
      const fetchPosts = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/post-list/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          }
        })
        const data = await res.json()
        if(res.status === 200) {

          // check whether the logged in user has liked the post or not
          data.forEach(post => {
            post.user_liked = false
            post.likes_count = post.likes.length
            if (post.likes.length > 0) {
              for (let i = 0; i < post.likes.length; i++) {
                if (post.likes[i].liker === auth.user.pk) {
                  post.user_liked = true
                  break
                }
              }
            }
          })
          setPosts(data)
        } else {
          logoutUser()
        }
      }
      fetchPosts()
    }
  }, [])


  // fetch individual post
  const fetchPost = async (id) => {
    var url = `http://localhost:8000/api/post-detail/${id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    const data = await res.json()
    data.likes_count = data.likes.length
    
    return data 
  }


  // Add a new post or edit an existing one (coming later)
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
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      body:JSON.stringify(newPost) 
    })

    const data = await res.json()
    console.log(data)
    console.log(typeof data)
    if(res.status === 200) {
      setPosts([data, ...posts])
    } else {
      logoutUser()
    }
  }


  // Like/Unlike Post depending on which one has been done before by the user 
  const likePost = async (id, user_liked) => {

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
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      body:JSON.stringify(likePost)
    })
    
    const data = await res.json()
    const postLiked = await fetchPost(data.post)

    setPosts(posts.map((post) => post.id === id ? {...post, user_liked: !user_liked, likes_count: postLiked.likes_count} : post))
  
  }


  // Delete Post
  const deletePost = (id) => {
    
    const url = `http://localhost:8000/api/delete-post/${id}`

    fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
    setPosts(posts.filter((post) => post.id !== id))
  }

  // Edit Post
  const editPost = (id) => {
    console.log(`Probably need to add ability to edit before posting them post ${id}`)
  }

  // Write a reply to a post
  const replyPost = (id) => {
    console.log(`Probably need to add ability to reply before posting any replies to post ${id}`)
  }


  // Show or Hide addPost form
  const showAddForm = () => {
    if (showAddPost) {
      setShowAddPost(false)
    } else {
      setShowAddPost(true)
    }
  }

  return (
    <div className="container-fluid">
      { localStorage.getItem('isAuthenticated') ?
      <>
       <div className="row">
           <div className="col-md-3">
             <SidebarLeft onAdd={showAddForm} showAdd={showAddPost} />
           </div>
           <div className="col-md-6">
             { showAddPost && <AddForm onAdd={addPost} showAdd={showAddForm} /> }
             <Posts posts={posts} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
           </div>
           <div className="col-md-3">
             <SidebarRight />
           </div>
       </div>
      </> : 
      <p>You have not been authenticated!</p>
      }
    </div>
  );
}

export default Home;