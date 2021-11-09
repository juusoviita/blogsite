import Post from './Post'

const Posts = ({ posts, likePost, deletePost }) => {
    return (
      <>
        {posts.map((post) => (
          <div>
            <Post post={post} likePost={likePost} deletePost={deletePost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;