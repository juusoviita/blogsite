import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {

    return (
      <>
        {posts.map((post) => (
          <div>
            { post.replies_to === null &&
              <Post key={post.id} post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
            }
          </div>
        ))}
      </>
    )
 }

export default Posts;