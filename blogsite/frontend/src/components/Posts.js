import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {
    return (
      <>
        {posts.map((post) => (
          <div>
            <Post post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;