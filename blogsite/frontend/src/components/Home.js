import { useState, useEffect } from 'react'
import Posts from './Posts'
import AddForm from './AddForm'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'

const Home = () => {

  const [showAddPost, setShowAddPost] = useState(false)
  const [posts, setPosts] = useState([])


  // Fetch all posts  http://127.0.0.1:8000/
    
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://127.0.0.1:8000/api/post-list/')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  // Add a new post or edit an existing one (coming later)
  const addPost = (post) => {
    
    const id = Math.floor(Math.random() * 1000) + 1
    const date = new Date()
    const timestamp = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`

    
    const newPost = {
      id: id,
      poster: Math.floor(Math.random() * 10),
      content: post.content,
      timestamp: timestamp,
      last_update: null,
      replies_to: [],
      replies: [],
      likes: [],
    }

    setPosts([...posts, newPost])
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
      <div className="row">
          <div className="col-md-3">
            <SidebarLeft onAdd={showAddForm} showAdd={showAddPost} />
          </div>
          <div className="col-md-6">
            { showAddPost && <AddForm onAdd={addPost} showAdd={showAddForm} /> }
            <Posts posts={posts} likePost={likePost} />
          </div>
          <div className="col-md-3">
            <SidebarRight />
          </div>
      </div>
    </div>
  );
}

export default Home;