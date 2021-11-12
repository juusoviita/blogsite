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
          setPosts(data)
        } else {
          logoutUser()
        }
      }
      fetchPosts()
    }
  }, [])

  // Add a new post or edit an existing one (coming later)
  const addPost = (post) => {
    
    const id = Math.floor(Math.random() * 1000) + 1
    const date = new Date()
    const timestamp = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`

    const poster = auth.user.pk

    const newPost = {
      id: id,
      poster: poster,
      content: post.content,
      timestamp: timestamp,
      last_update: null,
      replies_to: [],
      replies: [],
      likes: [],
    }

    setPosts([newPost, ...posts])
    setShowAddPost(false)
  }

  // Like Post
  const likePost = (id) => {
    console.log(`Liked Post id${id}`)
  }


  // Delete Post
  const deletePost = (id) => {
    console.log(`Deleted Post id ${id}`)
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
    if (showAddPost === true) {
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