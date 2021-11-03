import Post from './Post'

const Posts = ({ posts, likePost }) => {
    return (
      <>
        {posts.map((post) => (
          <div>
            <Post post={post} likePost={likePost} />
          </div>
        ))}
      </>
    )
 }

export default Posts;