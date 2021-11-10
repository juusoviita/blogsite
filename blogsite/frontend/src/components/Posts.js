import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost }) => {
    return (
      <>
        {posts.map((post) => (
          <div>
            <Post post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;