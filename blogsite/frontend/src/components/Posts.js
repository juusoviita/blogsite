import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost, replyShow }) => {

    return (
      <>
        {posts.map((post) => (
          <div>
            { post.replies_to === null &&
              <Post key={post.id} post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} replyShow={replyShow} />
            }
          </div>
        ))}
      </>
    )
 }

export default Posts;