import { useState } from 'react'
import Posts from './Posts'
import AddForm from './AddForm'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'

const Home = () => {

  const [showAddPost, setShowAddPost] = useState(false)
  const [posts, setPosts] = useState(
    [
      {
        id: 1,
        poster: 2,
        content: "This is the first post ever!",
        timestamp: "2021-10-21",
        last_update: null,
        replies_to: null,
        replies: [
          {
            id: 3,
            poster: 1,
            content: "This is the first reply to a post!",
            timestamp: "2021-10-23",
            last_update: null,
            replies_to: 1,
            replies: [],
            likes: [
              {
                id: 2,
                liker: 1,
                post: 3,
              }
            ],
          },
        ],
        likes: [
          {
            id: 1,
            liker: 3,
            post: 1,
          }
        ]
      },
      {
        id: 2,
        poster: 3,
        content: "Was I the first? Probably not...",
        timestamp: "2021-10-22",
        last_update: null,
        replies_to: null,
        replies: [],
        likes: [],
      },
      {
        id: 3,
        poster: 1,
        content: "This is the first reply to a post!",
        timestamp: "2021-10-23",
        last_update: null,
        replies_to: 1,
        replies: [],
        likes: [
          {
            id: 2,
            liker: 1,
            post: 3,
          }
        ],
      },
      {
        id: 4,
        poster: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: "2021-10-29",
        last_update: null,
        replies_to: null,
        replies: [],
        likes: [],
      },
      {
        id: 5,
        poster: 3,
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        timestamp: "2021-10-23",
        last_update: null,
        replies_to: [],
        replies: [],
        likes: [
          {
            id: 3,
            liker: 3,
            post: 5,
          }
        ],
      },
    ]
  )

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