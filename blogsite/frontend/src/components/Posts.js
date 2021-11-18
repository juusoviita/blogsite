import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {

    const postsArray = Array.from(posts)

    return (
      <>
        {postsArray.map((post) => (
          <div>
            <Post post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;