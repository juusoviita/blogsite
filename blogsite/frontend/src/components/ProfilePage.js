import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { TailSpin } from 'react-loading-icons'
import Avatar from '@mui/material/Avatar';
import Button from './Button'
import Posts from './Posts'


const ProfilePage = ({ likePost, deletePost, editPost, replyPost }) => {
  
  const auth = useSelector((state) => state.auth)
  const onprofile = useSelector((state) => state.onprofile)
  const indprofile = useSelector((state) => state.indprofile)
  const dispatch = useDispatch()

  const [postsLoading, setPostsLoading] = useState(true)
  const [userPosts, setUserPosts] = useState([])
  const [userFollowed, setUserFollowed] = useState(false)
  const [followId, setFollowId] = useState('')

  const { onProfilePage, addProfile, clearProfile } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {

    // get user's posts
    const fetchUserPosts = async (id) => {
      setPostsLoading(true)
      const url = `http://127.0.0.1:8000/api/user-posts/${id}`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + auth.access_token
        }
      })
      const data = await res.json()

      if(res.status === 200) {
        // check whether the logged in user has liked the post or not
        data.forEach(post => {
          post.user_liked = false
          post.likes_count = post.likes.length
          post.replies_count = post.replies.length
          if (post.likes.length > 0) {
            for (let i = 0; i < post.likes.length; i++) {
              if (post.likes[i].liker === auth.user.pk) {
                post.user_liked = true
                break
              }
            }
          }
        })

      setUserPosts(data)
      setPostsLoading(false)
      }
    }

    fetchUserPosts(indprofile.id)
  }, [(onprofile && indprofile.id)])


  useEffect(() => {
    // check whether the logged in user follows the user
    if (auth.user.pk !== indprofile.id) {
      if (indprofile.followers.length > 0) {
        for (let i = 0; i < indprofile.followers.length; i++) {
          if (indprofile.followers[i].follower === auth.user.pk) {
            setUserFollowed(true)
            setFollowId(indprofile.followers[i].id)
            break
          }
        }
      }
    }
  }, [])

  // follow/unfollow user
  const followUser = async () => {
    let url = ''
    let method = ''
    { userFollowed ? url = `http://127.0.0.1:8000/api/unfollow-user/` : url = `http://127.0.0.1:8000/api/follow-user/` }
    { userFollowed ? method = 'DELETE' : method = 'POST' }

    let follow = ''

    if (!userFollowed) {
      follow = {
        follower: auth.user.pk,
        followed: indprofile.id
      }
    } else {
      follow = {id: followId}
    }
    
    const followUser = async () => {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + auth.access_token
        }, body: JSON.stringify(follow)
      })
      
      const data = await res.json()
      console.log(data)
    }
    followUser()
  }

  return (
    <>
      <div className="row justify-content-center profile-card glass">
        <div className="col-2">
          <Avatar alt={indprofile.username} src={indprofile.profile.image} sx={{ width: 90, height: 90 }} />
        </div>
        <div className="col-10">
          <h4>{indprofile.username}</h4>
          <br />
          <div className="row">
            <div className="col-3">
              <h6>Followers: {indprofile.followers.length}</h6>
            </div>
            <div className="col-3">
              <h6>Following: {indprofile.followed_users.length}</h6>
            </div>
            <div className="col-6">
              { auth.user.pk !== indprofile.id && <Button text={userFollowed ? 'Unfollow' : 'Follow'} onClick={followUser} /> }
            </div>
          </div>
        </div>
      </div>
        { postsLoading ?
          <div className='row justify-content-center'>
            <TailSpin stroke="#ff8d73" strokeWidth={2} />
            <p style={{color: "whitesmoke", textAlign: "center", marginTop: "15px"}}>Loading...</p>
          </div>
          :
          <Posts posts={userPosts} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} />
        }
    </>        
  )
}

export default ProfilePage
