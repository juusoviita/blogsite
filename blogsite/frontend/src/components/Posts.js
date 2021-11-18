import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {

    console.log(typeof(posts))

    return (
      <>
        {posts.map((post) => (
          <div>
            <Post key={post.id} post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;